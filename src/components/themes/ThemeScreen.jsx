// src/components/themes/ThemeScreen.jsx
import { useState } from "react";
import { useGame } from "../../context/GameContext";
import { THEMES, THEME_TIERS } from "../../data/themes";
import ThemeCard from "./ThemeCard";

export default function ThemeScreen() {
  const {
    goTo,
    chosenThemeId,
    setChosenThemeId,
    setLastResult,
    completedThemes,
    isTierUnlocked,
    isThemeUnlocked,
  } = useGame();

  const [activeTier, setActiveTier] = useState("easy");

  const progressPct = Math.round((completedThemes.length / THEMES.length) * 100);

  // Filtra apenas os temas da aba ativa
  const currentThemes = THEMES.filter((t) => t.tier === activeTier);

  const tiersList = [
    { key: "easy", label: "🟢 Fácil (Estudante)", desc: "Sintomas e hábitos" },
    { key: "medium", label: "🟡 Médio (Enfermeiro)", desc: "Tratamento e exames" },
    { key: "hard", label: "🔴 Difícil (Professor )", desc: "Fisiopatologia e UTI" },
  ];

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
        <span className="theme-progress-text">
          {completedThemes.length} / {THEMES.length} fases concluídas
        </span>
      </div>

      <h2 className="screen-title">Trilha do Conhecimento</h2>
      <p className="screen-subtitle">
        Progrida pelas fases para desbloquear os níveis mais avançados.
      </p>

      {/* Seletor de Abas por Dificuldade */}
      <div
        className="tier-tabs"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        {tiersList.map((tier) => {
          const unlocked = isTierUnlocked(tier.key);
          const isActive = activeTier === tier.key;

          return (
            <button
              key={tier.key}
              type="button"
              onClick={() => unlocked && setActiveTier(tier.key)}
              style={{
                padding: "0.75rem 0.5rem",
                borderRadius: "8px",
                border: isActive ? "2px solid var(--gold, #fbbf24)" : "1px solid rgba(255,255,255,0.15)",
                background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                color: unlocked ? "inherit" : "rgba(255,255,255,0.4)",
                cursor: unlocked ? "pointer" : "not-allowed",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.25rem",
                textAlign: "center",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                {tier.label} {!unlocked && "🔒"}
              </span>
              <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>{tier.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Lista das 5 Fases da Dificuldade Ativa */}
      <div className="themes-list" style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {currentThemes.map((t) => {
          const unlocked = isThemeUnlocked(t);
          const completed = completedThemes.includes(t.id);

          return (
            <ThemeCard
              key={t.id}
              title={t.title}
              subtitle={t.subtitle}
              groups={t.groups}
              icon={t.icon}
              levelNumber={t.levelNumber}
              active={chosenThemeId === t.id}
              isCompleted={completed}
              isLocked={!unlocked}
              onSelect={() => setChosenThemeId(t.id)}
            />
          );
        })}
      </div>

      <div className="sticky-actions" style={{ marginTop: "2rem" }}>
        <button
          className="btn btn--primary"
          disabled={!chosenThemeId}
          onClick={() => {
            setLastResult(null);
            goTo("game");
          }}
        >
          {!chosenThemeId ? "Selecione uma fase acima" : "🎮 Iniciar Fase"}
        </button>
      </div>
    </section>
  );
}