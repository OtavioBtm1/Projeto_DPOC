export default function HowToStep({ number, children }) {
  return (
    <div className="howto-step">
      <div className="howto-num">{number}</div>
      <p>{children}</p>
    </div>
  );
}
