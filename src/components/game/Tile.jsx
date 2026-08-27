export default function Tile({ term, selected, solved, shake, onClick, isTutorial }) {
  if (solved) {
    return <div className="tile tile--solved-hidden" aria-hidden="true" />;
  }

  // MÁGICA DO TUTORIAL: Estilo ativado apenas se for tutorial e a peça não estiver selecionada
  const tutorialStyle = isTutorial && !selected ? {
    animation: "pulseTutorial 1.5s infinite",
    border: "2px solid #38bdf8",
    boxShadow: "0 0 15px rgba(56, 189, 248, 0.8)",
    zIndex: 10, // Traz a peça pra frente pra dar destaque
  } : {};

  return (
    <>
      {/* Injeta a animação direto no componente, impossível dar erro de CSS agora! */}
      <style>{`
        @keyframes pulseTutorial {
          0% { transform: scale(1); box-shadow: 0 0 5px rgba(56, 189, 248, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(56, 189, 248, 0.9); border-color: #bae6fd; }
          100% { transform: scale(1); box-shadow: 0 0 5px rgba(56, 189, 248, 0.4); }
        }
      `}</style>

      <div
        className={`tile ${selected ? "tile--selected" : ""} ${shake ? "tile--shake" : ""}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        style={tutorialStyle} 
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {term}
      </div>
    </>
  );
}