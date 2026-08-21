import { useGame } from "../../context/GameContext";
import HowToStep from "./HowToStep";

export default function HowToScreen() {
  const { goTo } = useGame();

  return (
    <section className="screen screen--active">
      <div className="sub-header">
        <button className="back" onClick={() => goTo("menu")}>
          ← voltar
        </button>
      </div>
      <h2 className="screen-title" style={{ marginBottom: 18 }}>
        Como jogar
      </h2>

      <HowToStep number={1}>
        O tabuleiro tem <b>16 termos</b> relacionados à DPOC, organizados em <b>4 grupos ocultos</b>{" "}
        de 4 itens cada (ex: sintomas, fármacos, exames, cuidados de enfermagem).
      </HowToStep>
      <HowToStep number={2}>
        Toque em <b>4 termos</b> que você acredita pertencerem ao mesmo grupo e toque em{" "}
        <b>Verificar</b>.
      </HowToStep>
      <HowToStep number={3}>
        Se estiver certo, o grupo é revelado com uma cor e um nome. Se estiver errado, os termos
        voltam e — dependendo da dificuldade — <b>uma vida é perdida</b>.
      </HowToStep>
      <HowToStep number={4}>
        No modo <b>Fácil</b> não há limite de tentativas. Nos modos <b>Médio (4 vidas)</b> e{" "}
        <b>Difícil (3 vidas)</b>, o jogo termina se as vidas acabarem antes de formar os 4 grupos.
      </HowToStep>
      <HowToStep number={5}>
        Encontre os 4 grupos para vencer a rodada e revisar o conteúdo completo sobre DPOC.
      </HowToStep>
    </section>
  );
}
