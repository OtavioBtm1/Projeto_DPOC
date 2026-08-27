import { useState, useEffect } from "react";
import { useGame } from "../../context/GameContext";

export default function DifficultyScreen() {
  const { goTo, setDifficulty, setChosenThemeId } = useGame();
  const [tutorialDone, setTutorialDone] = useState(false);

  // Verifica se o jogador já concluiu o tutorial no passado
  useEffect(() => {
    const isDone = localStorage.getItem("respconex_tutorial_done") === "true";
    setTutorialDone(isDone);
  }, []);

  // Ação especial para o Tutorial (Pula a tela de temas e vai direto pro jogo)
  const handlePlayTutorial = () => {
    setDifficulty("tutorial");
    setChosenThemeId("tutorial-1"); 
    goTo("game");
  };

  // Ação normal para os outros níveis (Vai pra tela de temas)
  const handleSelectDifficulty = (tierId) => {
    if (!tutorialDone) return; // Segurança extra: não deixa clicar se não fez o tutorial
    setDifficulty(tierId);
    goTo("themes");
  };

  return (
    <section className="screen screen--active screen--difficulty">
      <div className="screen-header">
        <h2>Escolha seu Caminho</h2>
        <p>Selecione a dificuldade do desafio</p>
      </div>

      <div className="difficulty-list" style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "0 20px" }}>
        
        {/* BOTÃO DO TUTORIAL (Brilha em amarelo se não foi feito) */}
        <button
          className="btn"
          onClick={handlePlayTutorial}
          style={{
            background: tutorialDone ? "var(--sky)" : "var(--gold)",
            color: tutorialDone ? "#fff" : "#000",
            padding: "20px",
            fontSize: "1.1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            boxShadow: tutorialDone ? "none" : "0 0 15px rgba(250, 204, 21, 0.6)",
            animation: tutorialDone ? "none" : "pulse 2s infinite",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer"
          }}
        >
          <strong>{tutorialDone ? "🔄 Refazer Treinamento" : "⚠️ COMECE POR AQUI"}</strong>
          <small style={{ fontSize: "0.85rem", opacity: 0.8 }}>
            {tutorialDone ? "Relembre as regras do jogo" : "Tutorial obrigatório para iniciantes"}
          </small>
        </button>

        {/* DIVISÓRIA */}
        <div style={{ textAlign: "center", color: "#94a3b8", margin: "10px 0", fontSize: "0.9rem" }}>
          Níveis Principais
        </div>

        {/* BOTÃO FÁCIL */}
        <button
          className="btn"
          onClick={() => handleSelectDifficulty("easy")}
          disabled={!tutorialDone}
          style={{
            background: "var(--mint)",
            color: "#000",
            padding: "16px",
            opacity: tutorialDone ? 1 : 0.4,
            filter: tutorialDone ? "none" : "grayscale(100%)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div style={{ textAlign: "left" }}>
            <strong>Nível Estudante</strong>
            <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>Sintomas, clima e dia a dia</div>
          </div>
          {!tutorialDone && <span>🔒</span>}
        </button>

        {/* BOTÃO MÉDIO */}
        <button
          className="btn"
          onClick={() => handleSelectDifficulty("medium")}
          disabled={!tutorialDone}
          style={{
            background: "var(--gold)",
            color: "#000",
            padding: "16px",
            opacity: tutorialDone ? 1 : 0.4,
            filter: tutorialDone ? "none" : "grayscale(100%)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div style={{ textAlign: "left" }}>
            <strong>Nível Enfermeiro</strong>
            <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>Prevenção e monitoramento</div>
          </div>
          {!tutorialDone && <span>🔒</span>}
        </button>

        {/* BOTÃO DIFÍCIL */}
        <button
          className="btn"
          onClick={() => handleSelectDifficulty("hard")}
          disabled={!tutorialDone}
          style={{
            background: "var(--coral)",
            color: "#fff",
            padding: "16px",
            opacity: tutorialDone ? 1 : 0.4,
            filter: tutorialDone ? "none" : "grayscale(100%)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div style={{ textAlign: "left" }}>
            <strong>Nível Professor</strong>
            <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>Manejo avançado e emergência</div>
          </div>
          {!tutorialDone && <span>🔒</span>}
        </button>

      </div>
    </section>
  );
}