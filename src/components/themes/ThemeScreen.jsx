import { useState, useEffect } from "react";
import { useGame } from "../../context/GameContext";
import { THEMES } from "../../data/themes";
import ThemeCard from "./ThemeCard";

export default function ThemeScreen() {
  const {
    goTo,
    chosenThemeId,
    setChosenThemeId,
    setDifficulty,
    completedThemes,
    isTierUnlocked,
    isThemeUnlocked,
  } = useGame();

  const [tutorialDone, setTutorialDone] = useState(false);
  // Se ele não fez o tutorial, força a aba ativa ser "tutorial". Se fez, pode ser "easy".
  const [activeTier, setActiveTier] = useState("tutorial"); 

  // Verifica se o tutorial foi concluído
  useEffect(() => {
    const isDone = localStorage.getItem("respconex_tutorial_done") === "true";
    setTutorialDone(isDone);
    
    // Se ele já fez o tutorial, abre na aba fácil em vez do tutorial
    if (isDone && activeTier === "tutorial") {
      setActiveTier("easy");
    }
  }, []);

  const progressPct = Math.round((completedThemes.length / THEMES.length) * 100);
  const currentThemes = THEMES.filter((t) => t.tier === activeTier);

  // MÁGICA: Adicionei a aba "Tutorial" na lista, e ela é a única desbloqueada no início
  const tiersList = [
    { key: "tutorial", label: "🟡 Treino", desc: "Aprenda a jogar", isAlwaysUnlocked: true },
    { key: "easy", label: "🟢 Estudante", desc: "Sintomas e dia a dia" },
    { key: "medium", label: "🟡 Enfermeiro", desc: "Prevenção e controle" },
    { key: "hard", label: "🔴 Professor", desc: "Avaliação avançada" },
  ];

  // Ação de confirmar: Se for tutorial joga na hora. Se não, continua normal.
  const handleStartPlay = () => {
    if (activeTier === "tutorial") {
      setDifficulty("tutorial");
      goTo("game");
    } else {
      goTo("difficulty");
    }
  };

  return (
    <section className="screen screen--active">
      <div className="sub-header">
        <button className="back" onClick={() => goTo("menu")}>
          ← Menu Principal
        </button>
      </div>

      <div className="theme-progress-header">
        <div className="wizard-step">{activeTier === "tutorial" ? "Treinamento Obrigatório" : "Passo 1 de 2"}</div>
        <div className="theme-progress-bar-wrap">
          <div className="theme-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="theme-progress-text">
          {completedThemes.length} / {THEMES.length} fases concluídas
        </span>
      </div>

      <h2 className="screen-title">Trilha do Conhecimento</h2>
      <p className="screen-subtitle">
        {tutorialDone ? "Escolha o tema que deseja estudar ou revisar agora." : "Antes de continuar, aprenda as mecânicas básicas do jogo."}
      </p>

      {/* Seletor de Abas por Dificuldade do Tema */}
      <div
        className="tier-tabs"
        style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.25rem", marginBottom: "1.5rem",
        }}
      >
        {tiersList.map((tier) => {
          // O tutorial é sempre livre. Os outros dependem de ter feito o tutorial + as regras do jogo.
          const unlocked = tier.isAlwaysUnlocked || (tutorialDone && isTierUnlocked(tier.key));
          const isActive = activeTier === tier.key;
          const isPulsing = tier.key === "tutorial" && !tutorialDone; // Pulsa amarelo pro novato

          return (
            <button
              key={tier.key}
              type="button"
              onClick={() => unlocked && setActiveTier(tier.key)}
              style={{
                padding: "0.5rem 0.25rem", borderRadius: "8px",
                border: isActive ? "2px solid var(--gold, #fbbf24)" : "1px solid rgba(255,255,255,0.15)",
                background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                color: unlocked ? "inherit" : "rgba(255,255,255,0.4)",
                cursor: unlocked ? "pointer" : "not-allowed",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", textAlign: "center",
                animation: isPulsing ? "pulse 2s infinite" : "none",
                boxShadow: isPulsing ? "0 0 15px rgba(250, 204, 21, 0.6)" : "none",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                {tier.label} {!unlocked && "🔒"}
              </span>
              <span style={{ fontSize: "0.6rem", opacity: 0.8, whiteSpace: "nowrap" }}>{tier.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Lista das Fases */}
      <div className="themes-list" style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {currentThemes.map((t) => {
          // A fase do tutorial está sempre livre. As outras respeitam o isThemeUnlocked.
          const unlocked = t.tier === "tutorial" || (tutorialDone && isThemeUnlocked(t));
          const completed = completedThemes.includes(t.id);

          return (
            <ThemeCard
              key={t.id} title={t.title} subtitle={t.subtitle} groups={t.groups}
              icon={t.icon} levelNumber={t.levelNumber} active={chosenThemeId === t.id}
              isCompleted={completed} isLocked={!unlocked}
              onSelect={() => setChosenThemeId(t.id)}
            />
          );
        })}
      </div>

      <div className="sticky-actions" style={{ marginTop: "2rem" }}>
        <button
          className="btn btn--primary"
          disabled={!chosenThemeId}
          onClick={handleStartPlay}
          style={{ animation: (chosenThemeId && !tutorialDone) ? "pulse 2s infinite" : "none" }}
        >
          {!chosenThemeId 
            ? "Selecione uma fase acima" 
            : activeTier === "tutorial" ? "JOGAR TUTORIAL AGORA 🎮" : "Continuar para Dificuldade →"
          }
        </button>
      </div>
    </section>
  );
}