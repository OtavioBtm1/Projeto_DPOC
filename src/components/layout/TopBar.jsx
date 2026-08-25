import { useGame } from "../../context/GameContext";

export default function TopBar() {
  const { goTo } = useGame();

  return (
    <div 
      className="topbar"
      style={{
        // MÁGICA AQUI: Adiciona o tamanho exato da Ilha Dinâmica/Notch como margem interna superior
        paddingTop: "calc(12px + env(safe-area-inset-top))",
        // Evita que os itens fiquem espremidos no topo
        minHeight: "calc(60px + env(safe-area-inset-top))"
      }}
    >
      <div className="brand">
        RespConex <small>protótipo</small>
      </div>
      <button className="icon-btn" onClick={() => goTo("menu")} title="Menu principal">
        menu
      </button>
    </div>
  );
}