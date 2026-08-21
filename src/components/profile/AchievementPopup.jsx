import { useGame } from "../../context/GameContext";

export default function AchievementPopup() {
  const { recentAchievement } = useGame();

  if (!recentAchievement) return null;

  return (
    <div className="achievement-popup">
      <div className="ach-popup-icon">{recentAchievement.icon}</div>
      <div className="ach-popup-text">
        <small>Nova Conquista Desbloqueada!</small>
        <strong>{recentAchievement.title}</strong>
      </div>
    </div>
  );
}
