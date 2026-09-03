import { useEffect, useState } from "react";
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

  // ✨ NOVO ESTADO: Controla qual dica estamos visualizando
  const [hintOffset, setHintOffset] = useState(0);

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

  // ✨ NOVA LÓGICA: Reseta a dica atual quando o jogador acerta um grupo
  useEffect(() => {
    setHintOffset(0);
  }, [solvedGroups.length]);

  // Salva os resultados assim que o jogo acaba
  useEffect(() => {
    if (!gameOver) return undefined;

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

  const remainingTiles = tiles
    .map((tile, originalIndex) => ({ tile, originalIndex }))
    .filter(({ tile }) => !solvedGroups.includes(tile.groupIndex));

  const nextTutorialGroupIndex = puzzle.groups.findIndex((_, index) => !solvedGroups.includes(index));

  // ✨ NOVA LÓGICA: Calcula quais dicas ainda não foram resolvidas
  const unsolvedIndices = puzzle.groups
    .map((_, index) => index)
    .filter((index) => !solvedGroups.includes(index));

  // Pega o índice real do grupo da dica que vamos mostrar
  const activeHintGroupIndex = unsolvedIndices.length > 0 
    ? unsolvedIndices[hintOffset % unsolvedIndices.length] 
    : null;

  // Função para girar a dica no botão 🔄
  const handleNextHint = () => {
    setHintOffset((prev) => prev + 1);
  };

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

      {/* Container flexível do tabuleiro */}
      <div className="game-board-container">
        
        {/* LISTA DE TEMAS E DICA ÚNICA - Com margem para descer o tabuleiro */}
        <div className="solved-bands" style={{ marginBottom: "36px", width: "100%" }}>
          
          {/* 1. Renderiza APENAS os grupos já resolvidos */}
          {puzzle.groups.map((group, index) => {
            if (solvedGroups.includes(index)) {
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
            return null;
          })}

          {/* 2. Renderiza APENAS UMA dica para os grupos restantes */}
          {activeHintGroupIndex !== null && (
            <div 
              key={`hint-${activeHintGroupIndex}`} // Ajuda o React a animar quando muda
              style={{
                background: "rgba(15, 23, 42, 0.4)",
                border: "1.5px dashed rgba(148, 163, 184, 0.3)",
                borderRadius: "12px",
                padding: "16px 12px",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // Afasta a dica do botão
                gap: "8px",
                color: "#94a3b8",
                fontWeight: "600",
                fontSize: "0.95rem",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                <span style={{ fontSize: "1.3rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>🔍</span>
                <span>{puzzle.groups[activeHintGroupIndex].hint || "Desvende o mistério..."}</span>
              </div>

              {/* Só mostra o botão se tiver mais de 1 dica para resolver */}
              {unsolvedIndices.length > 1 && (
                <button
                  onClick={handleNextHint}
                  title="Trocar dica"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    width: "42px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    flexShrink: 0,
                  }}
                >
                  🔄
                </button>
              )}
            </div>
          )}
        </div>

        {/* Grid de peças restantes */}
        {!gameOver && remainingTiles.length > 0 && (
          <>
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
                  isTutorial={puzzle.id === "tutorial-1" && tile.groupIndex === nextTutorialGroupIndex}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="status-msg" role="status" aria-live="polite" style={{ color: `var(--${status.tone})` }}>
        {gameOver === "won" ? "✨ Desafio concluído com sucesso!" : status.message || "\u00A0"}
      </div>

      <div className="game-actions">
        {gameOver ? (
          <button 
            className="btn btn--primary" 
            style={{ width: "100%", padding: "16px", fontSize: "1.1rem" }} 
            onClick={() => goTo("result")}
          >
            {gameOver === "won" ? "🎉 Finalizar nível ➡️" : "Ver Caderno de Respostas ➡️"}
          </button>
        ) : (
          <>
            <button className="btn" onClick={shuffleBoard}>🔀 Embaralhar</button>
            <button className="btn" onClick={clearSelection} disabled={selected.length === 0}>✕ Limpar</button>
            <button className="btn btn--primary" disabled={selected.length !== 4} onClick={checkSelection}>
              Verificar
            </button>
          </>
        )}
      </div>
    </section>
  );
}