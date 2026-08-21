import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame precisa ser usado dentro de um <GameProvider>");
  }
  return ctx;
}