// src/components/common/AchievementBanner.jsx
import { useGame } from "../../hooks/useGame"; // ou "../../context/GameContext" se você importa de lá

export default function AchievementBanner() {
  const { recentAchievement } = useGame();

  if (!recentAchievement) return null;

  return (
    <div
      className="achievement-toast"
      role="alert"
      style={{
        position: "fixed",
        top: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        border: "2px solid #f4c25d",
        boxShadow: "0 10px 25px rgba(0,0,0,0.5), 0 0 15px rgba(244, 194, 93, 0.4)",
        borderRadius: "12px",
        padding: "10px 18px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: "#fff",
        minWidth: "280px",
        maxWidth: "90vw",
        animation: "slideDown 0.4s ease-out",
        pointerEvents: "none",
      }}
    >
      <span style={{ fontSize: "2rem", lineHeight: 1 }}>
        {recentAchievement.icon}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <span
          style={{
            fontSize: "0.68rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#f4c25d",
            fontWeight: "700",
          }}
        >
          🏆 Conquista Desbloqueada!
        </span>
        <strong style={{ fontSize: "0.95rem", color: "#f8fafc" }}>
          {recentAchievement.title}
        </strong>
        <small style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
          {recentAchievement.description}
        </small>
      </div>
    </div>
  );
}