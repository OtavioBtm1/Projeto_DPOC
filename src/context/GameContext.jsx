// src/context/GameContext.jsx
import { createContext, useCallback, useMemo, useState, useEffect } from "react";
import { DIFFICULTIES } from "../data/difficulties";
import { THEMES } from "../data/themes";
import { ACHIEVEMENTS } from "../data/achievements";
import { soundManager } from "../utils/audio";
// 1. IMPORTANTE: Importe o cliente do Supabase que você criou
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

  // Inicializa Perfis
  const [profiles, setProfiles] = useState(() => {
    try {
      const savedProfiles = localStorage.getItem(STORAGE_PROFILES_KEY);
      if (savedProfiles) return JSON.parse(savedProfiles);

      const legacyName = localStorage.getItem("respconex_player_name") || "Jogador 1";
      const legacyCompleted = JSON.parse(localStorage.getItem("respconex_completed") || "[]");
      const legacyStats = JSON.parse(localStorage.getItem("respconex_stats") || '{"gamesPlayed":0,"gamesWon":0,"flawlessWins":0}');
      const legacyAchievements = JSON.parse(localStorage.getItem("respconex_achievements") || "[]");

      return [{
        id: "usr_" + Date.now(),
        name: legacyName,
        avatar: "🫁",
        createdAt: new Date().toISOString(),
        completedThemes: legacyCompleted,
        stats: legacyStats,
        unlockedAchievements: legacyAchievements,
      }];
    } catch {
      return [{
        id: "usr_" + Date.now(),
        name: "Jogador 1",
        avatar: "🫁",
        createdAt: new Date().toISOString(),
        completedThemes: [],
        stats: { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0 },
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
      completedThemes: [],
      stats: { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0 },
      unlockedAchievements: [],
    };
  }, [profiles, activeProfileId]);

  // ==========================================
  // SYNC COM SUPABASE (NOVO)
  // ==========================================
  useEffect(() => {
    // Evita rodar antes da configuração do supabase existir ou se for fallback
    if (!supabase || activeProfile.id === "fallback") return;

    // Timeout (debounce) de 2 segundos para evitar spammar o banco de dados se o 
    // jogador estiver mudando de foto/nome muitas vezes seguidas.
    const syncTimeout = setTimeout(async () => {
      try {
        const payload = {
          id: activeProfile.id,
          player_name: activeProfile.name || "Jogador Anônimo",
          avatar: activeProfile.avatar || "🫁",
          themes_count: activeProfile.completedThemes?.length || 0,
          games_won: activeProfile.stats?.gamesWon || 0,
          score: activeProfile.stats?.score || 0, // <--- ADICIONE ESTA LINHA
          achievements_count: activeProfile.unlockedAchievements?.length || 0,
          updated_at: new Date().toISOString()
        };
        

        // O 'upsert' insere se o ID for novo, ou atualiza se já existir no Supabase.
        const { error } = await supabase
          .from("leaderboard")
          .upsert(payload, { onConflict: "id" });

        if (error) {
          console.error("Falha silenciosa ao sincronizar ranking:", error.message);
        }
      } catch (err) {
        console.warn("Sem conexão com ranking online. Salvando apenas localmente.");
      }
    }, 2000); 

    return () => clearTimeout(syncTimeout);
  }, [activeProfile]); 
  // O sync dispara sempre que nome, avatar, stats, conquistas ou temas do activeProfile mudarem.
  // ==========================================


  const playerName = activeProfile.name;
  const completedThemes = activeProfile.completedThemes || [];
  const stats = activeProfile.stats || { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0 };
  const unlockedAchievements = activeProfile.unlockedAchievements || [];

  const updateActiveProfile = useCallback((updater) => {
    setProfiles((prev) =>
      prev.map((profile) => {
        if (profile.id !== activeProfileId) return profile;
        return updater(profile);
      })
    );
  }, [activeProfileId]);

  const createProfile = useCallback((name, avatar = "🫁") => {
    const newId = "usr_" + Date.now();
    const newProfile = {
      id: newId,
      name: name.trim() || "Novo Jogador",
      avatar,
      createdAt: new Date().toISOString(),
      completedThemes: [],
      stats: { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0 },
      unlockedAchievements: [],
    };
    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newId);
    return newProfile;
  }, []);

  const switchProfile = useCallback((id) => {
    setActiveProfileId(id);
  }, []);

  const deleteProfile = useCallback((id) => {
    setProfiles((prev) => {
      if (prev.length <= 1) return prev; 
      const updated = prev.filter((p) => p.id !== id);
      if (activeProfileId === id) {
        setActiveProfileId(updated[0].id);
      }
      return updated;
    });
  }, [activeProfileId]);

  const setPlayerName = useCallback((name) => {
    updateActiveProfile((profile) => ({ ...profile, name }));
  }, [updateActiveProfile]);

  const setPlayerAvatar = useCallback((avatar) => {
    updateActiveProfile((profile) => ({ ...profile, avatar }));
  }, [updateActiveProfile]);

  const unlockAchievement = useCallback((achId) => {
    if (!ACHIEVEMENTS[achId]) return;

    updateActiveProfile((profile) => {
      const currentAchs = profile.unlockedAchievements || [];
      if (currentAchs.includes(achId)) return profile;

      if (soundManager && typeof soundManager.playAchievement === "function") {
        soundManager.playAchievement();
      }

      setRecentAchievement(ACHIEVEMENTS[achId]);
      setTimeout(() => setRecentAchievement(null), 5000);

      const nextAchs = [...currentAchs, achId];

      const standardKeys = Object.keys(ACHIEVEMENTS).filter((k) => k !== "completionist");
      const hasAllStandard = standardKeys.every((key) => nextAchs.includes(key));

      if (hasAllStandard && !nextAchs.includes("completionist")) {
        setTimeout(() => {
          unlockAchievement("completionist");
        }, 1200);
      }

      return { ...profile, unlockedAchievements: nextAchs };
    });
  }, [updateActiveProfile]);

  useEffect(() => {
    window.testAchievement = (achId) => {
      unlockAchievement(achId);
    };
  }, [unlockAchievement]);

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

    if (tierKey === "medium") {
      return easyThemes.length > 0 && easyThemes.every((t) => completedThemes.includes(t.id));
    }

    if (tierKey === "hard") {
      return mediumThemes.length > 0 && mediumThemes.every((t) => completedThemes.includes(t.id));
    }

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

  const recordGameResult = useCallback((won, difficultyId, livesRemaining, totalLives) => {
    updateActiveProfile((profile) => {
      // Garante que o score comece em zero para perfis antigos
      const prevStats = profile.stats || { gamesPlayed: 0, gamesWon: 0, flawlessWins: 0, score: 0 };
      const nextGamesPlayed = (prevStats.gamesPlayed || 0) + 1;
      const nextGamesWon = won ? (prevStats.gamesWon || 0) + 1 : (prevStats.gamesWon || 0);
      let nextFlawless = prevStats.flawlessWins || 0;
      let nextScore = prevStats.score || 0; // Puxa o score atual

      if (nextGamesPlayed >= 1) unlockAchievement("first_blood");
      if (nextGamesPlayed >= 10) unlockAchievement("veteran");

      if (won) {
        if (nextGamesWon >= 1) unlockAchievement("first_win");

        // --- SISTEMA DE PONTUAÇÃO ---
        let pointsEarned = 0;
        if (difficultyId === "facil" || difficultyId === "easy") pointsEarned = 10;
        else if (difficultyId === "medio" || difficultyId === "medium") pointsEarned = 25;
        else if (difficultyId === "dificil" || difficultyId === "hard") pointsEarned = 50;
        
        // Bônus Flawless (Vida Cheia)
        if (totalLives !== null && livesRemaining === totalLives) {
          nextFlawless += 1;
          pointsEarned += 15; 
          unlockAchievement("flawless");
        }

        if (totalLives !== null && livesRemaining === 1) {
          unlockAchievement("survivor");
        }

        nextScore += pointsEarned; // Soma os pontos da partida
      }

      return {
        ...profile,
        stats: {
          ...prevStats,
          gamesPlayed: nextGamesPlayed,
          gamesWon: nextGamesWon,
          flawlessWins: nextFlawless,
          score: nextScore, // Salva o novo score
        },
      };
    });
  }, [updateActiveProfile, unlockAchievement]);
  
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
    profiles,
    activeProfile,
    activeProfileId,
    createProfile,
    switchProfile,
    deleteProfile,
    playerName,
    setPlayerName,
    setPlayerAvatar,
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
    screen, goTo, difficulty, chosenThemeId, lastResult, heartRate,
    profiles, activeProfile, activeProfileId, createProfile, switchProfile, deleteProfile,
    playerName, setPlayerName, setPlayerAvatar, completedThemes, markThemeCompleted,
    isTierUnlocked, isThemeUnlocked, stats, unlockedAchievements, recentAchievement,
    unlockAchievement, recordGameResult
  ]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export { useGame } from "../hooks/useGame";