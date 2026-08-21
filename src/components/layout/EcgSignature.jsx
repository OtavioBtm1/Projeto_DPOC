// Elemento de assinatura visual do RespConex: uma linha de ECG
// animada, reforcando a identidade clinica/respiratoria do produto.
//
// Reage ao estado "heartRate" do jogo (ver GameContext):
//  - normal:   batimento calmo
//  - warning:  2 vidas restantes -> acelera e fica levemente avermelhado
//  - critical: 1 vida restante   -> acelera mais e fica bem avermelhado
//  - flatline: vidas acabaram    -> a linha "morre": fica reta e sem cor

const WAVEFORM =
  "M0,23 L40,23 L52,23 L58,6 L66,40 L74,12 L82,23 L120,23 L132,23 L138,6 L146,40 L154,12 L162,23 L200,23" +
  " M200,23 L240,23 L252,23 L258,6 L266,40 L274,12 L282,23 L320,23 L332,23 L338,6 L346,40 L354,12 L362,23 L400,23" +
  " M400,23 L440,23 L452,23 L458,6 L466,40 L474,12 L482,23 L520,23 L532,23 L538,6 L546,40 L554,12 L562,23 L600,23";

const FLATLINE = "M0,23 L600,23";

const RATE_CONFIG = {
  normal: { duration: "5.5s", className: "ecg--normal" },
  warning: { duration: "3s", className: "ecg--warning" },
  critical: { duration: "1.6s", className: "ecg--critical" },
  flatline: { duration: "9s", className: "ecg--flatline" },
};

export default function EcgSignature({ heartRate = "normal" }) {
  const config = RATE_CONFIG[heartRate] ?? RATE_CONFIG.normal;
  const isFlatline = heartRate === "flatline";

  return (
    <div className={`ecg-wrap ${config.className}`} aria-hidden="true">
      <svg
        viewBox="0 0 600 46"
        preserveAspectRatio="none"
        style={{
          animationDuration: config.duration,
          animationPlayState: isFlatline ? "paused" : "running",
        }}
      >
        <path className="ecg-line" d={isFlatline ? FLATLINE : WAVEFORM} />
      </svg>
    </div>
  );
}
