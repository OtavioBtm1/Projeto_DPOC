import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useGame } from "../../context/GameContext";

export default function AuthModal({ isOpen, onClose }) {
  const { activeProfile, setPlayerPin, loginWithProfile } = useGame();
  const [mode, setMode] = useState("choose"); 
  
  const [pinInput, setPinInput] = useState("");
  const [loginName, setLoginName] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  // Função para Proteger/Vincular a conta ATUAL com um PIN de 4 números
  const handleSecureProfile = (e) => {
    e.preventDefault();
    if (pinInput.length !== 4) {
      setError("O PIN precisa ter exatamente 4 números.");
      return;
    }
    setError("");
    
    // Salva o PIN no perfil ativo local (o GameContext cuidará de mandar pro Supabase automaticamente)
    setPlayerPin(pinInput);
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2500);
  };

  // Função para recuperar uma conta do Supabase (Nome + PIN)
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginName.trim() || pinInput.length !== 4) {
      setError("Preencha seu nome e o PIN de 4 dígitos.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Busca no banco o usuário com esse nome e PIN
      const { data, error: dbError } = await supabase
        .from("leaderboard")
        .select("*")
        .ilike("player_name", loginName.trim()) // ilike ignora maiúsculas/minúsculas
        .eq("pin", pinInput)
        .limit(1)
        .maybeSingle();

      if (dbError || !data) {
        setError("Conta não encontrada. Verifique o Nome e o PIN.");
        setLoading(false);
        return;
      }

      // Sucesso! Injeta o perfil recuperado no jogo
      loginWithProfile(data);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);

    } catch (err) {
      console.error(err);
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0, 0, 0, 0.85)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 2000, padding: "1rem"
    }}>
      <div style={{
        background: "#071920", border: "1px solid #38bdf8", borderRadius: "16px",
        padding: "1.5rem", maxWidth: "380px", width: "100%", textAlign: "center"
      }}>
        
        {success ? (
          <div>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <h3 style={{ color: "#34d399", margin: "0 0 1rem 0" }}>Tudo Pronto!</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Sua conta foi sincronizada com sucesso.</p>
          </div>
        ) : (
          <>
            <h3 style={{ color: "#38bdf8", marginTop: 0, marginBottom: "1rem" }}>
              🔑 Sincronização de Conta
            </h3>

            {mode === "choose" && (
              <div>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                  Proteja seu progresso ou recupere sua conta usando um PIN de 4 números.
                </p>
                <button 
                  onClick={() => { setMode("secure"); setError(""); setPinInput(""); }} 
                  className="btn btn--primary" 
                  style={{ width: "100%", marginBottom: "0.8rem", padding: "0.7rem", fontWeight: "bold" }}
                >
                  Proteger meu Perfil Atual
                </button>
                <button 
                  onClick={() => { setMode("login"); setError(""); setPinInput(""); }} 
                  className="btn" 
                  style={{ width: "100%", padding: "0.7rem", background: "#1e4d5f", color: "#fff" }}
                >
                  Recuperar Conta Existente
                </button>
                <div style={{ marginTop: "1rem" }}>
                  <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "0.8rem" }}>
                    Fechar
                  </button>
                </div>
              </div>
            )}

            {mode === "secure" && (
              <form onSubmit={handleSecureProfile}>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "1rem" }}>
                  Crie um PIN de 4 números para a conta <strong>{activeProfile?.name}</strong>.
                </p>
                <input 
                  type="text" placeholder="Ex: 1234" value={pinInput} 
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))} 
                  maxLength={4}
                  style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", background: "#051318", border: "1px solid #1e4d5f", color: "#fff", textAlign: "center", fontSize: "1.5rem", letterSpacing: "6px", marginBottom: "1rem" }}
                />
                {error && <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "0.8rem" }}>{error}</p>}
                
                <button type="submit" className="btn btn--primary" style={{ width: "100%", padding: "0.7rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Salvar PIN
                </button>
                <button type="button" onClick={() => setMode("choose")} style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", fontSize: "0.8rem" }}>
                  ← Voltar
                </button>
              </form>
            )}

            {mode === "login" && (
              <form onSubmit={handleLogin}>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "1rem" }}>
                  Digite seu Nome de Usuário e seu PIN para restaurar seus dados.
                </p>
                <input 
                  type="text" placeholder="Nome de usuário..." value={loginName} 
                  onChange={(e) => setLoginName(e.target.value)} 
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#051318", border: "1px solid #1e4d5f", color: "#fff", marginBottom: "0.8rem" }}
                />
                <input 
                  type="text" placeholder="PIN (4 números)" value={pinInput} 
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))} 
                  maxLength={4}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", background: "#051318", border: "1px solid #1e4d5f", color: "#fff", textAlign: "center", fontSize: "1.5rem", letterSpacing: "6px", marginBottom: "1rem" }}
                />
                {error && <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "0.8rem" }}>{error}</p>}
                
                <button type="submit" disabled={loading} className="btn btn--primary" style={{ width: "100%", padding: "0.7rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  {loading ? "Buscando..." : "Entrar e Sincronizar"}
                </button>
                <button type="button" onClick={() => setMode("choose")} style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", fontSize: "0.8rem" }}>
                  ← Voltar
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}