import { useEffect, useState } from "react";
import { useGame } from "../../context/GameContext";
import { supabase } from "../../utils/supabase";
import { getPlayerRank } from "../../utils/ranks";

export default function RankingScreen() {
  const { goTo, activeProfile } = useGame();
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // Estados para o Modal de Ajuda (?) e Detalhes do Jogador Clicado
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      setIsLoading(true);
      setErrorMsg(null);

      try {
        const { data, error } = await supabase
          .from("leaderboard")
          .select("*")
          .order("score", { ascending: false })
          .order("themes_count", { ascending: false })
          .limit(20);

        if (error) throw error;
        setLeaders(data || []);
      } catch (err) {
        console.error("Erro ao carregar ranking:", err);
        setErrorMsg("Não foi possível carregar o ranking global.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  const renderAvatar = (avatar, size = 32) => {
    if (avatar?.startsWith("data:image")) {
      return (
        <img
          src={avatar}
          alt="Avatar"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid #38bdf8",
          }}
        />
      );
    }
    return <span style={{ fontSize: `${size * 0.7}px` }}>{avatar || "🫁"}</span>;
  };

  const getRankBadge = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  // Efeitos visuais do Pódio (Top 3)
  const getPodiumStyle = (index, isCurrent) => {
    if (index === 0) {
      return {
        background: "linear-gradient(135deg, rgba(251, 191, 36, 0.25) 0%, #051318 80%)",
        border: "2px solid #fbbf24",
        boxShadow: "0 0 15px rgba(251, 191, 36, 0.3)",
      };
    }
    if (index === 1) {
      return {
        background: "linear-gradient(135deg, rgba(203, 213, 225, 0.2) 0%, #051318 80%)",
        border: "2px solid #cbd5e1",
        boxShadow: "0 0 10px rgba(203, 213, 225, 0.2)",
      };
    }
    if (index === 2) {
      return {
        background: "linear-gradient(135deg, rgba(217, 119, 6, 0.2) 0%, #051318 80%)",
        border: "2px solid #d97706",
        boxShadow: "0 0 10px rgba(217, 119, 6, 0.2)",
      };
    }
    return {
      background: isCurrent ? "#0c3b4a" : "#051318",
      border: isCurrent ? "1px solid #38bdf8" : "1px solid #1e4d5f",
    };
  };

  return (
    <section className="screen screen--active" style={{ position: "relative" }}>
      <div className="sub-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button className="back" onClick={() => goTo("menu")}>
          ← Menu Principal
        </button>

        {/* Botão de Ajuda (?) */}
        <button
          onClick={() => setShowHelpModal(true)}
          style={{
            background: "#0c3b4a",
            color: "#38bdf8",
            border: "1px solid #38bdf8",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
          }}
          title="Como funciona o ranking?"
        >
          ?
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ color: "#38bdf8", margin: 0, fontSize: "1.5rem" }}>🏆 Placar Global</h2>
        <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.3rem" }}>
          Toque em qualquer jogador para ver o perfil completo
        </p>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
          Carregando placar...
        </div>
      ) : errorMsg ? (
        <div style={{ textAlign: "center", color: "#f87171", padding: "1.5rem" }}>
          {errorMsg}
        </div>
      ) : leaders.length === 0 ? (
        <div style={{ textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
          Nenhum registro encontrado ainda. Seja o primeiro a pontuar!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {leaders.map((player, index) => {
            const isCurrent = player.id === activeProfile?.id;
            const playerRank = getPlayerRank(player.score || 0);
            const podiumStyle = getPodiumStyle(index, isCurrent);

            return (
              <div
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: "10px",
                  padding: "0.6rem 1rem",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  ...podiumStyle,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span
                    style={{
                      width: "28px",
                      fontWeight: "bold",
                      fontSize: index < 3 ? "1.3rem" : "0.9rem",
                      color: index === 0 ? "#fbbf24" : index === 1 ? "#cbd5e1" : index === 2 ? "#d97706" : "#64748b",
                      textAlign: "center",
                    }}
                  >
                    {getRankBadge(index)}
                  </span>
                  {renderAvatar(player.avatar, 34)}
                  <div>
                    <strong style={{ color: "#fff", display: "block", fontSize: "0.95rem" }}>
                      {player.player_name} {isCurrent && <span style={{ color: "#38bdf8", fontSize: "0.75rem" }}>(Você)</span>}
                    </strong>
                    <span style={{ fontSize: "0.75rem", color: playerRank.color, fontWeight: "bold" }}>
                      {playerRank.badge} {playerRank.title}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{ color: "#38bdf8", fontWeight: "bold", fontSize: "1.1rem" }}>
                    {player.score || 0}
                  </span>
                  <span style={{ display: "block", fontSize: "0.7rem", color: "#94a3b8" }}>
                    pontos
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================
          MODAL DE AJUDA (?)
          ========================================= */}
      {showHelpModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0, 0, 0, 0.8)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000, padding: "1rem"
        }}>
          <div style={{
            background: "#071920", border: "1px solid #38bdf8", borderRadius: "16px",
            padding: "1.5rem", maxWidth: "400px", width: "100%"
          }}>
            <h3 style={{ color: "#38bdf8", marginTop: 0, marginBottom: "1rem", textAlign: "center" }}>
              📖 Como funciona o Ranking?
            </h3>
            <p style={{ color: "#cbd5e1", fontSize: "0.85rem", lineHeight: "1.4", marginBottom: "1rem" }}>
              O placar global premia a dificuldade e o desempenho nas partidas:
            </p>
            <ul style={{ color: "#94a3b8", fontSize: "0.85rem", paddingLeft: "1.2rem", lineHeight: "1.5", marginBottom: "1.5rem" }}>
              <li><strong style={{ color: "#fff" }}>Fácil:</strong> +10 pontos</li>
              <li><strong style={{ color: "#fff" }}>Médio:</strong> +25 pontos</li>
              <li><strong style={{ color: "#fff" }}>Difícil:</strong> +50 pontos</li>
              <li><strong style={{ color: "#fbbf24" }}>Bônus Flawless:</strong> +15 pontos (vida cheia)</li>
            </ul>
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setShowHelpModal(false)}
                className="btn btn--primary"
                style={{ width: "100%", padding: "0.6rem", fontWeight: "bold" }}
              >
                Entendi!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          MODAL DE DETALHES DO JOGADOR CLICADO
          ========================================= */}
      {selectedPlayer && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0, 0, 0, 0.8)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000, padding: "1rem"
        }}>
          <div style={{
            background: "#071920", border: "1px solid #38bdf8", borderRadius: "16px",
            padding: "1.5rem", maxWidth: "380px", width: "100%", textAlign: "center"
          }}>
            <div style={{ margin: "0.5rem 0" }}>
              {renderAvatar(selectedPlayer.avatar, 64)}
            </div>
            <h3 style={{ color: "#fff", margin: "0.5rem 0 0.2rem", fontSize: "1.3rem" }}>
              {selectedPlayer.player_name}
            </h3>
            <span style={{ color: getPlayerRank(selectedPlayer.score || 0).color, fontSize: "0.85rem", fontWeight: "bold" }}>
              {getPlayerRank(selectedPlayer.score || 0).badge} {getPlayerRank(selectedPlayer.score || 0).title}
            </span>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", margin: "1.2rem 0" }}>
              <div style={{ background: "#051318", border: "1px solid #1e4d5f", borderRadius: "10px", padding: "0.8rem" }}>
                <span style={{ color: "#94a3b8", fontSize: "0.75rem", display: "block" }}>Pontuação</span>
                <strong style={{ color: "#38bdf8", fontSize: "1.3rem" }}>{selectedPlayer.score || 0}</strong>
              </div>
              <div style={{ background: "#051318", border: "1px solid #1e4d5f", borderRadius: "10px", padding: "0.8rem" }}>
                <span style={{ color: "#94a3b8", fontSize: "0.75rem", display: "block" }}>Vitórias</span>
                <strong style={{ color: "#34d399", fontSize: "1.3rem" }}>{selectedPlayer.games_won || 0}</strong>
              </div>
            </div>

            <button
              onClick={() => setSelectedPlayer(null)}
              className="btn btn--primary"
              style={{ width: "100%", padding: "0.6rem", fontWeight: "bold" }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}