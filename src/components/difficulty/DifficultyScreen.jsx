// src/components/difficulty/DifficultyScreen.jsx
import { useGame } from "../../context/GameContext";
import { DIFFICULTIES } from "../../data/difficulties";
import DifficultyCard from "./DifficultyCard";

const DESCRIPTIONS = {
  facil: "Tentativas ilimitadas. Ideal para quem está conhecendo o conteúdo pela primeira vez, sem pressão.",
  medio: "2 Chances. Você erra e o jogo avisa, mas tem margem para tentar de novo.",
  dificil: "1 Chance. Menor margem de erro — para quem já domina o conteúdo e quer se desafiar.",
};

export default function DifficultyScreen() {
  const { 
    goTo, 
    difficulty, 
    setDifficulty, 
    chosenThemeId, 
    canPlayMatch, 
    setLastResult 
  } = useGame();

  // Verifica se o jogador PODE jogar a dificuldade selecionada para o tema escolhido no Passo 1
  const podeJogar = chosenThemeId ? canPlayMatch(chosenThemeId, difficulty) : false;

  return (
    <section className="screen screen--active">
      <div className="sub-header">
        <button className="back" onClick={() => goTo("themes")}>
          ← Voltar aos Temas
        </button>
      </div>
      
      <div className="wizard-step">Passo 2 de 2</div>
      <h2 className="screen-title">Escolha a Dificuldade</h2>
      <p className="screen-subtitle">
        Defina quantas tentativas erradas você pode ter antes do jogo terminar.
      </p>

      {Object.values(DIFFICULTIES).map((config) => (
        <DifficultyCard
          key={config.id}
          config={config}
          active={difficulty === config.id}
          description={DESCRIPTIONS[config.id]}
          onSelect={() => setDifficulty(config.id)}
        />
      ))}

      <div className="sticky-actions" style={{ marginTop: "2rem" }}>
        <button
          className="btn btn--primary"
          disabled={!podeJogar}
          onClick={() => {
            setLastResult(null);
            goTo("game");
          }}
          style={{
            background: !podeJogar ? "#7f1d1d" : "",
            borderColor: !podeJogar ? "#991b1b" : "",
            color: !podeJogar ? "#fca5a5" : ""
          }}
        >
          {podeJogar ? "🎮 Iniciar Fase" : "❌ Tentativas Esgotadas"}
        </button>
      </div>
    </section>
  );
}