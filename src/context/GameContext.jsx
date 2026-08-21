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

  // Progresso (temas concluidos)
  const [completedThemes, setCompletedThemes] = useState(() => {
    try {
      const saved = localStorage.getItem("respconex_completed");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Estatisticas e Conquistas
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

  // Notificacao visual de nova conquista
  const [recentAchievement, setRecentAchievement] = useState(null);

  // Sync de dados
  useEffect(() => {
    localStorage.setItem("respconex_stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("respconex_achievements", JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  // Logica de validacao de conquistas
  const unlockAchievement = useCallback((achId) => {
    setUnlockedAchievements((prev) => {
      if (prev.includes(achId)) return prev;
      setRecentAchievement(ACHIEVEMENTS[achId]);
      setTimeout(() => setRecentAchievement(null), 5000); // esconde apos 5s
      return [...prev, achId];
    });
  }, []);

  const markThemeCompleted = useCallback((themeId) => {
    if (!themeId) return;
    setCompletedThemes((prev) => {
      if (prev.includes(themeId)) return prev;
      const next = [...prev, themeId];
      localStorage.setItem("respconex_completed", JSON.stringify(next));
      
      // Valida conquistas de completismo
      if (next.length >= 5) unlockAchievement("scholar");
      if (next.length >= THEMES.length) unlockAchievement("master");
      
      return next;
    });
  }, [unlockAchievement]);

  const recordGameResult = useCallback((won, difficultyId, livesRemaining, totalLives) => {
    setStats((prev) => {
      const next = { ...prev, gamesPlayed: prev.gamesPlayed + 1 };
      
      // Primeira partida
      if (next.gamesPlayed === 1) unlockAchievement("first_blood");

      if (won) {
        next.gamesWon += 1;
        if (next.gamesWon === 1) unlockAchievement("first_win");

        // flawless: Venceu sem perder vidas no medio/dificil
        if (totalLives !== null && livesRemaining === totalLives) {
          next.flawlessWins += 1;
          unlockAchievement("flawless");
        }
        
        // survivor: Venceu no sufoco
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
    difficultyConfig: DIFFICULTIES[difficulty],
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
    stats,
    unlockedAchievements,
    recentAchievement,
    recordGameResult
  }), [
    screen, goTo, difficulty, chosenThemeId, lastResult, heartRate, playerName, 
    completedThemes, markThemeCompleted, stats, unlockedAchievements, 
    recentAchievement, recordGameResult
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
