export default function MenuButton({ title, subtitle, onClick, primary = false }) {
  return (
    <button className={`menu-btn ${primary ? "menu-btn--primary" : ""}`} onClick={onClick}>
      <div>
        <div className="mb-title">{title}</div>
        <div className="mb-sub">{subtitle}</div>
      </div>
      <span className="chev">→</span>
    </button>
  );
}
