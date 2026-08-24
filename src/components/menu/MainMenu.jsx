import { useState, useEffect } from "react";
import { useGame } from "../../context/GameContext";
import MenuButton from "./MenuButton";
import AuthModal from "../profile/AuthModal";
import InstallGuideModal from "./InstallGuideModal";
import ChangelogModal from "./ChangeLogModal";

export default function MainMenu() {
  const { goTo, completedThemes, activeProfile } = useGame();

  // Controle dos modais
  const [showForcedLogin, setShowForcedLogin] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);

  // Estado para saber se já está instalado
  const [isInstalled, setIsInstalled] = useState(false);

  // Estado da sequência diária (Streak)
  const [streak, setStreak] = useState(1);

  // Gerenciamento do Streak Diário via LocalStorage
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastLogin = localStorage.getItem("respconex_last_date");
    const savedStreak = parseInt(localStorage.getItem("respconex_streak") || "1", 10);

    if (!lastLogin) {
      localStorage.setItem("respconex_last_date", today);
      localStorage.setItem("respconex_streak", "1");
      setStreak(1);
    } else if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (lastLogin === yesterdayStr) {
        const newStreak = savedStreak + 1;
        localStorage.setItem("respconex_streak", newStreak.toString());
        localStorage.setItem("respconex_last_date", today);
        setStreak(newStreak);
      } else {
        localStorage.setItem("respconex_streak", "1");
        localStorage.setItem("respconex_last_date", today);
        setStreak(1);
      }
    } else {
      setStreak(savedStreak);
    }
  }, []);

  // Verifica se o jogo já está rodando como App (Standalone)
  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    setIsInstalled(isStandalone);
  }, []);

  // Verifica se é um jogador anônimo para forçar cadastro
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

      {/* MODAL DE INSTALAÇÃO */}
      <InstallGuideModal
        isOpen={showInstallGuide}
        onClose={() => setShowInstallGuide(false)}
      />

      {/* MODAL DE NOTAS DE ATUALIZAÇÃO */}
      <ChangelogModal
        isOpen={showChangelog}
        onClose={() => setShowChangelog(false)}
      />

      {/* BARRA SUPERIOR: STREAK DIÁRIO + NOVIDADES */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.75rem",
        }}
      >
        <div
          title="Dias seguidos jogando RespConex"
          style={{
            background: "rgba(249, 115, 22, 0.12)",
            border: "1px solid rgba(249, 115, 22, 0.4)",
            color: "#fb923c",
            borderRadius: "20px",
            padding: "0.35rem 0.8rem",
            fontSize: "0.78rem",
            fontWeight: "700",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span>🔥</span> {streak} {streak === 1 ? "dia seguido" : "dias seguidos"}
        </div>

        <button
          onClick={() => setShowChangelog(true)}
          style={{
            background: "rgba(56, 189, 248, 0.12)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            color: "#38bdf8",
            borderRadius: "20px",
            padding: "0.35rem 0.8rem",
            fontSize: "0.78rem",
            fontWeight: "600",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ fontSize: "0.9rem" }}>✨</span> Novidades v2.0
        </button>
      </div>

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
          subtitle={
            hasProgress
              ? `Continuar jornada (${completedThemes.length} concluídos)`
              : "Iniciar uma nova rodada"
          }
          primary
          onClick={() => goTo("themes")}
        />

        {/* Só aparece se o aluno ainda não instalou o app */}
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