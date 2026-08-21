import LungIcon from "../shared/LungIcon";

export default function DifficultyCard({ config, active, onSelect, description }) {
  return (
    <div
      className="diff-card"
      style={{ borderColor: active ? "var(--mint)" : "var(--line)" }}
      onClick={onSelect}
    >
      <h3>
        {config.label} — {config.lives === null ? "sem sistema de vidas" : `${config.lives} vidas`}
      </h3>
      <p>{description}</p>
      {config.lives !== null && (
        <div className="lives-demo">
          {Array.from({ length: config.lives }).map((_, i) => (
            <LungIcon key={i} filled />
          ))}
        </div>
      )}
    </div>
  );
}
