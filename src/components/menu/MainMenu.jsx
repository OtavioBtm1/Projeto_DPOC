import { useState, useEffect } from "react";
import { useGame } from "../../context/GameContext";
import MenuButton from "./MenuButton";
import AuthModal from "../profile/AuthModal";
import InstallGuideModal from "./InstallGuideModal";

export default function MainMenu() {
  const { goTo, completedThemes, activeProfile } = useGame();
  
  // Controle dos modais
  const [showForcedLogin, setShowForcedLogin] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  
  // Estado para saber se já está instalado (para esconder o botão)
  const [isInstalled, setIsInstalled] = useState(false);

  // Verifica se o jogo já está rodando como App (Standalone)
  useEffect(() => {
    // Checa se está em modo standalone (Android/Desktop) ou no Safari do iOS
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    setIsInstalled(isStandalone);
  }, []);

  // Assim que o menu carregar ou o perfil mudar, verifica se é um jogador anônimo
  useEffect(() => {
    if (activeProfile?.name === "Jogador 1" && !activeProfile?.pin) {
      setShowForcedLogin(true);
    } else {
      setShowForcedLogin(false);
    }
  }, [activeProfile]);

  const hasProgress = completedThemes.length > 0;

  return (
    <section className="screen screen--active">
      
      {/* MODAL OBRIGATÓRIO */}
      <AuthModal 
        isOpen={showForcedLogin} 
        onClose={() => setShowForcedLogin(false)}
        mandatory={true} 
      />

      {/* MODAL DE INSTALAÇÃO QUE CRIAMOS */}
      <InstallGuideModal 
        isOpen={showInstallGuide} 
        onClose={() => setShowInstallGuide(false)} 
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
        
        {/* O BOTÃO MÁGICO: Só aparece se o aluno ainda não instalou o app! */}
        {!isInstalled && (
          <MenuButton 
            title="📲 Instalar App" 
            subtitle="Jogue sem internet direto da tela inicial" 
            onClick={() => setShowInstallGuide(true)} 
          />
        )}

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