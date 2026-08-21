// src/components/themes/ThemeCard.jsx
import ThemeIcon from "../shared/ThemeIcon";

export default function ThemeCard({
  title,
  subtitle,
  groups,
  icon,
  active,
  isCompleted,
  isLocked,
  levelNumber,
  onSelect,
}) {
  const handleClick = () => {
    if (isLocked) return;
    onSelect();
  };

  return (
    <div
      className={`theme-card ${active ? "theme-card--selected" : ""} ${
        isCompleted ? "theme-card--completed" : ""
      } ${isLocked ? "theme-card--locked" : ""}`}
      onClick={handleClick}
      style={{
        opacity: isLocked ? 0.55 : 1,
        cursor: isLocked ? "not-allowed" : "pointer",
        position: "relative",
      }}
    >
      <div className="theme-card__header">
        {icon && <ThemeIcon name={icon} />}
        <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {levelNumber && (
            <span
              style={{
                fontSize: "0.8rem",
                padding: "2px 6px",
                borderRadius: "4px",
                background: "rgba(255, 255, 255, 0.1)",
              }}
            >
              Fase {levelNumber}
            </span>
          )}
          {title}
        </h3>
        {isCompleted && (
          <span className="theme-badge-completed" title="Você já concluiu este tema!">
            ✅
          </span>
        )}
        {isLocked && (
          <span className="theme-badge-locked" title="Fase bloqueada" style={{ fontSize: "1.1rem" }}>
            🔒
          </span>
        )}
      </div>

      {subtitle && <p className="theme-card__subtitle">{subtitle}</p>}

      {groups && !isLocked && (
        <div className="groups">
          {groups.map((g) => (
            <span key={g.name} className="swatch-pill" style={{ background: g.color }}>
              {g.name}
            </span>
          ))}
        </div>
      )}

      {isLocked && (
        <p style={{ fontSize: "0.8rem", color: "var(--coral, #f87171)", marginTop: "0.4rem" }}>
          Conclua a fase anterior para liberar.
        </p>
      )}
    </div>
  );
}