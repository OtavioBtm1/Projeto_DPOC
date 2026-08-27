import { useGame } from "../../context/GameContext";

// 1. Adicionamos o "children" na função para ele receber o botão do App.jsx
export default function TopBar({ children }) {
  const { goTo } = useGame();

  return (
    <div 
      className="topbar"
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        justifyContent: "space-between", // Mantém a logo na esquerda e os botões na direita
        alignItems: "center"
      }}
    >
      <div className="brand">
        RespConex <small>protótipo</small>
      </div>
      
      {/* 2. Container mágico que alinha tudo lado a lado */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        
        {/* O botão de som vai ser injetado exatamente aqui! */}
        {children} 

        <button className="icon-btn" onClick={() => goTo("menu")} title="Menu principal">
          menu
        </button>
      </div>
    </div>
  );
}