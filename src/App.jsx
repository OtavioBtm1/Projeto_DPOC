import { useState, useEffect, useRef } from "react";
import { useGame } from "./context/GameContext";
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
import { soundManager } from "./utils/audio";

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

// Trilha sonora instrumental calma, acústica e educativa
const BGM_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";

export default function App() {
  const { screen, heartRate } = useGame();
  const ActiveScreen = SCREENS[screen] ?? MainMenu;

  // Estados da Splash Screen e do Áudio
  const [showSplash, setShowSplash] = useState(true);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem("respconex_master_volume");
    return saved !== null ? parseFloat(saved) : 0.3;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef(null);

  // Splash Screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Ajusta o volume da música de fundo e salva a preferência global
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    localStorage.setItem("respconex_master_volume", volume.toString());
    localStorage.setItem("respconex_is_muted", isMuted ? "true" : "false");
  }, [volume, isMuted]);

  // Alterna Mute / Unmute
  // Na função toggleMute:
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

// Na função handleVolumeChange:
const handleVolumeChange = (e) => {
  const newVol = parseFloat(e.target.value);
  setVolume(newVol);
  soundManager.setVolume(newVol);

  if (newVol > 0 && isMuted) {
    setIsMuted(false);
    soundManager.muted = false;
  }
  if (audioRef.current) {
    audioRef.current.volume = isMuted ? 0 : newVol;
    if (audioRef.current.paused && newVol > 0) {
      audioRef.current.play().catch(() => {});
    }
  }
};

  return (
    <div className="app">
      {/* Música Ambiente de Fundo */}
      <audio ref={audioRef} src={BGM_URL} loop preload="auto" />

      {/* Controle de Volume Flutuante com Slider */}
      <div
        style={{
          position: "fixed",
          top: "14px",
          left: "14px",
          zIndex: 9000,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button
          onClick={toggleMute}
          title={isMuted || volume === 0 ? "Desmutar som" : "Mutar som"}
          style={{
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            color: isMuted || volume === 0 ? "#94a3b8" : "#38bdf8",
            borderRadius: "50%",
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
            transition: "all 0.2s ease",
          }}
        >
          {isMuted || volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
        </button>

        {/* Slider Deslizante que aparece ao passar o mouse ou tocar */}
        {showVolumeSlider && (
          <div
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              borderRadius: "20px",
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
              animation: "fadeIn 0.2s ease-out",
            }}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              style={{
                width: "80px",
                height: "4px",
                cursor: "pointer",
                accentColor: "#38bdf8",
              }}
            />
            <span
              style={{
                color: "#94a3b8",
                fontSize: "0.75rem",
                fontWeight: "600",
                minWidth: "30px",
              }}
            >
              {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        )}
      </div>

      {/* Splash Screen com Pulso Respiratório */}
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
              animation: "pulse 2s infinite ease-in-out",
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
          <div
            style={{
              width: "140px",
              height: "4px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "4px",
              overflow: "hidden",
              marginTop: "0.8rem",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, #38bdf8, #34d399)",
              }}
            />
          </div>
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