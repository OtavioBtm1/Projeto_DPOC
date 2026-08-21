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
    activeHint,
    gameOver,
    toggleTile,
    clearSelection,
    shuffleBoard,
    giveHint,
    checkSelection,
  } = usePuzzle(difficulty, chosenThemeId);

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

  useEffect(() => {
    return () => setHeartRate("normal");
  }, [setHeartRate]);

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

    const delay = gameOver === "won" ? 600 : 1000;
    const timeoutId = window.setTimeout(() => {
      goTo("result");
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [gameOver, puzzle, solvedGroups.length, hintsUsed, livesLeft, setLastResult, goTo]);

  if (!puzzle || !puzzle.groups) {
    return null;
  }

  return (
    <section className="screen screen--active">
      <div className="game-top">
        <LivesIndicator total={livesTotal} filled={livesLeft} />
        <div className="game-progress-badge">
          {solvedGroups.length} / {puzzle.groups.length} grupos
        </div>
        <div className="puzzle-title">{puzzle.title}</div>
      </div>

      {activeHint && (
        <div className="game-hint-box" role="alert">
          <span>💡</span>
          <div>{activeHint}</div>
        </div>
      )}

      <div className="solved-bands">
        {solvedGroups.map((groupIndex) => {
          const group = puzzle.groups[groupIndex];
          if (!group) return null;
          return (
            <SolvedBand
              key={groupIndex}
              name={group.name}
              color={group.color}
              items={group.items}
              didYouKnow={group.didYouKnow}
              initiallyOpen={true}
            />
          );
        })}
      </div>

      <div className="grid">
        {tiles.map((tile, index) => (
          <Tile
            key={`${tile.term}-${index}`}
            term={tile.term}
            selected={selected.includes(index)}
            solved={solvedGroups.includes(tile.groupIndex)}
            shake={shakeIds.includes(index)}
            onClick={() => toggleTile(index)}
          />
        ))}
      </div>

      <div className="status-msg" role="status" aria-live="polite" style={{ color: `var(--${status.tone})` }}>
        {status.message || "\u00A0"}
      </div>

      {gameOver && (
        <div className={`game-finish-overlay game-finish-overlay--${gameOver}`} aria-live="assertive">
          <div className="game-finish-card">
            <span>{gameOver === "won" ? "CONCLUÍDO COM SUCESSO!" : "FIM DE JOGO"}</span>
            <strong>{gameOver === "won" ? "Você desvendou todos os conceitos!" : "Suas tentativas acabaram."}</strong>
            <small>Abrindo o resumo educativo…</small>
          </div>
        </div>
      )}

      <div className="game-actions">
        <button className="btn" onClick={shuffleBoard} title="Reorganizar peças">
          🔀 Embaralhar
        </button>
        <button className="btn" onClick={clearSelection} disabled={selected.length === 0} title="Desmarcar todas">
          ✕ Limpar
        </button>
        <button className="btn btn--hint" onClick={giveHint} title="Obter uma dica conceitual">
          💡 Dica
        </button>
        <button className="btn btn--primary" disabled={selected.length !== 4} onClick={checkSelection}>
          Verificar
        </button>
      </div>
    </section>
  );
}