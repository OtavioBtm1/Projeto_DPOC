import { useEffect, useState } from "react";
import { useGame } from "../../context/GameContext";
import { supabase } from "../../utils/supabase";

export default function RankingScreen() {
  const { goTo, activeProfile } = useGame();
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      setIsLoading(true);
      setErrorMsg(null);

      try {
        const { data, error } = await supabase
          .from("leaderboard")
          .select("*")
          .order("themes_count", { ascending: false })
          .order("games_won", { ascending: false })
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

  return (
    <section className="screen screen--active">
      <div className="sub-header">
        <button className="back" onClick={() => goTo("menu")}>
          ← Menu Principal
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ color: "#38bdf8", margin: 0, fontSize: "1.5rem" }}>🏆 Placar Global</h2>
        <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.3rem" }}>
          Os maiores especialistas em saúde respiratória
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
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {leaders.map((player, index) => {
            const isCurrent = player.id === activeProfile?.id;
            return (
              <div
                key={player.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: isCurrent ? "#0c3b4a" : "#051318",
                  border: isCurrent ? "1px solid #38bdf8" : "1px solid #1e4d5f",
                  borderRadius: "10px",
                  padding: "0.6rem 1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span
                    style={{
                      width: "28px",
                      fontWeight: "bold",
                      fontSize: index < 3 ? "1.2rem" : "0.9rem",
                      color: index === 0 ? "#fbbf24" : index === 1 ? "#cbd5e1" : index === 2 ? "#d97706" : "#64748b",
                    }}
                  >
                    {getRankBadge(index)}
                  </span>
                  {renderAvatar(player.avatar, 34)}
                  <div>
                    <strong style={{ color: "#fff", display: "block", fontSize: "0.95rem" }}>
                      {player.player_name} {isCurrent && <span style={{ color: "#38bdf8", fontSize: "0.75rem" }}>(Você)</span>}
                    </strong>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      {player.games_won || 0} vitórias
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{ color: "#38bdf8", fontWeight: "bold", fontSize: "1.1rem" }}>
                    {player.themes_count || 0}
                  </span>
                  <span style={{ display: "block", fontSize: "0.7rem", color: "#94a3b8" }}>
                    temas
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}