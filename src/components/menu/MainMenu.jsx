import { useGame } from "../../context/GameContext";
import MenuButton from "./MenuButton";

export default function MainMenu() {
  const { goTo, completedThemes } = useGame();
  
  // Apenas para mostrar no menu o progresso geral
  const hasProgress = completedThemes.length > 0;

  return (
    <section className="screen screen--active">
      <div className="hero">
        <h1>
          Jogo de <span>associação</span>
          <br />
          sobre DPOC
        </h1>
        <p>
          Uma ferramenta lúdica de educação em saúde para pacientes, familiares e estudantes da
          área da saúde compreenderem sinais, tratamento e cuidados da Doença Pulmonar Obstrutiva
          Crônica.
        </p>
        <div className="tag-row">
          <span className="tag">Educação em saúde</span>
          <span className="tag">Gamificação</span>
          <span className="tag">DPOC</span>
        </div>
      </div>

            <div className="menu-list">
        <MenuButton
          title="Jogar"
          subtitle={hasProgress ? `Continuar jornada (${completedThemes.length} concluídos)` : "Iniciar uma nova rodada"}
          primary
          onClick={() => goTo("difficulty")}
        />
        <MenuButton 
          title="Meu Perfil" 
          subtitle="Estatísticas e Conquistas" 
          onClick={() => goTo("profile")} 
        />
        <MenuButton 
          title="Biblioteca 📚" 
          subtitle="Coleção de conceitos desbloqueados" 
          onClick={() => goTo("library")} 
        />
        <MenuButton 
          title="Como jogar" 
          subtitle="Regras e mecânica" 
          onClick={() => goTo("howto")} 
        />
        <MenuButton
          title="Sobre o projeto"
          subtitle="RespConex e a proposta educativa"
          onClick={() => goTo("about")}
        />
      </div>

      <footer className="credit">RESPCONEX — PROTÓTIPO ACADÊMICO · UMC SUMMIT</footer>
    </section>
  );
}
