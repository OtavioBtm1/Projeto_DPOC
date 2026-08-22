// src/context/GameContext.jsx
import { createContext, useCallback, useMemo, useState, useEffect } from "react";
import { DIFFICULTIES } from "../data/difficulties";
import { THEMES } from "../data/themes";
import { ACHIEVEMENTS } from "../data/achievements";
import { soundManager } from "../utils/audio";
import { supabase } from "../utils/supabase"; 

export const GameContext = createContext(null);

const STORAGE_PROFILES_KEY = "respconex_profiles";
const STORAGE_ACTIVE_ID_KEY = "respconex_active_profile_id";

export function GameProvider({ children }) {
  const [screen, setScreen] = useState("menu");
  const [difficulty, setDifficulty] = useState("medio");
  const [chosenThemeId, setChosenThemeId] = useState(undefined);
  const [lastResult, setLastResult] = useState(null);
  const [heartRate, setHeartRate] = useState("normal");
  const [recentAchievement, setRecentAchievement] = useState(null);

  // Inicializa Perfis com themeAttempts e themeMaxPoints
  const [profiles, setProfiles] = useState(() => {
    try {
      const savedProfiles = localStorage.getItem(STORAGE_PROFILES_KEY);
      if (savedProfiles) return JSON.parse(savedProfiles);

      return [{
        id: "usr_" + Date.now(),
        name: "Jogador 1",
        avatar: "🫁",
        pin: null, 
        createdAt: new Date().toISOString(),
        completedThemes: [],
        stats: { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0, score: 0, themeAttempts: {}, themeMaxPoints: {} },
        unlockedAchievements: [],
      }];
    } catch {
      return [{
        id: "usr_" + Date.now(),
        name: "Jogador 1",
        avatar: "🫁",
        pin: null,
        createdAt: new Date().toISOString(),
        completedThemes: [],
        stats: { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0, score: 0, themeAttempts: {}, themeMaxPoints: {} },
        unlockedAchievements: [],
      }];
    }
  });

  const [activeProfileId, setActiveProfileId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_ACTIVE_ID_KEY) || (profiles[0]?.id ?? "");
    } catch {
      return profiles[0]?.id ?? "";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
    } catch {}
  }, [profiles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ACTIVE_ID_KEY, activeProfileId);
    } catch {}
  }, [activeProfileId]);

  const activeProfile = useMemo(() => {
    return profiles.find((p) => p.id === activeProfileId) || profiles[0] || {
      id: "fallback",
      name: "Jogador 1",
      avatar: "🫁",
      pin: null,
      completedThemes: [],
      stats: { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0, score: 0, themeAttempts: {}, themeMaxPoints: {} },
      unlockedAchievements: [],
    };
  }, [profiles, activeProfileId]);

  // ==========================================
  // SYNC COM SUPABASE
  // ==========================================
  useEffect(() => {
    const currentScore = activeProfile.stats?.score || 0;
    if (!supabase || activeProfile.id === "fallback") return;
    if (currentScore <= 0 && !activeProfile.pin) return; 

    const syncTimeout = setTimeout(async () => {
      try {
        const payload = {
          id: activeProfile.id,
          player_name: activeProfile.name || "Jogador Anônimo",
          avatar: activeProfile.avatar || "🫁",
          themes_count: activeProfile.completedThemes?.length || 0,
          games_won: activeProfile.stats?.gamesWon || 0,
          score: currentScore,
          achievements_count: activeProfile.unlockedAchievements?.length || 0,
          pin: activeProfile.pin || null, 
          stats: activeProfile.stats, 
          completed_themes: activeProfile.completedThemes, 
          unlocked_achievements: activeProfile.unlockedAchievements,
          updated_at: new Date().toISOString()
        };

        const { error } = await supabase.from("leaderboard").upsert(payload, { onConflict: "id" });
        if (error) console.error("Falha silenciosa ao sincronizar ranking:", error.message);
      } catch (err) {
        console.warn("Sem conexão com ranking online. Salvando apenas localmente.");
      }
    }, 2000); 

    return () => clearTimeout(syncTimeout);
  }, [activeProfile]); 

  const playerName = activeProfile.name;
  const completedThemes = activeProfile.completedThemes || [];
  const stats = activeProfile.stats || { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0, score: 0, themeAttempts: {}, themeMaxPoints: {} };
  const unlockedAchievements = activeProfile.unlockedAchievements || [];

  const updateActiveProfile = useCallback((updater) => {
    setProfiles((prev) => prev.map((profile) => profile.id !== activeProfileId ? profile : updater(profile)));
  }, [activeProfileId]);

  const setPlayerPin = useCallback((pin) => {
    updateActiveProfile((profile) => ({ ...profile, pin }));
  }, [updateActiveProfile]);

  const loginWithProfile = useCallback((serverData) => {
    const restored = {
      id: serverData.id,
      name: serverData.player_name,
      avatar: serverData.avatar || "🫁",
      pin: serverData.pin || null,
      createdAt: serverData.updated_at || new Date().toISOString(),
      completedThemes: serverData.completed_themes || [],
      stats: serverData.stats || { 
        gamesPlayed: serverData.games_won || 0, 
        gamesWon: serverData.games_won || 0, 
        flawlessWins: 0, 
        score: serverData.score || 0,
        themeAttempts: {},
        themeMaxPoints: {}
      },
      unlockedAchievements: serverData.unlocked_achievements || [],
    };

    setProfiles((prev) => {
      const exists = prev.find((p) => p.id === restored.id);
      if (exists) return prev.map((p) => (p.id === restored.id ? restored : p));
      return [...prev, restored];
    });
    setActiveProfileId(restored.id);
  }, []);

  const createProfile = useCallback((name, avatar = "🫁") => {
    const newId = "usr_" + Date.now();
    const newProfile = {
      id: newId, name: name.trim() || "Novo Jogador", avatar, pin: null,
      createdAt: new Date().toISOString(), completedThemes: [],
      stats: { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0, score: 0, themeAttempts: {}, themeMaxPoints: {} },
      unlockedAchievements: [],
    };
    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newId);
    return newProfile;
  }, []);

  const switchProfile = useCallback((id) => setActiveProfileId(id), []);

  const deleteProfile = useCallback((id) => {
    setProfiles((prev) => {
      if (prev.length <= 1) return prev; 
      const updated = prev.filter((p) => p.id !== id);
      if (activeProfileId === id) setActiveProfileId(updated[0].id);
      return updated;
    });
  }, [activeProfileId]);

  const setPlayerName = useCallback((name) => updateActiveProfile((profile) => ({ ...profile, name })), [updateActiveProfile]);
  const setPlayerAvatar = useCallback((avatar) => updateActiveProfile((profile) => ({ ...profile, avatar })), [updateActiveProfile]);

  const unlockAchievement = useCallback((achId) => {
    if (!ACHIEVEMENTS[achId]) return;
    updateActiveProfile((profile) => {
      const currentAchs = profile.unlockedAchievements || [];
      if (currentAchs.includes(achId)) return profile;

      if (soundManager && typeof soundManager.playAchievement === "function") soundManager.playAchievement();
      setRecentAchievement(ACHIEVEMENTS[achId]);
      setTimeout(() => setRecentAchievement(null), 5000);

      const nextAchs = [...currentAchs, achId];
      const standardKeys = Object.keys(ACHIEVEMENTS).filter((k) => k !== "completionist");
      if (standardKeys.every((key) => nextAchs.includes(key)) && !nextAchs.includes("completionist")) {
        setTimeout(() => unlockAchievement("completionist"), 1200);
      }
      return { ...profile, unlockedAchievements: nextAchs };
    });
  }, [updateActiveProfile]);

  const checkProgressAchievements = useCallback((completedList) => {
    const easyIds = ["easy-1", "easy-2", "easy-3", "easy-4", "easy-5"];
    const mediumIds = ["medium-1", "medium-2", "medium-3", "medium-4", "medium-5"];
    const hardIds = ["hard-1", "hard-2", "hard-3", "hard-4", "hard-5"];
    if (easyIds.every((id) => completedList.includes(id))) unlockAchievement("easy_complete");
    if (mediumIds.every((id) => completedList.includes(id))) unlockAchievement("medium_complete");
    if (hardIds.every((id) => completedList.includes(id))) unlockAchievement("hard_complete");
    if (completedList.length >= 8) unlockAchievement("halfway");
    if (completedList.length >= 15) unlockAchievement("master");
  }, [unlockAchievement]);

  const markThemeCompleted = useCallback((themeId) => {
    if (!themeId) return;
    updateActiveProfile((profile) => {
      const prevCompleted = profile.completedThemes || [];
      if (prevCompleted.includes(themeId)) return profile;
      const nextCompleted = [...prevCompleted, themeId];
      checkProgressAchievements(nextCompleted);
      return { ...profile, completedThemes: nextCompleted };
    });
  }, [updateActiveProfile, checkProgressAchievements]);

  const isTierUnlocked = useCallback((tierKey) => {
    if (tierKey === "easy") return true;
    const easyThemes = THEMES.filter((t) => t.tier === "easy");
    const mediumThemes = THEMES.filter((t) => t.tier === "medium");
    if (tierKey === "medium") return easyThemes.length > 0 && easyThemes.every((t) => completedThemes.includes(t.id));
    if (tierKey === "hard") return mediumThemes.length > 0 && mediumThemes.every((t) => completedThemes.includes(t.id));
    return false;
  }, [completedThemes]);

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

  // ==========================================
  // FUNÇÃO DE LIMITES DE TENTATIVA
  // ==========================================
  const canPlayMatch = useCallback((themeId, diffId) => {
    if (!themeId || !diffId) return false;
    if (diffId === "facil" || diffId === "easy") return true; // Fácil = Infinito

    const attempts = activeProfile.stats?.themeAttempts || {};
    const count = attempts[`${themeId}_${diffId}`] || 0;

    if (diffId === "medio" || diffId === "medium") return count < 2; // Médio = Máx 2 tentativas
    if (diffId === "dificil" || diffId === "hard") return count < 1; // Difícil = Máx 1 tentativa

    return true;
  }, [activeProfile]);

  // ==========================================
  // LÓGICA DE PONTOS INTELIGENTES (DELTA POINTS) E REGISTRO DE TENTATIVAS
  // ==========================================
  const recordGameResult = useCallback((won, difficultyId, livesRemaining, totalLives) => {
    updateActiveProfile((profile) => {
      const prevStats = profile.stats || { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0, score: 0, themeAttempts: {}, themeMaxPoints: {} };
      const themeAttempts = prevStats.themeAttempts || {};
      const themeMaxPoints = prevStats.themeMaxPoints || {};
      
      // REGISTRA A TENTATIVA LOGO DE CARA (seja vitória ou derrota)
      const attemptKey = `${chosenThemeId}_${difficultyId}`;
      const currentAttempts = themeAttempts[attemptKey] || 0;
      const nextThemeAttempts = { ...themeAttempts, [attemptKey]: currentAttempts + 1 };
      
      const nextGamesPlayed = (prevStats.gamesPlayed || 0) + 1;
      const nextGamesWon = won ? (prevStats.gamesWon || 0) + 1 : (prevStats.gamesWon || 0);
      let nextFlawless = prevStats.flawlessWins || 0;
      let nextScore = prevStats.score || 0;
      let nextThemeMaxPoints = { ...themeMaxPoints };

      if (nextGamesPlayed >= 1) unlockAchievement("first_blood");
      if (nextGamesPlayed >= 10) unlockAchievement("veteran");

      if (won) {
        if (nextGamesWon >= 1) unlockAchievement("first_win");

        // CALCULA QUANTOS PONTOS A PARTIDA VALE NO TOTAL (INCLUINDO BÔNUS)
        let potentialPoints = 0;
        if (difficultyId === "facil" || difficultyId === "easy") potentialPoints = 10;
        else if (difficultyId === "medio" || difficultyId === "medium") potentialPoints = 25;
        else if (difficultyId === "dificil" || difficultyId === "hard") potentialPoints = 50;
        
        if (totalLives !== null && livesRemaining === totalLives) {
          nextFlawless += 1;
          potentialPoints += 15; // Bônus Flawless
          unlockAchievement("flawless");
        }

        // 🛑 LÓGICA DE EVOLUÇÃO (Anti-Farming): Pega quantos pontos o jogador JÁ ganhou nesse tema antes
        const previousMax = nextThemeMaxPoints[chosenThemeId] || 0;
        
        // Só dá pontos se a pontuação atual for MAIOR que a maior pontuação já registrada nesse tema
        if (potentialPoints > previousMax) {
          const pointsToGive = potentialPoints - previousMax; // Dá só a diferença!
          nextScore += pointsToGive;
          nextThemeMaxPoints[chosenThemeId] = potentialPoints; // Atualiza o novo recorde do tema
        }

        if (totalLives !== null && livesRemaining === 1) {
          unlockAchievement("survivor");
        }
      }

      return {
        ...profile,
        stats: {
          ...prevStats,
          gamesPlayed: nextGamesPlayed,
          gamesWon: nextGamesWon,
          flawlessWins: nextFlawless,
          score: nextScore,
          themeAttempts: nextThemeAttempts, // Grava que ele gastou a tentativa
          themeMaxPoints: nextThemeMaxPoints // Grava o recorde de pontos da fase
        },
      };
    });
  }, [updateActiveProfile, unlockAchievement, chosenThemeId]); 
  
  const goTo = useCallback((nextScreen) => {
    if (nextScreen !== "game" && nextScreen !== "result") {
      setHeartRate("normal");
    }
    setScreen(nextScreen);
  }, []);

  const value = useMemo(() => ({
    screen, goTo, difficulty, setDifficulty,
    difficultyConfig: (DIFFICULTIES && DIFFICULTIES[difficulty]) || { lives: 4 },
    chosenThemeId, setChosenThemeId, lastResult, setLastResult, heartRate, setHeartRate,
    profiles, activeProfile, activeProfileId, createProfile, switchProfile, deleteProfile,
    playerName, setPlayerName, setPlayerAvatar, setPlayerPin, loginWithProfile, 
    completedThemes, markThemeCompleted, isTierUnlocked, isThemeUnlocked, 
    canPlayMatch, // <--- NOVA FUNÇÃO DE TRAVA EXPORTADA
    stats, unlockedAchievements, recentAchievement, unlockAchievement, recordGameResult,
  }), [
    screen, goTo, difficulty, chosenThemeId, lastResult, heartRate,
    profiles, activeProfile, activeProfileId, createProfile, switchProfile, deleteProfile,
    playerName, setPlayerName, setPlayerAvatar, setPlayerPin, loginWithProfile, completedThemes, markThemeCompleted,
    isTierUnlocked, isThemeUnlocked, canPlayMatch, stats, unlockedAchievements, recentAchievement,
    unlockAchievement, recordGameResult
  ]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export { useGame } from "../hooks/useGame";