import { useState, useCallback, useEffect } from "react";
import { THEMES } from "../data/themes";
import { DIFFICULTIES } from "../data/difficulties";
import { shuffleArray } from "../utils";
import { soundManager } from "../utils/audio";

const vibrate = (pattern) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(pattern); } catch(e) {}
  }
};

function pickPuzzle(chosenThemeId) {
  if (chosenThemeId) {
    return THEMES.find((t) => t.id === chosenThemeId) ?? THEMES[0];
  }
  return THEMES[Math.floor(Math.random() * THEMES.length)];
}

function buildTiles(puzzle) {
  const tiles = [];
  puzzle.groups.forEach((group, groupIndex) => {
    group.items.forEach((term) => tiles.push({ term, groupIndex }));
  });
  return shuffleArray(tiles);
}

// Converte a proporção de vidas em intervalo de milissegundos (BPM dinâmico)
function getHeartbeatInterval(livesLeft, totalLives) {
  if (!totalLives || livesLeft <= 0) return null;

  // Proporção de 1 (cheio) até 0 (sem vidas)
  const ratio = livesLeft / totalLives;

  if (ratio >= 0.75) return 1100; // ~55 BPM (Relaxado / Normal)
  if (ratio >= 0.5)  return 850;  // ~70 BPM (Alerta leve)
  if (ratio >= 0.25) return 600;  // ~100 BPM (Taquicardia moderada)
  return 420;                     // ~145 BPM (Taquicardia severa / 1 vida)
}

export function usePuzzle(difficultyId, chosenThemeId) {
  const difficulty = DIFFICULTIES[difficultyId] || DIFFICULTIES.normal;

  const [puzzle, setPuzzle] = useState(() => pickPuzzle(chosenThemeId));
  const [tiles, setTiles] = useState(() => buildTiles(puzzle));
  const [selected, setSelected] = useState([]);
  const [solvedGroups, setSolvedGroups] = useState([]);
  const [livesLeft, setLivesLeft] = useState(difficulty.lives);
  const [status, setStatus] = useState({ message: "", tone: "gold" });
  const [shakeIds, setShakeIds] = useState([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [activeHint, setActiveHint] = useState(null);
  const [gameOver, setGameOver] = useState(null); // null | "won" | "lost"

  // Controle dinâmico da velocidade do batimento e disparo do Flatline
  useEffect(() => {
    if (gameOver === "lost") {
      soundManager.playFlatline(2.5); // "Piiii" por 2.5 segundos
      return;
    }

    if (gameOver === "won" || difficulty.lives === null) {
      soundManager.stopHeartbeatLoop();
      return;
    }

    const interval = getHeartbeatInterval(livesLeft, difficulty.lives);
    if (interval) {
      soundManager.startHeartbeatLoop(interval);
    } else {
      soundManager.stopHeartbeatLoop();
    }

    return () => {
      soundManager.stopHeartbeatLoop();
    };
  }, [livesLeft, difficulty.lives, gameOver]);

  const restart = useCallback(() => {
    soundManager.stopHeartbeatLoop();
    const nextPuzzle = pickPuzzle(chosenThemeId);
    setPuzzle(nextPuzzle);
    setTiles(buildTiles(nextPuzzle));
    setSelected([]);
    setSolvedGroups([]);
    setLivesLeft(difficulty.lives);
    setStatus({ message: "", tone: "gold" });
    setHintsUsed(0);
    setActiveHint(null);
    setGameOver(null);
  }, [chosenThemeId, difficulty.lives]);

  const toggleTile = useCallback(
    (index) => {
      if (gameOver) return;

      soundManager.playSelect();
      vibrate(40);

      setSelected((prev) => {
        if (prev.includes(index)) return prev.filter((i) => i !== index);
        if (prev.length >= 4) return prev;
        return [...prev, index];
      });
    },
    [gameOver]
  );

  const clearSelection = useCallback(() => {
    soundManager.playSelect();
    setSelected([]);
  }, []);

  const shuffleBoard = useCallback(() => {
    soundManager.playSelect();
    setTiles((prev) => {
      const unsolvedIdx = prev
        .map((_, i) => i)
        .filter((i) => !solvedGroups.includes(prev[i].groupIndex));
      const unsolvedTiles = unsolvedIdx.map((i) => prev[i]);
      const shuffled = shuffleArray(unsolvedTiles);
      const next = prev.slice();
      unsolvedIdx.forEach((originalIdx, k) => {
        next[originalIdx] = shuffled[k];
      });
      return next;
    });
  }, [solvedGroups]);

  const giveHint = useCallback(() => {
    if (gameOver) return;

    const unsolvedGroupIndices = puzzle.groups
      .map((_, idx) => idx)
      .filter((idx) => !solvedGroups.includes(idx));

    if (unsolvedGroupIndices.length === 0) return;

    soundManager.playSelect();
    const targetGroup = puzzle.groups[unsolvedGroupIndices[0]];
    setHintsUsed((h) => h + 1);
    setActiveHint(`Dica de Categoria: Procure termos ligados a "${targetGroup.name}"`);
    setStatus({
      message: `💡 Dica: Foque em termos de "${targetGroup.name}"`,
      tone: "gold",
    });
  }, [gameOver, puzzle.groups, solvedGroups]);

  const checkSelection = useCallback(() => {
    if (selected.length !== 4 || gameOver) return;

    const groupIdxs = selected.map((i) => tiles[i].groupIndex);
    const allSame = groupIdxs.every((g) => g === groupIdxs[0]);

    if (allSame) {
      soundManager.playSuccess();
      const newSolved = [...solvedGroups, groupIdxs[0]];
      setSolvedGroups(newSolved);
      setSelected([]);
      setActiveHint(null);

      if (newSolved.length === puzzle.groups.length) {
        setStatus({ message: "Excelente! Você concluiu todos os conceitos!", tone: "mint" });
        setGameOver("won");
      } else {
        vibrate([50, 50, 50]);
        setStatus({ message: "Correto! Leia o 'Você Sabia?' e continue.", tone: "mint" });
      }
      return;
    }

    // Cálculo de quase acerto (3 corretos de um grupo)
    const counts = {};
    groupIdxs.forEach((g) => (counts[g] = (counts[g] || 0) + 1));
    const maxCount = Math.max(...Object.values(counts));

    soundManager.playError();
    vibrate([100, 50, 100]);
    setShakeIds(selected);
    setTimeout(() => setShakeIds([]), 400);

    let livesAfter = livesLeft;
    if (difficulty.lives !== null) {
      livesAfter = livesLeft - 1;
      setLivesLeft(livesAfter);

      if (livesAfter <= 0) {
        setGameOver("lost");
      }
    }

    if (difficulty.lives !== null && livesAfter <= 0) {
      setStatus({
        message: "Suas vidas chegaram ao fim. Veja as explicações no resumo!",
        tone: "coral",
      });
    } else if (maxCount === 3) {
      setStatus({
        message: "Quase lá! Você selecionou 3 termos do mesmo grupo.",
        tone: "gold",
      });
    } else {
      setStatus({
        message: "Combinação incorreta. Tente agrupar por outro critério.",
        tone: "coral",
      });
    }
  }, [selected, tiles, solvedGroups, gameOver, puzzle.groups.length, difficulty.lives, livesLeft]);

  return {
    puzzle,
    tiles,
    selected,
    solvedGroups,
    livesLeft,
    livesTotal: difficulty.lives,
    status,
    shakeIds,
    hintsUsed,
    activeHint,
    gameOver,
    toggleTile,
    clearSelection,
    shuffleBoard,
    giveHint,
    checkSelection,
    restart,
  };
}