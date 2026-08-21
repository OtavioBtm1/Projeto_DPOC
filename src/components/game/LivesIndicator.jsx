import LungIcon from "../shared/LungIcon";

export default function LivesIndicator({ total, filled }) {
  if (total === null) {
    return <span className="attempts-label">tentativas ilimitadas</span>;
  }

  return (
    <div className="lives">
      {Array.from({ length: total }).map((_, i) => (
        <LungIcon key={i} filled={i < filled} />
      ))}
      <span className="attempts-label">vidas</span>
    </div>
  );
}
