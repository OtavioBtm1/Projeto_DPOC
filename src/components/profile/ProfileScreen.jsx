import { useGame } from "../../context/GameContext";
import { ACHIEVEMENTS } from "../../data/achievements";
import { THEMES } from "../../data/themes";
import AchievementBadge from "./AchievementBadge";
import LungIcon from "../shared/LungIcon";
import { useState } from "react";

export default function ProfileScreen() {
  const { goTo, stats, unlockedAchievements, completedThemes, playerName, setPlayerName } = useGame();
  const [isEditingName, setIsEditingName] = useState(!playerName);
  const [tempName, setTempName] = useState(playerName);
  const [isGenerating, setIsGenerating] = useState(false);

  const progressPct = Math.round((completedThemes.length / THEMES.length) * 100);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setPlayerName(tempName.trim());
      setIsEditingName(false);
    }
  };

  const handleExportImage = async () => {
    const element = document.getElementById("profile-export-card");
    if (!window.html2canvas || !element) return;

    setIsGenerating(true);
    
    // Pequeno timeout para garantir que o estado de "Gerando..." renderize
    setTimeout(async () => {
      try {
        const canvas = await window.html2canvas(element, {
          scale: 2, // Maior resolucao
          backgroundColor: "#0a1f26",
          useCORS: true,
          logging: false
        });
        
        canvas.toBlob(async (blob) => {
          const file = new File([blob], `RespConex_${playerName || "Perfil"}.png`, { type: "image/png" });
          
          // Tenta usar o compartilhamento nativo do celular (WhatsApp, Instagram, etc)
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                title: 'Meu Perfil no RespConex',
                text: 'Dá uma olhada no meu progresso no jogo RespConex!',
                files: [file]
              });
            } catch (e) {
              console.log("Compartilhamento cancelado ou falhou.");
              downloadFallback(blob);
            }
          } else {
            // Fallback: Baixa a imagem no PC/Navegadores nao suportados
            downloadFallback(blob);
          }
          setIsGenerating(false);
        }, "image/png");
      } catch (e) {
        console.error("Erro ao gerar imagem", e);
        setIsGenerating(false);
      }
    }, 100);
  };

  const downloadFallback = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RespConex_${playerName || "Perfil"}.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="screen screen--active">
      <div className="sub-header">
        <button className="back" onClick={() => goTo("menu")}>
          ← Menu Principal
        </button>
      </div>
      
      {/* ----- CRACHÁ / CARTÃO DE EXPORTAÇÃO ----- */}
      <div id="profile-export-card" className="export-card">
        <div className="export-card-header">
          <div className="export-logo">
            <LungIcon filled /> <span>RespConex</span>
          </div>
          <div className="export-badge">Certificado de Jogador</div>
        </div>

        <div className="export-user-info">
          {isEditingName ? (
            <div className="name-edit-box" data-html2canvas-ignore>
              <input 
                type="text" 
                placeholder="Digite seu nome..." 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)}
                maxLength={20}
              />
              <button onClick={handleSaveName}>Salvar</button>
            </div>
          ) : (
            <div className="name-display">
              <h2>{playerName}</h2>
              <button className="edit-name-btn" onClick={() => setIsEditingName(true)} data-html2canvas-ignore>
                ✏️ Editar
              </button>
            </div>
          )}
          <p className="export-user-title">
            {completedThemes.length >= 10 ? "Especialista em Saúde Respiratória" : "Estudante Aplicado"}
          </p>
        </div>

        <div className="export-stats-row">
          <div className="export-stat">
            <strong>{stats.gamesWon}</strong>
            <span>Vitórias</span>
          </div>
          <div className="export-stat">
            <strong>{progressPct}%</strong>
            <span>Temas</span>
          </div>
          <div className="export-stat">
            <strong>{unlockedAchievements.length}</strong>
            <span>Conquistas</span>
          </div>
        </div>

        <div className="export-achievements">
          {unlockedAchievements.length > 0 ? (
            unlockedAchievements.map(id => (
              <div key={id} className="export-ach-icon" title={ACHIEVEMENTS[id].title}>
                {ACHIEVEMENTS[id].icon}
              </div>
            ))
          ) : (
            <span className="export-ach-empty">Nenhuma conquista ainda... Jogue para desbloquear!</span>
          )}
        </div>
      </div>
      {/* --------------------------------------- */}

      <div className="profile-share-wrap">
        <button 
          className="btn btn--primary profile-share-btn" 
          onClick={handleExportImage}
          disabled={isGenerating || isEditingName}
        >
          {isGenerating ? "📸 Gerando Imagem..." : "📸 Salvar & Compartilhar Cartão"}
        </button>
        <p className="share-helper">Transforma seu perfil em uma foto para enviar aos amigos!</p>
      </div>

      <h3 className="section-heading" style={{ marginTop: 24, marginBottom: 12 }}>Conquistas</h3>
      <div className="achievements-list">
        {Object.values(ACHIEVEMENTS).map((ach) => (
          <AchievementBadge 
            key={ach.id} 
            achievement={ach} 
            isUnlocked={unlockedAchievements.includes(ach.id)} 
          />
        ))}
      </div>
    </section>
  );
}
