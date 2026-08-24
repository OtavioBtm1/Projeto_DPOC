import { useState } from "react";

export default function InstallGuideModal({ isOpen, onClose }) {
  const [os, setOs] = useState("android"); // Começa mostrando a dica para Android

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0, 0, 0, 0.85)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 3000, padding: "1rem"
    }}>
      <div style={{
        background: "#071920", border: "1px solid #38bdf8", borderRadius: "16px",
        padding: "1.5rem", maxWidth: "380px", width: "100%", textAlign: "center"
      }}>
        <h3 style={{ color: "#38bdf8", marginTop: 0, marginBottom: "0.5rem" }}>
          📲 Instalar no Celular
        </h3>
        <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: "1.4" }}>
          Adicione o RespConex à sua tela inicial para jogar em tela cheia e sem precisar de internet!
        </p>

        {/* Botões de Aba (Android / iOS) */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <button 
            onClick={() => setOs("android")}
            style={{
              flex: 1, padding: "0.6rem", borderRadius: "8px", fontWeight: "bold",
              background: os === "android" ? "#1e4d5f" : "#051318",
              color: os === "android" ? "#fff" : "#64748b",
              border: os === "android" ? "1px solid #38bdf8" : "1px solid #1e4d5f",
              cursor: "pointer", transition: "all 0.2s"
            }}
          >
            🤖 Android
          </button>
          <button 
            onClick={() => setOs("ios")}
            style={{
              flex: 1, padding: "0.6rem", borderRadius: "8px", fontWeight: "bold",
              background: os === "ios" ? "#1e4d5f" : "#051318",
              color: os === "ios" ? "#fff" : "#64748b",
              border: os === "ios" ? "1px solid #38bdf8" : "1px solid #1e4d5f",
              cursor: "pointer", transition: "all 0.2s"
            }}
          >
            🍎 iPhone (iOS)
          </button>
        </div>

        {/* Conteúdo dinâmico baseado na aba escolhida */}
        <div style={{ background: "#051318", border: "1px dashed #1e4d5f", padding: "1rem", borderRadius: "12px", textAlign: "left", marginBottom: "1.5rem" }}>
          {os === "android" ? (
            <ul style={{ color: "#cbd5e1", fontSize: "0.85rem", lineHeight: "1.6", margin: 0, paddingLeft: "1.2rem" }}>
              <li>Abra este site no navegador <strong>Google Chrome</strong>.</li>
              <li>Toque no ícone de <strong>Menu (⋮)</strong> no canto superior direito.</li>
              <li>Procure e toque na opção <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar aplicativo"</strong>.</li>
              <li>Confirme clicando em <strong>Adicionar</strong>.</li>
            </ul>
          ) : (
            <ul style={{ color: "#cbd5e1", fontSize: "0.85rem", lineHeight: "1.6", margin: 0, paddingLeft: "1.2rem" }}>
              <li>Abra este site no navegador <strong>Safari</strong>.</li>
              <li>Toque no botão de <strong>Compartilhar</strong> na barra inferior (um quadrado com uma seta para cima).</li>
              <li>Role a lista de opções para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.</li>
              <li>Confirme clicando em <strong>Adicionar</strong> no canto superior.</li>
            </ul>
          )}
        </div>

        <button 
          onClick={onClose} 
          className="btn btn--primary" 
          style={{ width: "100%", padding: "0.7rem", fontWeight: "bold" }}
        >
          Entendi
        </button>
      </div>
    </div>
  );
}