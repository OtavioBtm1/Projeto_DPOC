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

  // Salva os resultados assim que o jogo acaba (sem redirecionar a tela!)
  useEffect(() => {
    if (!gameOver) return undefined;

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

      <div className="game-board-container">
        {/* LISTA DE TEMAS (Resolvidos e Ocultos) */}
        <div className="solved-bands">
          {puzzle.groups.map((group, index) => {
            const isSolved = solvedGroups.includes(index);

            // SE TIVER RESOLVIDO: Mostra a faixa colorida original
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

            // SE NÃO TIVER RESOLVIDO: Mostra a caixa cinza tracejada
            return (
              <div 
                key={`group-${index}`}
                style={{
                  background: "rgba(15, 23, 42, 0.4)",
                  border: "1.5px dashed rgba(148, 163, 184, 0.3)",
                  borderRadius: "12px",
                  padding: "12px",
                  marginBottom: "8px",
                  textAlign: "center",
                  color: "#94a3b8",
                  fontWeight: "600",
                  fontSize: "0.95rem"
                }}
              >
                {group.name}
              </div>
            );
          })}
        </div>

        {/* Grid de peças restantes */}
        {!gameOver && remainingTiles.length > 0 && (
          <div className="grid">
            {remainingTiles.map(({ tile, originalIndex }) => (
              <Tile
                key={`${tile.term}-${originalIndex}`}
                term={tile.term}
                selected={selected.includes(originalIndex)}
                solved={false}
                shake={shakeIds.includes(originalIndex)}
                onClick={() => toggleTile(originalIndex)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mensagem de status (acertos/erros) */}
      <div className="status-msg" role="status" aria-live="polite" style={{ color: `var(--${status.tone})` }}>
        {gameOver === "won" ? "✨ Desafio concluído com sucesso!" : status.message || "\u00A0"}
      </div>

      {/* Botões de Ação na base - MUDANÇA PRINCIPAL DE UX AQUI */}
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
            {gameOver === "won" ? "🎉 Finalizar nivel ➡️" : "Ver Caderno de Respostas ➡️"}
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