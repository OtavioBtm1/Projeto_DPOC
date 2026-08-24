import { useState, useEffect, useRef } from "react";
import { useGame } from "./context/GameContext";
import { soundManager } from "./utils/audio";
import EcgSignature from "./components/layout/EcgSignature";
import TopBar from "./components/layout/TopBar";
import MainMenu from "./components/menu/MainMenu";
import DifficultyScreen from "./components/difficulty/DifficultyScreen";
import ThemeScreen from "./components/themes/ThemeScreen";
import HowToScreen from "./components/howto/HowToScreen";
import AboutScreen from "./components/about/AboutScreen";
import GameScreen from "./components/game/GameScreen";
import ResultScreen from "./components/result/ResultScreen";
import ProfileScreen from "./components/profile/ProfileScreen";
import LibraryScreen from "./components/profile/LibraryScreen";
import AchievementPopup from "./components/profile/AchievementPopup";
import RankingScreen from "./components/ranking/RankingScreen";

const SCREENS = {
  menu: MainMenu,
  difficulty: DifficultyScreen,
  themes: ThemeScreen,
  howto: HowToScreen,
  about: AboutScreen,
  game: GameScreen,
  result: ResultScreen,
  profile: ProfileScreen,
  library: LibraryScreen,
  ranking: RankingScreen,
};

const BGM_URL = "https://cdn.pixabay.com/download/audio/2022/11/06/audio_c93149ec9c.mp3?filename=gentle-piano-love-126292.mp3";

export default function App() {
  const { screen, heartRate } = useGame();
  const ActiveScreen = SCREENS[screen] ?? MainMenu;

  const [showSplash, setShowSplash] = useState(true);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem("respconex_master_volume");
    return saved !== null ? parseFloat(saved) : 0.3;
  });
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem("respconex_is_muted") === "true";
  });
  const [showAudioPopover, setShowAudioPopover] = useState(false);
  const audioRef = useRef(null);
  const popoverRef = useRef(null);

  // Splash Screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fechar popover ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowAudioPopover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Sincroniza áudio e SoundManager
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    soundManager.setVolume(volume);
    localStorage.setItem("respconex_master_volume", volume.toString());
    localStorage.setItem("respconex_is_muted", isMuted ? "true" : "false");
  }, [volume, isMuted]);

  const toggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
      if (!muted && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    soundManager.setVolume(newVol);

    if (newVol > 0 && isMuted) {
      setIsMuted(false);
      soundManager.muted = false;
    }
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (audioRef.current.paused && newVol > 0) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <div className="app">
      <audio ref={audioRef} src={BGM_URL} loop preload="auto" />

      {/* CONTROLE DE ÁUDIO RESPONSIVO (Topo Direito / Touch Friendly) */}
      <div
        ref={popoverRef}
        style={{
          position: "fixed",
          top: "12px",
          right: "14px",
          zIndex: 9000,
        }}
      >
        <button
          onClick={() => setShowAudioPopover((prev) => !prev)}
          title="Configurações de Áudio"
          aria-label="Configurações de Áudio"
          style={{
            background: "rgba(7, 25, 32, 0.9)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            color: isMuted || volume === 0 ? "#94a3b8" : "#38bdf8",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
          }}
        >
          {isMuted || volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
        </button>

        {/* POPOVER COMPACTO PARA CELULAR E DESKTOP */}
        {showAudioPopover && (
          <div
            style={{
              position: "absolute",
              top: "44px",
              right: "0",
              background: "#071920",
              border: "1px solid #1e4d5f",
              borderRadius: "12px",
              padding: "10px 14px",
              width: "160px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: "600" }}>Volume</span>
              <button
                onClick={toggleMute}
                style={{
                  background: "transparent",
                  border: "none",
                  color: isMuted ? "#f87171" : "#34d399",
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {isMuted ? "DESMUTAR" : "MUTAR"}
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                style={{
                  width: "100%",
                  height: "6px",
                  cursor: "pointer",
                  accentColor: "#38bdf8",
                }}
              />
              <span style={{ fontSize: "0.75rem", color: "#cbd5e1", minWidth: "28px", textAlign: "right" }}>
                {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Splash Screen */}
      {showSplash && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "linear-gradient(180deg, #071920 0%, #030d12 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.2rem",
          }}
        >
          <div
            style={{
              fontSize: "4rem",
              filter: "drop-shadow(0 0 20px rgba(56, 189, 248, 0.6))",
            }}
          >
            🫁
          </div>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "800",
              letterSpacing: "0.15em",
              color: "#38bdf8",
              margin: 0,
            }}
          >
            RESPCONEX
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>
            Inspirando conhecimento em saúde
          </p>
        </div>
      )}

      <AchievementPopup />
      <div className={`danger-overlay danger-overlay--${heartRate}`} />

      <EcgSignature heartRate={heartRate} />
      <TopBar />
      <ActiveScreen key={screen} />
    </div>
  );
}