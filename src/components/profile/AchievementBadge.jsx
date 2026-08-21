export default function AchievementBadge({ achievement, isUnlocked }) {
  return (
    <div className={`ach-badge ${isUnlocked ? "ach-badge--unlocked" : "ach-badge--locked"}`}>
      <div className="ach-icon">{achievement.icon}</div>
      <div className="ach-info">
        <h4>{achievement.title}</h4>
        <p>{achievement.description}</p>
      </div>
    </div>
  );
}
