import { useGame } from "../../context/GameContext";
import { DIFFICULTIES } from "../../data/difficulties";
import DifficultyCard from "./DifficultyCard";

const DESCRIPTIONS = {
  facil:
    "Tentativas ilimitadas. Ideal para quem está conhecendo o conteúdo pela primeira vez, sem pressão.",
  medio: "Você erra e o jogo avisa, mas tem margem para tentar de novo.",
  dificil: "Menor margem de erro — para quem já domina o conteúdo e quer se desafiar.",
};

export default function DifficultyScreen() {
  const { goTo, difficulty, setDifficulty } = useGame();

  return (
    <section className="screen screen--active">
      <div className="sub-header">
        <button className="back" onClick={() => goTo("menu")}>
          ← Menu Principal
        </button>
      </div>
      <div className="wizard-step">Passo 1 de 2</div>
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

      <div className="sticky-actions">
        <button
          className="btn btn--primary"
          onClick={() => goTo("themes")}
        >
          Continuar para Temas →
        </button>
      </div>
    </section>
  );
}
