import { useState } from "react";

export default function SolvedBand({ name, color, items, didYouKnow, initiallyOpen = false }) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [isPlaying, setIsPlaying] = useState(false);

  const speakFact = (e) => {
    e.stopPropagation();
    if (!("speechSynthesis" in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(didYouKnow);
    utterance.lang = "pt-BR";
    utterance.rate = 1.0;
    utterance.onend = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="band" style={{ background: color }}>
      <div className="band-main" onClick={() => didYouKnow && setIsOpen((prev) => !prev)}>
        <div className="band-content">
          <div className="band-title">{name}</div>
          <div className="band-items">{items.join(" · ")}</div>
        </div>
        {didYouKnow && (
          <button
            type="button"
            className={`band-toggle-btn ${isOpen ? "band-toggle-btn--active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
            aria-label="Ver fato educativo"
            title="Dica de Saúde"
          >
            💡 {isOpen ? "Ocultar" : "Fato"}
          </button>
        )}
      </div>

      {didYouKnow && isOpen && (
        <div className="band-did-you-know" role="note">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="band-fact-badge">Você Sabia?</span>
            <button type="button" className="tts-btn" onClick={speakFact} aria-label="Ouvir explicação">
              {isPlaying ? "⏹️ Parar" : "🔊 Ouvir"}
            </button>
          </div>
          <p className="band-fact-text">{didYouKnow}</p>
        </div>
      )}
    </div>
  );
}