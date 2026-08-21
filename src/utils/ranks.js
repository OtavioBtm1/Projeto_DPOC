// src/utils/ranks.js
export function getPlayerRank(score = 0) {
  if (score >= 350) {
    return { title: "Pneumologista Chefe 👨‍⚕️", color: "#38bdf8", badge: "🌟" };
  }
  if (score >= 200) {
    return { title: "Especialista Respiratório 🫁", color: "#34d399", badge: "⭐" };
  }
  if (score >= 100) {
    return { title: "Residente de Plantão 🩺", color: "#fbbf24", badge: "🔹" };
  }
  return { title: "Estudante de Medicina 📚", color: "#94a3b8", badge: "🌱" };
}