import { useGame } from "../../context/GameContext";
import { ACHIEVEMENTS } from "../../data/achievements";
import { THEMES } from "../../data/themes";
import AchievementBadge from "./AchievementBadge";
import LungIcon from "../shared/LungIcon";
import { useState, useEffect } from "react";
import { getPlayerRank } from "../../utils/ranks";
import { supabase } from "../../utils/supabase";

const AVATAR_PRESETS = ["🫁", "🩺", "🧑‍⚕️", "🫀", "🔬", "🌟"];

// Comprime a imagem recortando no centro para 120x120px em JPEG leve
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      return reject(new Error("O arquivo selecionado não é uma imagem válida."));
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const size = 120;
        canvas.width = size;
        canvas.height = size;
        
        const minEdge = Math.min(img.width, img.height);
        const startX = (img.width - minEdge) / 2;
        const startY = (img.height - minEdge) / 2;
        
        ctx.drawImage(img, startX, startY, minEdge, minEdge, 0, 0, size, size);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function ProfileScreen() {
  const {
    goTo, stats, unlockedAchievements, completedThemes,
    playerName, setPlayerName, setPlayerAvatar,
    profiles, activeProfile, switchProfile, createProfile, deleteProfile
  } = useGame();

  // Estados de UI
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(!playerName);
  
  // Estados de Formulário
  const [tempName, setTempName] = useState(playerName);
  const [newProfileName, setNewProfileName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🫁");

  // Estados de Ranking Global
  const [globalRank, setGlobalRank] = useState(null);
  const [loadingRank, setLoadingRank] = useState(true);

  const currentRank = getPlayerRank(stats?.score || 0);

  useEffect(() => {
    setTempName(playerName);
  }, [playerName]);

  // Busca a posição do jogador no ranking global do Supabase
  useEffect(() => {
    async function fetchPlayerPosition() {
      if (!activeProfile?.id || !supabase) {
        setLoadingRank(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("leaderboard")
          .select("id, score")
          .order("score", { ascending: false });

        if (error) throw error;

        if (data) {
          const index = data.findIndex((p) => p.id === activeProfile.id);
          if (index !== -1) {
            setGlobalRank(index + 1);
          } else {
            setGlobalRank("Unranked");
          }
        }
      } catch (err) {
        console.error("Erro ao buscar posição no ranking:", err);
        setGlobalRank("-");
      } finally {
        setLoadingRank(false);
      }
    }

    fetchPlayerPosition();
  }, [activeProfile?.id, stats?.score]);

  const progressPct = Math.round((completedThemes.length / THEMES.length) * 100);

  // Ações do Usuário
  const handleSaveName = () => {
    if (tempName.trim()) {
      setPlayerName(tempName.trim());
      setIsEditingProfile(false);
    }
  };

  const handleCreateNewProfile = (e) => {
    e.preventDefault();
    if (newProfileName.trim()) {
      createProfile(newProfileName.trim(), selectedAvatar);
      setNewProfileName("");
      setSelectedAvatar("🫁");
      setIsCreatingProfile(false);
    }
  };

  const handleFileUpload = async (e, isCreating = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await compressImage(file);
      if (isCreating) {
        setSelectedAvatar(base64);
      } else {
        setPlayerAvatar(base64);
      }
    } catch (err) {
      console.error("Erro ao comprimir imagem:", err);
      alert("Não foi possível carregar a imagem. Tente outra foto.");
    }
  };

  // Exportação da Imagem
  const handleExportImage = async () => {
    const element = document.getElementById("profile-export-card");
    if (!window.html2canvas || !element) return;

    setIsGenerating(true);
    setTimeout(async () => {
      try {
        const canvas = await window.html2canvas(element, {
          scale: 2, backgroundColor: "#0a1f26", useCORS: true, logging: false
        });
        canvas.toBlob(async (blob) => {
          const file = new File([blob], `RespConex_${playerName || "Perfil"}.png`, { type: "image/png" });
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                title: "Meu Perfil no RespConex",
                text: "Dá uma olhada no meu progresso no jogo RespConex!",
                files: [file]
              });
            } catch { downloadFallback(blob); }
          } else {
            downloadFallback(blob);
          }
          setIsGenerating(false);
        }, "image/png");
      } catch (e) {
        console.error("Erro ao gerar imagem", e);
        setIsGenerating(false);
      }
    }, 150);
  };

  const downloadFallback = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RespConex_${playerName || "Perfil"}.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Renderizador Visual do Avatar
  const renderAvatarGraphic = (avatarSource, size = 70) => {
    if (avatarSource?.startsWith("data:image")) {
      return (
        <img
          src={avatarSource}
          alt="Avatar do jogador"
          style={{
            width: `${size}px`, height: `${size}px`, borderRadius: "50%",
            objectFit: "cover", border: "2px solid #38bdf8", display: "inline-block"
          }}
        />
      );
    }
    return <span style={{ fontSize: `${size * 0.55}px` }}>{avatarSource || "🫁"}</span>;
  };

  return (
    <section className="screen screen--active">
      <div className="sub-header">
        <button className="back" onClick={() => goTo("menu")}>
          ← Menu Principal
        </button>
      </div>

      {/* =========================================
          PAINEL DE CONTROLE DE PERFIL (Fora do Cartão)
          ========================================= */}
      <div className="profile-controls" style={{ background: "#0b232c", padding: "1rem", borderRadius: "12px", border: "1px solid #1e4d5f", marginBottom: "1.5rem" }}>
        
        {/* Barra Superior: Trocar, Editar ou Criar */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", marginBottom: (isCreatingProfile || isEditingProfile) ? "1rem" : "0" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <select 
              value={activeProfile?.id} 
              onChange={(e) => switchProfile(e.target.value)}
              style={{ padding: "0.4rem 0.8rem", borderRadius: "8px", background: "#051318", color: "#fff", border: "1px solid #1e4d5f", fontSize: "0.9rem" }}
            >
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.avatar?.startsWith("data:image") ? "📷" : p.avatar} {p.name}
                </option>
              ))}
            </select>
            
            <button 
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              style={{ padding: "0.4rem", background: "#1a404f", border: "none", borderRadius: "8px", color: "#38bdf8", cursor: "pointer" }}
              title="Editar Perfil Atual"
            >
              ✏️
            </button>

            {profiles.length > 1 && (
              <button 
                onClick={() => deleteProfile(activeProfile.id)}
                style={{ padding: "0.4rem", background: "#3b1a1a", border: "1px solid #772b2b", color: "#ff8b8b", borderRadius: "8px", cursor: "pointer" }}
                title="Excluir perfil ativo"
              >
                🗑️
              </button>
            )}
          </div>

          <button 
            className="btn"
            style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem", background: "#1a404f" }}
            onClick={() => { setIsCreatingProfile(!isCreatingProfile); setIsEditingProfile(false); }}
          >
            {isCreatingProfile ? "Cancelar Criação" : "+ Novo Perfil"}
          </button>
        </div>

        {/* Modal Embutido: Edição do Perfil Ativo */}
        {isEditingProfile && !isCreatingProfile && (
          <div style={{ paddingTop: "1rem", borderTop: "1px dashed #1e4d5f" }}>
            <p style={{ fontSize: "0.8rem", color: "#38bdf8", marginBottom: "0.5rem" }}>Alterar dados do perfil:</p>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.8rem" }}>
              <input 
                type="text" 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)} 
                maxLength={20}
                style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", background: "#051318", border: "1px solid #1e4d5f", color: "#fff" }}
              />
              <button onClick={handleSaveName} className="btn btn--primary" style={{ padding: "0 1rem" }}>Salvar</button>
            </div>
            
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
              {AVATAR_PRESETS.map((emoji) => (
                <button
                  key={emoji} type="button" onClick={() => setPlayerAvatar(emoji)}
                  style={{ background: activeProfile?.avatar === emoji ? "#1e4d5f" : "transparent", border: "none", borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem", padding: "4px" }}
                >
                  {emoji}
                </button>
              ))}
              <label style={{ cursor: "pointer", fontSize: "0.75rem", color: "#38bdf8", textDecoration: "underline", marginLeft: "0.5rem" }}>
                📷 Foto da galeria
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileUpload(e, false)} />
              </label>
            </div>
          </div>
        )}

        {/* Modal Embutido: Criação de Novo Perfil */}
        {isCreatingProfile && (
          <form onSubmit={handleCreateNewProfile} style={{ paddingTop: "1rem", borderTop: "1px dashed #1e4d5f" }}>
            <input 
              type="text" placeholder="Nome do novo jogador..." 
              value={newProfileName} onChange={(e) => setNewProfileName(e.target.value)} maxLength={20}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", background: "#051318", border: "1px solid #1e4d5f", color: "#fff", marginBottom: "0.8rem" }}
            />
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.8rem", alignItems: "center", flexWrap: "wrap" }}>
              {AVATAR_PRESETS.map((emoji) => (
                <button
                  key={emoji} type="button" onClick={() => setSelectedAvatar(emoji)}
                  style={{ fontSize: "1.2rem", padding: "0.4rem", borderRadius: "8px", background: selectedAvatar === emoji ? "#1e4d5f" : "#051318", border: selectedAvatar === emoji ? "2px solid #38bdf8" : "1px solid #1e4d5f", cursor: "pointer" }}
                >
                  {emoji}
                </button>
              ))}
              <label style={{ cursor: "pointer", fontSize: "0.8rem", color: "#38bdf8", border: "1px dashed #1e4d5f", padding: "0.4rem 0.6rem", borderRadius: "8px" }}>
                📷 Usar Foto
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileUpload(e, true)} />
              </label>
            </div>
            <button type="submit" className="btn btn--primary" style={{ width: "100%", padding: "0.5rem" }}>Criar Perfil</button>
          </form>
        )}
      </div>

      {/* =========================================
          BLOCOS DE PONTUAÇÃO E RANKING GLOBAL
          ========================================= */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "1.5rem" }}>
        <div style={{ 
          background: "linear-gradient(135deg, #0c3b4a 0%, #051318 100%)", 
          border: "1px solid #38bdf8", 
          borderRadius: "12px", 
          padding: "1rem", 
          textAlign: "center" 
        }}>
          <span style={{ color: "#94a3b8", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", display: "block" }}>
            Pontuação
          </span>
          <div style={{ color: "#38bdf8", fontSize: "1.6rem", fontWeight: "bold", margin: "0.2rem 0" }}>
            {stats?.score || 0} pts
          </div>
        </div>

        <div style={{ 
          background: "linear-gradient(135deg, #0c3b4a 0%, #051318 100%)", 
          border: "1px solid #38bdf8", 
          borderRadius: "12px", 
          padding: "1rem", 
          textAlign: "center" 
        }}>
          <span style={{ color: "#94a3b8", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", display: "block" }}>
            Ranking Global
          </span>
          <div style={{ color: "#fbbf24", fontSize: "1.6rem", fontWeight: "bold", margin: "0.2rem 0" }}>
            {loadingRank ? "..." : globalRank ? `#${globalRank}` : "Sem posição"}
          </div>
        </div>
      </div>

      {/* =========================================
          CRACHÁ DE EXPORTAÇÃO (Limpo de inputs)
          ========================================= */}
      <div id="profile-export-card" className="export-card">
        <div className="export-card-header">
          <div className="export-logo">
            <LungIcon filled /> <span>RespConex</span>
          </div>
          <div className="export-badge">Certificado de Jogador</div>
        </div>

        <div className="export-user-info" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ margin: "1rem 0 0.5rem" }}>
            {renderAvatarGraphic(activeProfile?.avatar, 84)}
          </div>
          
          <div className="name-display">
            <h2>{playerName}</h2>
          </div>
          
          <p className="export-user-title" style={{ color: currentRank.color, fontWeight: "bold", marginTop: "0.2rem" }}>
            {currentRank.badge} {currentRank.title}
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
            unlockedAchievements.map((id) => (
              <div key={id} className="export-ach-icon" title={ACHIEVEMENTS[id]?.title}>
                {ACHIEVEMENTS[id]?.icon}
              </div>
            ))
          ) : (
            <span className="export-ach-empty">Nenhuma conquista ainda... Jogue para desbloquear!</span>
          )}
        </div>
      </div>

      <div className="profile-share-wrap">
        <button 
          className="btn btn--primary profile-share-btn" 
          onClick={handleExportImage}
          disabled={isGenerating || isEditingProfile}
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