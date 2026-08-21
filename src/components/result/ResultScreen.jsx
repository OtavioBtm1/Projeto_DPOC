// src/components/result/ResultScreen.jsx
import { useEffect, useState } from "react";
import { useGame } from "../../context/GameContext";
import { DIFFICULTIES } from "../../data/difficulties";
import { THEMES } from "../../data/themes";
import SolvedBand from "../game/SolvedBand";
import { getPlayerRank } from "../../utils/ranks";

export default function ResultScreen() {
  const {
    goTo,
    lastResult,
    difficulty,
    chosenThemeId,
    setChosenThemeId,
    setLastResult,
    markThemeCompleted,
    recordGameResult,
    stats,
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
  const selectedThemeTitle = puzzle?.title || "Trilha DPOC";

  // Identifica o índice atual e a próxima fase da trilha
  const currentThemeIndex = THEMES.findIndex((t) => t.id === (puzzle?.id || chosenThemeId));
  const nextTheme = currentThemeIndex >= 0 && currentThemeIndex < THEMES.length - 1 
    ? THEMES[currentThemeIndex + 1] 
    : null;

  // --- CÁLCULO DE PONTOS PARA EXIBIÇÃO NA TELA ---
  const livesRemaining = lastResult.livesRemaining ?? 0;
  const totalLives = difficultyConfig.lives;
  
  let pointsEarned = 0;
  let flawlessBonus = false;

  if (won) {
    if (difficulty === "facil" || difficulty === "easy") pointsEarned = 10;
    else if (difficulty === "medio" || difficulty === "medium") pointsEarned = 25;
    else if (difficulty === "dificil" || difficulty === "hard") pointsEarned = 50;

    if (livesRemaining === totalLives) {
      pointsEarned += 15;
      flawlessBonus = true;
    }
  }

  const currentRank = getPlayerRank(stats?.score || 0);

  useEffect(() => {
    if (won && puzzle?.id) {
      markThemeCompleted(puzzle.id);
    }
    if (won && typeof window.confetti === "function") {
      window.confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#7fd8c0", "#f4c25d", "#5fa8d3", "#ffffff"],
      });
    }

    // Registra estatísticas e avalia conquistas
    recordGameResult(
      won,
      difficulty,
      lastResult.livesRemaining,
      difficultyConfig.lives,
      lastResult.hintsUsed || 0,
      puzzle?.tier || "easy"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNextLevel = () => {
    if (nextTheme) {
      setChosenThemeId(nextTheme.id);
      setLastResult(null);
      goTo("game");
    } else {
      goTo("themes");
    }
  };

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
Fase: ${puzzle.title}
Dificuldade: ${difficultyConfig.label}
Resultado: ${won ? "Fase Concluída! 🎉" : `Completou ${solvedCount}/${totalGroups} grupos`}
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
        <h1 className="result-title">{won ? "Fase Concluída com Sucesso!" : "Fim de partida"}</h1>
        <p className="result-sub">
          {won
            ? "Você dominou as correlações desta fase de DPOC. Revise os conceitos abaixo ou siga para a próxima etapa!"
            : "Você praticou conceitos importantes. Aproveite o caderno abaixo para revisar os grupos e suas explicações."}
        </p>
      </div>

      {/* --- CAIXA DE RECOMPENSA DE PONTOS E PATENTE --- */}
      {won && (
        <div style={{ 
          background: "#051318", 
          border: "1px solid #1e4d5f", 
          borderRadius: "12px", 
          padding: "1rem", 
          maxWidth: "360px", 
          margin: "0 auto 1.5rem auto",
          textAlign: "center"
        }}>
          <span style={{ color: "#38bdf8", fontSize: "1.2rem", fontWeight: "bold" }}>
            +{pointsEarned} Pontos ganhos nesta fase!
          </span>
          {flawlessBonus && (
            <div style={{ color: "#fbbf24", fontSize: "0.8rem", marginTop: "0.2rem" }}>
              ✨ Bônus Flawless (Vida Cheia): +15 pts
            </div>
          )}
          <div style={{ marginTop: "0.6rem", fontSize: "0.85rem", color: currentRank.color, fontWeight: "bold" }}>
            Patente atual: {currentRank.badge} {currentRank.title}
          </div>
        </div>
      )}

      <div className="result-meta" aria-label="Resumo da partida">
        <div className="result-meta-item">
          <span>fase</span>
          <strong>{selectedThemeTitle}</strong>
        </div>
        <div className="result-meta-item">
          <span>modo de vidas</span>
          <strong>{difficultyConfig.label}</strong>
        </div>
        <div className="result-meta-item">
          <span>grupos</span>
          <strong>
            {won ? `${totalGroups}/${totalGroups} Concluídos` : `${solvedCount}/${totalGroups} Resolvidos`}
          </strong>
        </div>
      </div>

      <div className="result-actions">
        {/* Botão de Avanço Imediato para a Próxima Fase */}
        {won && nextTheme && (
          <button
            className="btn btn--primary result-main-action"
            style={{
              fontSize: "1.05rem",
              boxShadow: "0 0 15px rgba(127, 216, 192, 0.4)",
            }}
            onClick={handleNextLevel}
          >
            ▶️ Avançar para {nextTheme.levelNumber ? `Fase ${nextTheme.levelNumber}` : nextTheme.title}
          </button>
        )}

        <button className={`btn ${!won ? "btn--primary" : ""} result-main-action`} onClick={startAgain}>
          {won ? "🔄 Jogar esta fase novamente" : "🔄 Tentar novamente"}
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
            🗺️ Trilha de Fases
          </button>
          <button className="btn" onClick={openDifficulty}>
            ⚡ Mudar Vidas
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