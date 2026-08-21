import { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";
import { DIFFICULTIES } from "../data/difficulties";
import { THEMES } from "../data/themes";
import { ACHIEVEMENTS } from "../data/achievements";

const GameContext = createContext(null);

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

  // Estatísticas e Conquistas
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem("respconex_stats");
      return saved ? JSON.parse(saved) : { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0 };
    } catch {
      return { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0 };
    }
  });

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

  const unlockAchievement = useCallback((achId) => {
    setUnlockedAchievements((prev) => {
      if (prev.includes(achId)) return prev;
      if (ACHIEVEMENTS && ACHIEVEMENTS[achId]) {
        setRecentAchievement(ACHIEVEMENTS[achId]);
        setTimeout(() => setRecentAchievement(null), 5000);
      }
      return [...prev, achId];
    });
  }, []);

  const markThemeCompleted = useCallback((themeId) => {
    if (!themeId) return;
    setCompletedThemes((prev) => {
      if (prev.includes(themeId)) return prev;
      const next = [...prev, themeId];
      localStorage.setItem("respconex_completed", JSON.stringify(next));

      if (next.length >= 5) unlockAchievement("scholar");
      if (next.length >= THEMES.length) unlockAchievement("master");

      return next;
    });
  }, [unlockAchievement]);

  // Valida se a aba do nível está liberada
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

  // Valida a liberação sequencial estrita de cada fase (Fase 1 -> Fase 2 -> ...)
  const isThemeUnlocked = useCallback((theme) => {
    if (!theme) return false;
    const tier = theme.tier || "easy";

    if (!isTierUnlocked(tier)) return false;

    const tierThemes = THEMES.filter((t) => t.tier === tier);
    const themeIndex = tierThemes.findIndex((t) => t.id === theme.id);

    // A Fase 1 (índice 0) do tier liberado está sempre aberta
    if (themeIndex <= 0) return true;

    // As demais fases só liberam se a anterior imediata foi concluída
    const previousTheme = tierThemes[themeIndex - 1];
    return previousTheme ? completedThemes.includes(previousTheme.id) : false;
  }, [isTierUnlocked, completedThemes]);

  const recordGameResult = useCallback((won, difficultyId, livesRemaining, totalLives) => {
    setStats((prev) => {
      const next = { ...prev, gamesPlayed: prev.gamesPlayed + 1 };

      if (next.gamesPlayed === 1) unlockAchievement("first_blood");

      if (won) {
        next.gamesWon += 1;
        if (next.gamesWon === 1) unlockAchievement("first_win");

        if (totalLives !== null && livesRemaining === totalLives) {
          next.flawlessWins += 1;
          unlockAchievement("flawless");
        }

        if (totalLives !== null && livesRemaining === 1) {
          unlockAchievement("survivor");
        }
      }
      return next;
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
    recordGameResult,
  }), [
    screen, goTo, difficulty, chosenThemeId, lastResult, heartRate, playerName,
    completedThemes, markThemeCompleted, isTierUnlocked, isThemeUnlocked, stats,
    unlockedAchievements, recentAchievement, recordGameResult
  ]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame precisa ser usado dentro de um <GameProvider>");
  }
  return ctx;
}