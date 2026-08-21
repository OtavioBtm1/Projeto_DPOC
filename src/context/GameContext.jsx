// src/context/GameContext.jsx
import { createContext, useCallback, useMemo, useState, useEffect } from "react";
import { DIFFICULTIES } from "../data/difficulties";
import { THEMES } from "../data/themes";
import { ACHIEVEMENTS } from "../data/achievements";
import { soundManager } from "../utils/audio";

export const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [screen, setScreen] = useState("menu");
  const [difficulty, setDifficulty] = useState("medio");
  const [chosenThemeId, setChosenThemeId] = useState(undefined);
  const [lastResult, setLastResult] = useState(null);
  const [heartRate, setHeartRate] = useState("normal");

  // Nome do jogador
  const [playerName, setPlayerNameState] = useState(() => {
    try { return localStorage.getItem("respconex_player_name") || ""; } catch { return ""; }
  });

  const setPlayerName = useCallback((name) => {
    setPlayerNameState(name);
    try { localStorage.setItem("respconex_player_name", name); } catch {}
  }, []);

  // Fases concluídas salvas
  const [completedThemes, setCompletedThemes] = useState(() => {
    try {
      const saved = localStorage.getItem("respconex_completed");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Estatísticas do jogador
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem("respconex_stats");
      return saved ? JSON.parse(saved) : { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0 };
    } catch {
      return { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0 };
    }
  });

  // Conquistas Desbloqueadas
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem("respconex_achievements");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentAchievement, setRecentAchievement] = useState(null);

  // Sync no LocalStorage
  useEffect(() => {
    localStorage.setItem("respconex_stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("respconex_achievements", JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  // Função central de desbloqueio com som e gatilho de Platina
  const unlockAchievement = useCallback((achId) => {
    if (!ACHIEVEMENTS[achId]) return;

    setUnlockedAchievements((prev) => {
      if (prev.includes(achId)) return prev;

      // Toca o som de conquista
      if (soundManager && typeof soundManager.playAchievement === "function") {
        soundManager.playAchievement();
      }

      // Notificação visual do banner
      setRecentAchievement(ACHIEVEMENTS[achId]);
      setTimeout(() => setRecentAchievement(null), 5000);

      const next = [...prev, achId];

      // Validação da Conquista Platina (Todas as outras desbloqueadas)
      const standardKeys = Object.keys(ACHIEVEMENTS).filter((k) => k !== "completionist");
      const hasAllStandard = standardKeys.every((key) => next.includes(key));

      if (hasAllStandard && !next.includes("completionist")) {
        setTimeout(() => {
          unlockAchievement("completionist");
        }, 1200);
      }

      return next;
    });
  }, []);

  // 🧪 Expõe para você testar no console (F12) a qualquer momento
  useEffect(() => {
    window.testAchievement = (achId) => {
      unlockAchievement(achId);
    };
  }, [unlockAchievement]);

  // Checagem de Conquistas de Progresso de Fases
  const checkProgressAchievements = useCallback((completedList) => {
    const easyIds = ["easy-1", "easy-2", "easy-3", "easy-4", "easy-5"];
    const mediumIds = ["medium-1", "medium-2", "medium-3", "medium-4", "medium-5"];
    const hardIds = ["hard-1", "hard-2", "hard-3", "hard-4", "hard-5"];

    if (easyIds.every((id) => completedList.includes(id))) {
      unlockAchievement("easy_complete");
    }

    if (mediumIds.every((id) => completedList.includes(id))) {
      unlockAchievement("medium_complete");
    }

    if (hardIds.every((id) => completedList.includes(id))) {
      unlockAchievement("hard_complete");
    }

    if (completedList.length >= 8) {
      unlockAchievement("halfway");
    }

    if (completedList.length >= 15) {
      unlockAchievement("master");
    }
  }, [unlockAchievement]);

  const markThemeCompleted = useCallback((themeId) => {
    if (!themeId) return;
    setCompletedThemes((prev) => {
      const next = prev.includes(themeId) ? prev : [...prev, themeId];
      localStorage.setItem("respconex_completed", JSON.stringify(next));
      checkProgressAchievements(next);
      return next;
    });
  }, [checkProgressAchievements]);

  // Checagem de Desbloqueio das Abas
  const isTierUnlocked = useCallback((tierKey) => {
    if (tierKey === "easy") return true;

    const easyThemes = THEMES.filter((t) => t.tier === "easy");
    const mediumThemes = THEMES.filter((t) => t.tier === "medium");

    if (tierKey === "medium") {
      return easyThemes.length > 0 && easyThemes.every((t) => completedThemes.includes(t.id));
    }

    if (tierKey === "hard") {
      return mediumThemes.length > 0 && mediumThemes.every((t) => completedThemes.includes(t.id));
    }

    return false;
  }, [completedThemes]);

  // Checagem sequencial estrita de fases (1 -> 2 -> 3 -> 4 -> 5)
  const isThemeUnlocked = useCallback((theme) => {
    if (!theme) return false;
    const tier = theme.tier || "easy";

    if (!isTierUnlocked(tier)) return false;

    const tierThemes = THEMES.filter((t) => t.tier === tier);
    const themeIndex = tierThemes.findIndex((t) => t.id === theme.id);

    if (themeIndex <= 0) return true;

    const previousTheme = tierThemes[themeIndex - 1];
    return previousTheme ? completedThemes.includes(previousTheme.id) : false;
  }, [isTierUnlocked, completedThemes]);

  // Registro de Partidas & Conquistas de Jogo
  const recordGameResult = useCallback((won, difficultyId, livesRemaining, totalLives) => {
    setStats((prev) => {
      const nextGamesPlayed = (prev.gamesPlayed || 0) + 1;
      const nextGamesWon = won ? (prev.gamesWon || 0) + 1 : (prev.gamesWon || 0);
      let nextFlawless = prev.flawlessWins || 0;

      if (nextGamesPlayed >= 1) unlockAchievement("first_blood");
      if (nextGamesPlayed >= 10) unlockAchievement("veteran");

      if (won) {
        if (nextGamesWon >= 1) unlockAchievement("first_win");

        if (totalLives !== null && livesRemaining === totalLives) {
          nextFlawless += 1;
          unlockAchievement("flawless");
        }

        if (totalLives !== null && livesRemaining === 1) {
          unlockAchievement("survivor");
        }
      }

      return {
        ...prev,
        gamesPlayed: nextGamesPlayed,
        gamesWon: nextGamesWon,
        flawlessWins: nextFlawless,
      };
    });
  }, [unlockAchievement]);

  const goTo = useCallback((nextScreen) => {
    if (nextScreen !== "game" && nextScreen !== "result") {
      setHeartRate("normal");
    }
    setScreen(nextScreen);
  }, []);

  const value = useMemo(() => ({
    screen,
    goTo,
    difficulty,
    setDifficulty,
    difficultyConfig: (DIFFICULTIES && DIFFICULTIES[difficulty]) || { lives: 4 },
    chosenThemeId,
    setChosenThemeId,
    lastResult,
    setLastResult,
    heartRate,
    setHeartRate,
    playerName,
    setPlayerName,
    completedThemes,
    markThemeCompleted,
    isTierUnlocked,
    isThemeUnlocked,
    stats,
    unlockedAchievements,
    recentAchievement,
    unlockAchievement,
    recordGameResult,
  }), [
    screen, goTo, difficulty, chosenThemeId, lastResult, heartRate, playerName,
    completedThemes, markThemeCompleted, isTierUnlocked, isThemeUnlocked, stats,
    unlockedAchievements, recentAchievement, unlockAchievement, recordGameResult
  ]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export { useGame } from "../hooks/useGame";