import { useState, useEffect } from "react";
import { useGame } from "../../context/GameContext";
import MenuButton from "./MenuButton";
import AuthModal from "../profile/AuthModal"; // <-- Importando o Modal

export default function MainMenu() {
  const { goTo, completedThemes, activeProfile } = useGame();
  
  // Controle do pop-up obrigatório de login
  const [showForcedLogin, setShowForcedLogin] = useState(false);

  // Assim que o menu carregar ou o perfil mudar, verifica se é um jogador anônimo
  useEffect(() => {
    // Se o nome for o padrão e não houver um PIN configurado, força o login/criação
    if (activeProfile?.name === "Jogador 1" && !activeProfile?.pin) {
      setShowForcedLogin(true);
    } else {
      setShowForcedLogin(false);
    }
  }, [activeProfile]);

  // Apenas para mostrar no menu o progresso geral
  const hasProgress = completedThemes.length > 0;

  return (
    <section className="screen screen--active">
      
      {/* MODAL OBRIGATÓRIO: Trava a tela se for a primeira vez do usuário */}
      <AuthModal 
        isOpen={showForcedLogin} 
        onClose={() => setShowForcedLogin(false)}
        mandatory={true} 
      />

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
          onClick={() => goTo("themes")} 
        />
        <MenuButton 
          title="Meu Perfil" 
          subtitle="Estatísticas e Conquistas" 
          onClick={() => goTo("profile")} 
        />
        <MenuButton 
          title="Ranking Global 🏆" 
          subtitle="Placar dos melhores jogadores" 
          onClick={() => goTo("ranking")} 
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