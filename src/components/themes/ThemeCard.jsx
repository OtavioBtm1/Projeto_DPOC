import ThemeIcon from "../shared/ThemeIcon";

export default function ThemeCard({ title, subtitle, groups, icon, active, isCompleted, onSelect }) {
  return (
    <div className={`theme-card ${active ? "theme-card--selected" : ""} ${isCompleted ? "theme-card--completed" : ""}`} onClick={onSelect}>
      <div className="theme-card__header">
        {icon && <ThemeIcon name={icon} />}
        <h3>{title}</h3>
        {isCompleted && <span className="theme-badge-completed" title="Você já concluiu este tema!">✅</span>}
      </div>
      {subtitle && <p className="theme-card__subtitle">{subtitle}</p>}
      {groups && (
        <div className="groups">
          {groups.map((g) => (
            <span key={g.name} className="swatch-pill" style={{ background: g.color }}>
              {g.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
