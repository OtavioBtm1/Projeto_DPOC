import { useGame } from "../../context/GameContext";
import { THEMES } from "../../data/themes";
import ThemeCard from "./ThemeCard";

export default function ThemeScreen() {
  const { goTo, chosenThemeId, setChosenThemeId, setLastResult, completedThemes } = useGame();

  const progressPct = Math.round((completedThemes.length / THEMES.length) * 100);

  return (
    <section className="screen screen--active">
      <div className="sub-header">
        <button className="back" onClick={() => goTo("difficulty")}>
          ← Voltar à Dificuldade
        </button>
      </div>
      
      <div className="theme-progress-header">
        <div className="wizard-step">Passo 2 de 2</div>
        <div className="theme-progress-bar-wrap">
          <div className="theme-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="theme-progress-text">{completedThemes.length} / {THEMES.length} temas concluídos</span>
      </div>

      <h2 className="screen-title">Escolha o Tema</h2>
      <p className="screen-subtitle">
        Selecione um tópico específico de DPOC ou jogue com um tema aleatório.
      </p>

      <ThemeCard
        title="Aleatório"
        subtitle="Sorteia um dos blocos abaixo a cada partida."
        active={chosenThemeId === null}
        onSelect={() => setChosenThemeId(null)}
      />

      {THEMES.map((t) => (
        <ThemeCard
          key={t.id}
          title={t.title}
          subtitle={t.subtitle}
          groups={t.groups}
          icon={t.icon}
          active={chosenThemeId === t.id}
          isCompleted={completedThemes.includes(t.id)}
          onSelect={() => setChosenThemeId(t.id)}
        />
      ))}

      <div className="sticky-actions">
        <button
          className="btn btn--primary"
          disabled={chosenThemeId === undefined}
          onClick={() => {
            setLastResult(null);
            goTo("game");
          }}
        >
          {chosenThemeId === undefined ? "Selecione um tema acima" : "🎮 Iniciar Partida"}
        </button>
      </div>
    </section>
  );
}
