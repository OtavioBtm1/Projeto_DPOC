import { useGame } from "../../context/GameContext";

export default function TopBar() {
  const { goTo } = useGame();

  return (
    <div className="topbar">
      <div className="brand">
        RespConex <small>protótipo</small>
      </div>
      <button className="icon-btn" onClick={() => goTo("menu")} title="Menu principal">
        menu
      </button>
    </div>
  );
}
