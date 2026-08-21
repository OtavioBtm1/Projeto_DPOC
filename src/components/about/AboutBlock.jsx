export default function AboutBlock({ title, children }) {
  return (
    <div className="about-block">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
