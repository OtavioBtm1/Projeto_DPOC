import { useEffect } from "react";
import { useGame } from "../../context/GameContext";
import { usePuzzle } from "../../hooks/usePuzzle";
import LivesIndicator from "./LivesIndicator";
import Tile from "./Tile";
import SolvedBand from "./SolvedBand";

export default function GameScreen() {
  const { goTo, difficulty, chosenThemeId, setLastResult, setHeartRate } = useGame();

  const {
    puzzle,
    tiles,
    selected,
    solvedGroups,
    livesLeft,
    livesTotal,
    status,
    shakeIds,
    hintsUsed, 
    gameOver,
    toggleTile,
    clearSelection,
    shuffleBoard,
    checkSelection,
  } = usePuzzle(difficulty, chosenThemeId);

  // Controle dos batimentos do ECG
  useEffect(() => {
    if (gameOver === "lost") {
      setHeartRate("flatline");
    } else if (gameOver === "won") {
      setHeartRate("normal");
    } else if (livesTotal !== null && livesLeft === 1) {
      setHeartRate("critical");
    } else if (livesTotal !== null && livesLeft === 2) {
      setHeartRate("warning");
    } else {
      setHeartRate("normal");
    }
  }, [livesLeft, livesTotal, gameOver, setHeartRate]);

  // Limpa o ECG ao sair
  useEffect(() => {
    return () => setHeartRate("normal");
  }, [setHeartRate]);

  // Salva os resultados assim que o jogo acaba
  useEffect(() => {
    if (!gameOver) return undefined;

    // Salva no navegador que o tutorial foi completado!
    if (gameOver === "won" && puzzle?.id === "tutorial-1") {
      localStorage.setItem("respconex_tutorial_done", "true");
    }

    setLastResult({
      won: gameOver === "won",
      puzzle,
      solvedCount: solvedGroups.length,
      totalGroups: puzzle?.groups?.length || 4,
      hintsUsed,
      livesRemaining: livesLeft,
    });

  }, [gameOver, puzzle, solvedGroups.length, hintsUsed, livesLeft, setLastResult]);

  if (!puzzle || !puzzle.groups) {
    return null;
  }

  // Filtra as peças que ainda NÃO foram resolvidas
  const remainingTiles = tiles
    .map((tile, originalIndex) => ({ tile, originalIndex }))
    .filter(({ tile }) => !solvedGroups.includes(tile.groupIndex));

  // ✨ MÁGICA AQUI: Acha automaticamente qual é o próximo grupo que o jogador tem que resolver no tutorial
  const nextTutorialGroupIndex = puzzle.groups.findIndex((_, index) => !solvedGroups.includes(index));

  return (
    <section className="screen screen--active screen--game">
      {/* Barra superior de status */}
      <div className="game-top">
        <LivesIndicator total={livesTotal} filled={livesLeft} />
        <div className="game-progress-badge">
          {solvedGroups.length} / {puzzle.groups.length} grupos
        </div>
        <div className="puzzle-title">{puzzle.title}</div>
      </div>

      {/* ADICIONADO: overflowY e paddingBottom para evitar qualquer sobreposição */}
      <div className="game-board-container" style={{ overflowY: "auto", paddingBottom: "140px" }}>
        {/* LISTA DE TEMAS */}
        <div className="solved-bands">
          {puzzle.groups.map((group, index) => {
            const isSolved = solvedGroups.includes(index);

            // SE TIVER RESOLVIDO: Mostra a faixa colorida
            if (isSolved) {
              return (
                <SolvedBand
                  key={`group-${index}`}
                  name={group.name}
                  color={group.color}
                  items={group.items}
                  didYouKnow={group.didYouKnow}
                />
              );
            }

            // SE NÃO TIVER RESOLVIDO: Mostra a caixa cinza tracejada com a Pista
            return (
              <div 
                key={`group-${index}`}
                style={{
                  background: "rgba(15, 23, 42, 0.4)",
                  border: "1.5px dashed rgba(148, 163, 184, 0.3)",
                  borderRadius: "12px",
                  padding: "16px 12px",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  color: "#94a3b8",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <span style={{ fontSize: "1.2rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>🔍</span>
                <span>{group.hint || "Desvende o mistério..."}</span>
              </div>
            );
          })}
        </div>

        {/* Grid de peças restantes */}
        {!gameOver && remainingTiles.length > 0 && (
          <>
            {/* MENSAGEM DO TUTORIAL (Fica fixa até ele acabar a fase) */}
            {puzzle.id === "tutorial-1" && (
              <div style={{
                background: "rgba(56, 189, 248, 0.1)",
                color: "#38bdf8",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "0.9rem",
                marginBottom: "12px",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                animation: "popIn 0.5s ease-out"
              }}>
                👋 Tutorial: Selecione as 4 peças piscando e clique em "Verificar"!
              </div>
            )}

            <div className="grid">
              {remainingTiles.map(({ tile, originalIndex }) => (
                <Tile
                  key={`${tile.term}-${originalIndex}`}
                  term={tile.term}
                  selected={selected.includes(originalIndex)}
                  solved={false}
                  shake={shakeIds.includes(originalIndex)}
                  onClick={() => toggleTile(originalIndex)}
                  // AGORA ELE SEMPRE VAI PISCAR AS 4 PEÇAS DO PRÓXIMO GRUPO!
                  isTutorial={puzzle.id === "tutorial-1" && tile.groupIndex === nextTutorialGroupIndex}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Mensagem de status */}
      <div className="status-msg" role="status" aria-live="polite" style={{ color: `var(--${status.tone})` }}>
        {gameOver === "won" ? "✨ Desafio concluído com sucesso!" : status.message || "\u00A0"}
      </div>

      {/* Botões de Ação na base */}
      <div className="game-actions">
        {gameOver ? (
          <button 
            className="btn btn--primary" 
            style={{ 
              width: "100%", 
              padding: "16px", 
              fontSize: "1.1rem",
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.4)",
              animation: "popIn 0.4s ease-out"
            }} 
            onClick={() => goTo("result")}
          >
            {gameOver === "won" ? "🎉 Finalizar nível ➡️" : "Ver Caderno de Respostas ➡️"}
          </button>
        ) : (
          <>
            <button className="btn" onClick={shuffleBoard} title="Reorganizar peças">
              🔀 Embaralhar
            </button>
            <button className="btn" onClick={clearSelection} disabled={selected.length === 0} title="Desmarcar todas">
              ✕ Limpar
            </button>
            <button className="btn btn--primary" disabled={selected.length !== 4} onClick={checkSelection}>
              Verificar
            </button>
          </>
        )}
      </div>
    </section>
  );
}