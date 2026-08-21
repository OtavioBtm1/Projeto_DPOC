import { useGame } from "../../context/GameContext";
import AboutBlock from "./AboutBlock";

export default function AboutScreen() {
  const { goTo } = useGame();

  return (
    <section className="screen screen--active">
      <div className="sub-header">
        <button className="back" onClick={() => goTo("menu")}>
          ← voltar
        </button>
      </div>
      <h2 className="screen-title" style={{ marginBottom: 18 }}>
        Sobre o RespConex
      </h2>

      <AboutBlock title="Proposta">
        O RespConex é um jogo educativo baseado em associação de termos, voltado à educação em
        saúde sobre a Doença Pulmonar Obstrutiva Crônica (DPOC), direcionado a pacientes,
        familiares/cuidadores e estudantes da área da saúde.
      </AboutBlock>
      <AboutBlock title="Por que agora">
        Eventos climáticos como o El Niño, o aumento da poluição do ar e temperaturas extremas têm
        sido associados ao agravamento de casos respiratórios crônicos, o que reforça a urgência
        de estratégias acessíveis de prevenção e reconhecimento de sinais de alerta.
      </AboutBlock>
      <AboutBlock title="Origem">
        Projeto desenvolvido a partir de um seminário da disciplina de doença crônica em adulto,
        com foco em sistema respiratório, para submissão ao UMC Summit.
      </AboutBlock>
    </section>
  );
}
