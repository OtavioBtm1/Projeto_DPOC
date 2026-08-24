import { useEffect } from "react";
import { useGame } from "../../context/GameContext";
import { THEMES } from "../../data/themes";

export default function LibraryScreen() {
  // 👇 Adicionei o unlockAchievement aqui!
  const { goTo, completedThemes, unlockAchievement } = useGame();

  // 👇 Esse bloco faz a medalha pular na tela assim que a tela abre!
  useEffect(() => {
    if (unlockAchievement) {
      // Dispara a conquista do El Niño
      unlockAchievement("climate_guardian");
    }
  }, [unlockAchievement]); // Colocamos a função como dependência para evitar avisos do React

  return (
    <section className="screen screen--active">
      <div className="sub-header">
        <button className="back" onClick={() => goTo("menu")}>
          ← Menu Principal
        </button>
      </div>

      <h2 className="screen-title" style={{ marginBottom: 6 }}>Biblioteca</h2>
      <p className="screen-subtitle">Sua coleção de conhecimentos médicos sobre DPOC.</p>

      <div className="library-stats">
        <strong>{completedThemes.length}</strong> de {THEMES.length} tópicos desbloqueados
      </div>

      <div className="library-list">
        
        {/* ==========================================
            NOVO: ARTIGO ESPECIAL EL NIÑO (SEMPRE DESBLOQUEADO)
            ========================================== */}
        <details className="lib-item lib-item--unlocked" style={{ border: "1px solid #38bdf8", marginBottom: "1.5rem" }} open>
          <summary className="lib-item-header" style={{ background: "rgba(56, 189, 248, 0.1)" }}>
            <div>
              <h4 style={{ color: "#38bdf8" }}>🌍 Especial: Impactos do El Niño na DPOC</h4>
              <small>✅ Artigo Livre • Mudanças Climáticas</small>
            </div>
            <span className="chev">↓</span>
          </summary>
          
          <div className="lib-item-content">
            <div className="lib-group">
              <strong style={{ color: "var(--coral, #f87171)" }}>O Fenômeno e o Risco</strong>
              <p className="lib-terms" style={{ lineHeight: "1.5", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                O El Niño altera os padrões de temperatura globais, causando ondas de calor severas e secas prolongadas. Para o paciente com DPOC, o ar excessivamente quente e seco desidrata as vias aéreas, tornando o muco pulmonar muito espesso e dificultando a sua expulsão.
              </p>
            </div>

            <div className="lib-group">
              <strong style={{ color: "var(--gold, #fbbf24)" }}>Inversão Térmica e Poluição</strong>
              <p className="lib-terms" style={{ lineHeight: "1.5", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                A falta de chuvas impede a dispersão de poluentes, poeira e fumaça de queimadas. Essa "nuvem tóxica" estaciona na altura em que respiramos, agravando agressivamente a inflamação dos brônquios.
              </p>
            </div>

            <div className="lib-group">
              <strong style={{ color: "var(--mint, #34d399)" }}>Cuidados de Enfermagem e Prevenção</strong>
              <p className="lib-terms" style={{ lineHeight: "1.5", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                • Aumentar rigorosamente a ingestão de água.<br/>
                • Utilizar umidificadores de ambiente ou bacias com água no quarto.<br/>
                • Realizar lavagem nasal diária com soro fisiológico.<br/>
                • Evitar atividades físicas ou saídas ao ar livre durante os picos de calor.
              </p>
            </div>

            <div className="lib-fact" style={{ marginTop: "1rem", borderLeftColor: "#38bdf8" }}>
              <span className="lib-fact-badge" style={{ background: "#38bdf8", color: "#000" }}>ALERTA CLIMÁTICO</span>
              <p>As mudanças climáticas já são consideradas pela Organização Mundial da Saúde (OMS) como um dos maiores fatores de risco para exacerbações hospitalares em doenças respiratórias crônicas.</p>
            </div>
          </div>
        </details>

        {/* ==========================================
            LISTA ORIGINAL DE TEMAS DO JOGO
            ========================================== */}
        {THEMES.map((theme) => {
          const isUnlocked = completedThemes.includes(theme.id);
          
          return (
            <details key={theme.id} className={`lib-item ${isUnlocked ? 'lib-item--unlocked' : 'lib-item--locked'}`}>
              <summary className="lib-item-header">
                <div>
                  <h4>{theme.title}</h4>
                  <small>{isUnlocked ? "✅ Desbloqueado" : "🔒 Jogue este tema para desbloquear"}</small>
                </div>
                <span className="chev">↓</span>
              </summary>
              
              {isUnlocked && (
                <div className="lib-item-content">
                  {theme.groups.map(group => (
                    <div key={group.name} className="lib-group">
                      <strong style={{ color: group.color }}>{group.name}</strong>
                      <p className="lib-terms">{group.items.join(" · ")}</p>
                      <div className="lib-fact">
                        <span className="lib-fact-badge">FATO CLÍNICO</span>
                        <p>{group.didYouKnow}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </details>
          );
        })}
      </div>
    </section>
  );
}