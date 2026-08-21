// Icones simples em SVG para dar identidade visual a cada bloco de
// conteudo (tema) do jogo. Cada tema em data/themes.js aponta para
// uma dessas chaves atraves do campo "icon".

const ICONS = {
  lungs:
    "M12 2c-.8 0-1.5.6-1.6 1.4L10 6.5C8.7 6.9 7.6 7.7 6.8 8.8 5.2 11 4 14.2 4 17c0 2.2 1.3 3.5 3 3.5 1.3 0 2.1-.9 2.6-2.1.4-1 .6-2.3.6-3.6V10c0-.6.4-1 1-1s1 .4 1 1v.2c0 .1.4.1.5 0V10c0-.6.4-1 1-1s1 .4 1 1v4.8c0 1.3.2 2.6.6 3.6.5 1.2 1.3 2.1 2.6 2.1 1.7 0 3-1.3 3-3.5 0-2.8-1.2-6-2.8-8.2-.8-1.1-1.9-1.9-3.2-2.3l-.4-3.1C13.5 2.6 12.8 2 12 2z",
  pill: "M4.5 14.5 14.5 4.5a5 5 0 1 1 7 7L11.5 21.5a5 5 0 1 1-7-7Zm5-1L14.5 18.5",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  wind: "M3 8h11a3 3 0 1 0-3-3M3 13h15a3 3 0 1 1-3 3M3 18h9a2.5 2.5 0 1 0-2.5-2.5",
  shield: "M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3Z",
  brain:
    "M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-2 2.8V12a3 3 0 0 0 2 2.8V16a3 3 0 0 0 3 3h1M15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 2 2.8V12a3 3 0 0 1-2 2.8V16a3 3 0 0 1-3 3h-1M9 3h6v16H9z",
  users:
    "M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3 2.7-5 6-5s6 2 6 5M10 20c0-3 2.7-5 6-5s6 2 6 5",
  book: "M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17ZM20 19H6.5A2.5 2.5 0 0 0 4 21.5",
  moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  activity: "M22 12L18 12L15 21L9 3L6 12L2 12",
  "alert-triangle":
    "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9L12 13M12 17L12.01 17",
};

export default function ThemeIcon({ name, size = 18 }) {
  const path = ICONS[name] ?? ICONS.lungs;
  return (
    <svg
      className="theme-icon"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
