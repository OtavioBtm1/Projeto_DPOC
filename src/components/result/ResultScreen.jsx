import { useEffect, useState } from "react";
import { useGame } from "../../context/GameContext";
import { DIFFICULTIES } from "../../data/difficulties";
import SolvedBand from "../game/SolvedBand";

export default function ResultScreen() {
  const {
    goTo,
    lastResult,
    difficulty,
    chosenThemeId,
    setLastResult,
  } = useGame();
  const [showAnswers, setShowAnswers] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!lastResult) {
      goTo("menu");
    }
  }, [lastResult, goTo]);

  if (!lastResult) return null;

  const { won, puzzle, solvedCount = 0, totalGroups = 4 } = lastResult;
  const difficultyConfig = DIFFICULTIES[difficulty] || DIFFICULTIES.normal;
  const selectedTheme = chosenThemeId ? puzzle.title : "Aleatório";
  const { markThemeCompleted, recordGameResult } = useGame();

  useEffect(() => {
    if (won && puzzle.id) {
      markThemeCompleted(puzzle.id);
    }
    if (won && typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#7fd8c0', '#f4c25d', '#5fa8d3', '#ffffff']
      });
    }
    // Grava as estatisticas e testa conquistas
    recordGameResult(won, difficulty, lastResult.livesRemaining, difficultyConfig.lives);
    
    // ESLint disable is fine here, we only want to run this once when lastResult mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAgain = () => {
    setLastResult(null);
    goTo("game");
  };

  const openThemes = () => {
    goTo("themes");
  };

  const openDifficulty = () => {
    goTo("difficulty");
  };

  const backToMenu = () => {
    goTo("menu");
  };

  const handleShare = async () => {
    const icon = won ? "🫁✨" : "🫁🩺";
    const text = `${icon} Jogo Educativo DPOC
Tema: ${puzzle.title}
Dificuldade: ${difficultyConfig.label}
Resultado: ${won ? "Vitória! 🎉" : "Completou " + solvedCount + "/" + totalGroups + " grupos"}
Aprenda sobre saúde respiratória e prevenção!`;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.log("Clipboard not supported");
    }
  };

  return (
    <section
      className={`screen screen--active screen--centered result-screen ${
        won ? "result-screen--won" : "result-screen--lost"
      }`}
    >
      <div className="result-heading">
        <div className="result-icon" aria-hidden="true">
          {won ? "🎉" : "🫀"}
        </div>
        <div className="result-kicker">aprendizado & resultado</div>
        <h1 className="result-title">{won ? "Mandou bem na Saúde!" : "Fim de partida"}</h1>
        <p className="result-sub">
          {won
            ? "Você dominou as correlações deste tema de DPOC. Revise os fatos de saúde abaixo para fixar o aprendizado!"
            : "Você praticou conceitos importantes. Aproveite o caderno abaixo para revisar os grupos e suas explicações."}
        </p>
      </div>

      <div className="result-meta" aria-label="Resumo da partida">
        <div className="result-meta-item">
          <span>tema</span>
          <strong>{selectedTheme}</strong>
        </div>
        <div className="result-meta-item">
          <span>dificuldade</span>
          <strong>{difficultyConfig.label}</strong>
        </div>
        <div className="result-meta-item">
          <span>grupos</span>
          <strong>{won ? `${totalGroups}/${totalGroups} Concluídos` : `${solvedCount}/${totalGroups} Resolvidos`}</strong>
        </div>
      </div>

      <div className="result-actions">
        <button className="btn btn--primary result-main-action" onClick={startAgain}>
          {won ? "Jogar novamente" : "Tentar novamente"}
        </button>

        <button className="btn result-share-btn" onClick={handleShare}>
          {copied ? "✓ Copiado para a área de transferência!" : "📤 Compartilhar resultado"}
        </button>

        <button
          className={`btn result-answer-toggle ${showAnswers ? "result-answer-toggle--active" : ""}`}
          onClick={() => setShowAnswers((visible) => !visible)}
          aria-expanded={showAnswers}
          aria-controls="result-answers"
        >
          {showAnswers ? "Ocultar caderno didático" : "📖 Ver caderno didático"}
          <span aria-hidden="true">{showAnswers ? "↑" : "↓"}</span>
        </button>

        <div className="result-actions-row">
          <button className="btn" onClick={openThemes}>
            🎨 Mudar tema
          </button>
          <button className="btn" onClick={openDifficulty}>
            ⚡ Mudar dificuldade
          </button>
        </div>

        <button className="btn result-menu-action" onClick={backToMenu}>
          ← Voltar ao menu principal
        </button>
      </div>

      <div
        id="result-answers"
        className={`result-reveal ${showAnswers ? "result-reveal--open" : "result-reveal--closed"}`}
        hidden={!showAnswers}
      >
        <div className="result-reveal-header">
          <div>
            <span className="result-reveal-kicker">caderno de conceitos</span>
            <h2>Explicações e Gabarito</h2>
          </div>
          <span className="result-reveal-count">{puzzle.groups.length} tópicos</span>
        </div>

        <div className="result-groups">
          {puzzle.groups.map((group) => (
            <SolvedBand
              key={group.name}
              name={group.name}
              color={group.color}
              items={group.items}
              didYouKnow={group.didYouKnow}
              initiallyOpen={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
