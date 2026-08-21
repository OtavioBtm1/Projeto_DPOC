import { useGame } from "../../context/GameContext";
import { THEMES } from "../../data/themes";

export default function LibraryScreen() {
  const { goTo, completedThemes } = useGame();

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
