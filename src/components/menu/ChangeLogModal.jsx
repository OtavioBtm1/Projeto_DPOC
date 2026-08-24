export default function ChangelogModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3500,
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#071920",
          border: "1px solid #38bdf8",
          borderRadius: "16px",
          padding: "1.5rem",
          maxWidth: "420px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ color: "#38bdf8", margin: 0, fontSize: "1.2rem" }}>
            📢 Notas da Atualização v2.0
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              fontSize: "1.4rem",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: 0, marginBottom: "1rem" }}>
          Confira as novidades da <strong>Temporada 2</strong> do RespConex:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", color: "#cbd5e1" }}>
          <div style={{ background: "#051318", border: "1px solid #1e4d5f", borderRadius: "10px", padding: "0.8rem" }}>
            <strong style={{ color: "#38bdf8", display: "block", marginBottom: "0.2rem" }}>
              🌍 Módulo El Niño & Mudanças Climáticas
            </strong>
            Fases dedicadas ao impacto das ondas de calor, inversão térmica e poluição em pacientes com DPOC.
          </div>

          <div style={{ background: "#051318", border: "1px solid #1e4d5f", borderRadius: "10px", padding: "0.8rem" }}>
            <strong style={{ color: "#34d399", display: "block", marginBottom: "0.2rem" }}>
              🔄 Perguntas e Temas Renovados
            </strong>
            Novo repertório clínico incluindo nutrição, higiene do sono, reabilitação pulmonar e cuidados paliativos.
          </div>

          <div style={{ background: "#051318", border: "1px solid #1e4d5f", borderRadius: "10px", padding: "0.8rem" }}>
            <strong style={{ color: "#fbbf24", display: "block", marginBottom: "0.2rem" }}>
              📚 Biblioteca Científica Especial
            </strong>
            Artigo temático fixado no topo com orientações de prevenção e alertas em saúde.
          </div>

          <div style={{ background: "#051318", border: "1px solid #1e4d5f", borderRadius: "10px", padding: "0.8rem" }}>
            <strong style={{ color: "#f87171", display: "block", marginBottom: "0.2rem" }}>
              🏆 Nova Conquista Disponível
            </strong>
            Desbloqueie a medalha <em>Guardião do Clima</em> ao acessar os novos conteúdos.
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn btn--primary"
          style={{ width: "100%", padding: "0.7rem", fontWeight: "bold", marginTop: "1.2rem" }}
        >
          Entendido
        </button>
      </div>
    </div>
  );
}