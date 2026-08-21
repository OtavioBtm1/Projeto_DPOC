export default function Tile({ term, selected, solved, shake, onClick }) {
  if (solved) {
    return <div className="tile tile--solved-hidden" aria-hidden="true" />;
  }

  return (
    <div
      className={`tile ${selected ? "tile--selected" : ""} ${shake ? "tile--shake" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {term}
    </div>
  );
}
