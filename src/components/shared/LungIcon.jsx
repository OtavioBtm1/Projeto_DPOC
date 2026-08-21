// Icone de pulmao em SVG, usado para representar "vidas" no jogo
// (em vez do coracao generico), reforcando a identidade respiratoria
// do projeto.

const LUNG_PATH =
  "M12 2c-.8 0-1.5.6-1.6 1.4L10 6.5C8.7 6.9 7.6 7.7 6.8 8.8 5.2 11 4 14.2 4 17c0 2.2 1.3 3.5 3 3.5 1.3 0 2.1-.9 2.6-2.1.4-1 .6-2.3.6-3.6V10c0-.6.4-1 1-1s1 .4 1 1v.2c0 .1.4.1.5 0V10c0-.6.4-1 1-1s1 .4 1 1v4.8c0 1.3.2 2.6.6 3.6.5 1.2 1.3 2.1 2.6 2.1 1.7 0 3-1.3 3-3.5 0-2.8-1.2-6-2.8-8.2-.8-1.1-1.9-1.9-3.2-2.3l-.4-3.1C13.5 2.6 12.8 2 12 2z";

export default function LungIcon({ filled = true }) {
  return (
    <svg
      className={`lung-icon ${filled ? "lung-icon--on" : "lung-icon--off"}`}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d={LUNG_PATH} />
    </svg>
  );
}
