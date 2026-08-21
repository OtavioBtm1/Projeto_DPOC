// Configuracao das dificuldades do jogo.
// facil: sem sistema de vidas (tentativas ilimitadas)
// medio: 4 vidas
// dificil: 3 vidas

export const DIFFICULTIES = {
  facil: { id: "facil", label: "Facil", sublabel: "sem vidas", lives: null },
  medio: { id: "medio", label: "Medio", sublabel: "4 vidas", lives: 4 },
  dificil: { id: "dificil", label: "Dificil", sublabel: "3 vidas", lives: 3 },
};
