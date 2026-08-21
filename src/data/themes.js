// src/data/themes.js

export const THEME_TIERS = {
  easy: {
    id: "easy",
    title: "Nível Básico",
    subtitle: "Conscientização, sintomas e fatores de risco",
    color: "var(--mint)",
  },
  medium: {
    id: "medium",
    title: "Nível Clínico",
    subtitle: "Tratamento, exames e técnica inalatória",
    color: "var(--gold)",
  },
  hard: {
    id: "hard",
    title: "Nível Avançado",
    subtitle: "Fisiopatologia, crises agudas e UTI",
    color: "var(--coral)",
  },
};

export const THEMES = [
  // ==========================================
  // 🟢 FÁCIL / BÁSICO (Fases 1 a 5)
  // ==========================================
  {
    id: "easy-1",
    tier: "easy",
    levelNumber: 1,
    title: "Fase 1: Reconhecendo os Sinais",
    subtitle: "Primeiros sintomas e fatores do cotidiano",
    icon: "lungs",
    groups: [
      {
        name: "Sintomas Iniciais",
        color: "var(--gold)",
        items: ["Dispneia", "Tosse persistente", "Chiado no peito", "Fadiga"],
        didYouKnow: "A falta de ar progressiva aos esforços é o principal sinal de alerta da DPOC.",
      },
      {
        name: "Fatores de Risco",
        color: "var(--mint)",
        items: ["Tabagismo", "Poluição do ar", "Fumaça de lenha", "Poeira industrial"],
        didYouKnow: "O cigarro e a queima de lenha respondem pela imensa maioria dos casos de DPOC.",
      },
      {
        name: "Sinais de Alerta",
        color: "var(--sky)",
        items: ["Piora da falta de ar", "Mais secreção", "Mudança na cor do catarro", "Febre"],
        didYouKnow: "Crises agudas exigem reavaliação médica rápida para evitar perda permanente de função pulmonar.",
      },
      {
        name: "Impactos no Corpo",
        color: "var(--violet)",
        items: ["Cansaço ao caminhar", "Perda de peso", "Sono prejudicado", "Fraqueza nas pernas"],
        didYouKnow: "A DPOC afeta o corpo todo, gerando perda muscular e cansaço generalizado.",
      },
    ],
  },
  {
    id: "easy-2",
    tier: "easy",
    levelNumber: 2,
    title: "Fase 2: Parando de Fumar",
    subtitle: "A intervenção mais eficaz para os pulmões",
    icon: "shield",
    groups: [
      {
        name: "Benefícios de Parar",
        color: "var(--gold)",
        items: ["Preserva os pulmões", "Menos internações", "Melhora o fôlego", "Protege o coração"],
        didYouKnow: "Parar de fumar desacelera a perda progressiva da função pulmonar em qualquer estágio.",
      },
      {
        name: "Apoios Terapêuticos",
        color: "var(--mint)",
        items: ["Goma de nicotina", "Adesivo de nicotina", "Acompanhamento psicológico", "Grupo de apoio"],
        didYouKnow: "Unir terapia comportamental com reposição de nicotina dobra as chances de sucesso.",
      },
      {
        name: "Sintomas de Abstinência",
        color: "var(--sky)",
        items: ["Irritabilidade", "Fissura por cigarro", "Ansiedade", "Dor de cabeça"],
        didYouKnow: "A fissura aguda dura poucos minutos; beber água gelada e respirar fundo ajuda a passar o pico.",
      },
      {
        name: "Gatilhos a Evitar",
        color: "var(--violet)",
        items: ["Café em excesso", "Bebida alcoólica", "Companhia de fumantes", "Estresse elevado"],
        didYouKnow: "Identificar situações que dão vontade de fumar é essencial para criar rotinas substitutas.",
      },
    ],
  },
  {
    id: "easy-3",
    tier: "easy",
    levelNumber: 3,
    title: "Fase 3: O Papel do Cuidador",
    subtitle: "Apoio e segurança no ambiente domiciliar",
    icon: "users",
    groups: [
      {
        name: "Sinais de Gravidade",
        color: "var(--gold)",
        items: ["Lábios roxos", "Unhas azuladas", "Confusão mental", "Dificuldade para falar"],
        didYouKnow: "Extremidades azuladas (cianose) e sonolência repentina exigem socorro imediato.",
      },
      {
        name: "Apoio Diário",
        color: "var(--mint)",
        items: ["Lembrar horários", "Conferir a bombinha", "Acompanhar consultas", "Estimular caminhadas"],
        didYouKnow: "O envolvimento familiar aumenta significativamente a adesão ao plano terapêutico.",
      },
      {
        name: "Cuidados Ambientais",
        color: "var(--sky)",
        items: ["Não fumar em casa", "Evitar cheiro forte", "Manter janelas abertas", "Evitar poeira"],
        didYouKnow: "O fumo passivo e desinfetantes com odor forte provocam crises agudas de broncoespasmo.",
      },
      {
        name: "Plano de Ação",
        color: "var(--violet)",
        items: ["Telefone do SAMU", "Receita médica visível", "Oxímetro acessível", "Remédios organizados"],
        didYouKnow: "Ter um plano de ação impresso na geladeira diminui o pânico durante exacerbações.",
      },
    ],
  },
  {
    id: "easy-4",
    tier: "easy",
    levelNumber: 4,
    title: "Fase 4: Desmistificando a DPOC",
    subtitle: "Separando fatos de crenças populares",
    icon: "book",
    groups: [
      {
        name: "Mitos Frequentes",
        color: "var(--gold)",
        items: ["DPOC tem cura", "Só afeta idosos", "Sem sintoma não trata", "É só gripe mal curada"],
        didYouKnow: "A DPOC não tem cura, mas o tratamento constante controla os sintomas e prolonga a vida.",
      },
      {
        name: "Fatos Comprovados",
        color: "var(--mint)",
        items: ["Poluição causa DPOC", "Exercício faz bem", "Tratamento precoce ajuda", "Vacina protege"],
        didYouKnow: "Exercício físico adaptado melhora a musculatura e reduz o cansaço do paciente.",
      },
      {
        name: "Erros no Tratamento",
        color: "var(--sky)",
        items: ["Parar remédio por conta", "Usar só quando cansa", "Não lavar a boca", "Fumar escondido"],
        didYouKnow: "Os medicamentos de manutenção devem ser usados todo dia, mesmo na ausência de sintomas.",
      },
      {
        name: "Fontes Confiáveis",
        color: "var(--violet)",
        items: ["Equipe de enfermagem", "Médico pneumologista", "Sociedades médicas", "Grupos do SUS"],
        didYouKnow: "Tirar dúvidas com os profissionais de saúde evita o abandono precoce do tratamento.",
      },
    ],
  },
  {
    id: "easy-5",
    tier: "easy",
    levelNumber: 5,
    title: "Fase 5: Hábitos Saudáveis & Autocuidado",
    subtitle: "Consolidando a base do bem-estar respiratório",
    icon: "shield",
    groups: [
      {
        name: "Hábitos Protetores",
        color: "var(--gold)",
        items: ["Hidratação diária", "Caminhada regular", "Alimentação leve", "Lavar as mãos"],
        didYouKnow: "Lavar as mãos reduz infecções respiratórias simples que poderiam descompensar os pulmões.",
      },
      {
        name: "Proteção em Dias Frios",
        color: "var(--mint)",
        items: ["Cobrir nariz e boca", "Evitar vento gelado", "Tomar água morna", "Vacinar da gripe"],
        didYouKnow: "O ar frio e seco fecha os brônquios; usar cachecol aquece o ar antes de entrar nos pulmões.",
      },
      {
        name: "Respiração no Dia a Dia",
        color: "var(--sky)",
        items: ["Soltar ar devagar", "Puxar pelo nariz", "Não prender a respiração", "Descansar entre tarefas"],
        didYouKnow: "Puxar ar pelo nariz filtra e umedece o ar, diminuindo a irritação nas vias aéreas.",
      },
      {
        name: "Saúde Emocional",
        color: "var(--violet)",
        items: ["Conversar sobre medos", "Técnicas de calma", "Evitar isolamento", "Hobbies prazerosos"],
        didYouKnow: "A ansiedade e a falta de ar se retroalimentam; manter a mente tranquila alivia a respiração.",
      },
    ],
  },

  // ==========================================
  // 🟡 MÉDIO / CLÍNICO (Fases 1 a 5)
  // ==========================================
  {
    id: "medium-1",
    tier: "medium",
    levelNumber: 1,
    title: "Fase 1: Terapia Farmacológica",
    subtitle: "Medicamentos e classes terapêuticas",
    icon: "pill",
    groups: [
      {
        name: "Broncodilatadores",
        color: "var(--gold)",
        items: ["Salbutamol", "Formoterol", "Tiotrópio", "Indacaterol"],
        didYouKnow: "Broncodilatadores relaxam os músculos ao redor dos brônquios, facilitando o fluxo de ar.",
      },
      {
        name: "Anti-inflamatórios",
        color: "var(--mint)",
        items: ["Budesonida", "Beclometasona", "Fluticasona", "Prednisona"],
        didYouKnow: "Corticoides inalatórios reduzem o inchaço e a produção excessiva de muco nas vias aéreas.",
      },
      {
        name: "Tipos de Inalador",
        color: "var(--sky)",
        items: ["Spray dosimetrado", "Inalador de pó seco", "Nebulizador", "Espaçador valvulado"],
        didYouKnow: "O espaçador garante que a 'nuvem' da bombinha vá para o pulmão e não fique na língua.",
      },
      {
        name: "Cuidados Pós-Inalação",
        color: "var(--violet)",
        items: ["Bochechar com água", "Cuspir o enxágue", "Limpar o bocal", "Tampar o aparelho"],
        didYouKnow: "Enxaguar a boca após usar corticoide inalatório evita rouquidão e sapinho (candidíase).",
      },
    ],
  },
  {
    id: "medium-2",
    tier: "medium",
    levelNumber: 2,
    title: "Fase 2: Técnica Inalatória Correta",
    subtitle: "Garantindo a dose certa nos pulmões",
    icon: "wind",
    groups: [
      {
        name: "Passo a Passo da Bombinha",
        color: "var(--gold)",
        items: ["Agitar o frasco", "Soltar todo o ar", "Disparar e inspirar", "Apneia por 10s"],
        didYouKnow: "Prender a respiração por 10 segundos permite que as micropartículas se assentem nos brônquios.",
      },
      {
        name: "Erros Comuns",
        color: "var(--mint)",
        items: ["Não agitar o spray", "Inspirar rápido demais", "Disparar na língua", "Esquecer a apneia"],
        didYouKnow: "Mais de 50% dos pacientes erram a técnica inalatória, achando que o remédio não funciona.",
      },
      {
        name: "Uso do Espaçador",
        color: "var(--sky)",
        items: ["Acoplar a bombinha", "Encaixar na boca", "Disparo único", "Respirações lentas"],
        didYouKnow: "Nunca dê múltiplos jatos de uma vez dentro do espaçador; faça um por vez.",
      },
      {
        name: "Manutenção do Dispositivo",
        color: "var(--violet)",
        items: ["Lavar com água e sabão", "Secar naturalmente", "Não usar toalha de pano", "Checar contador de doses"],
        didYouKnow: "Secar o espaçador ao ar livre evita eletricidade estática que gruda o medicamento no plástico.",
      },
    ],
  },
  {
    id: "medium-3",
    tier: "medium",
    levelNumber: 3,
    title: "Fase 3: Vacinação e Prevenção",
    subtitle: "Blindando os pulmões contra infecções",
    icon: "shield",
    groups: [
      {
        name: "Vacinas Essenciais",
        color: "var(--gold)",
        items: ["Influenza anual", "Pneumocócica 13", "Pneumocócica 23", "Covid-19 reforço"],
        didYouKnow: "A vacina anual contra a gripe reduz em mais de 50% as internações hospitalares por DPOC.",
      },
      {
        name: "Doenças Prevenidas",
        color: "var(--mint)",
        items: ["Pneumonia bacteriana", "Gripe grave", "Coqueluche", "Infecção pelo VSR"],
        didYouKnow: "Uma pneumonia bacteriana pode descompensar irreversivelmente a função pulmonar do portador de DPOC.",
      },
      {
        name: "Locais de Aplicação",
        color: "var(--sky)",
        items: ["Posto de Saúde (UBS)", "CRIEL / CRIE", "Campanhas anuais", "Centros de referência"],
        didYouKnow: "Pacientes com DPOC têm direito a vacinas especiais gratuitas nos centros de imunobiológicos (CRIE).",
      },
      {
        name: "Efeitos Esperados",
        color: "var(--violet)",
        items: ["Dor leve no braço", "Febre baixa passageira", "Produção de anticorpos", "Proteção coletiva"],
        didYouKnow: "Reações vacinais leves são normais e indicam que o sistema imunológico está criando defesas.",
      },
    ],
  },
  {
    id: "medium-4",
    tier: "medium",
    levelNumber: 4,
    title: "Fase 4: Exames e Diagnóstico",
    subtitle: "Como a medicina mede a saúde pulmonar",
    icon: "chart",
    groups: [
      {
        name: "Exames de Rotina",
        color: "var(--gold)",
        items: ["Espirometria", "Oximetria de pulso", "Raio-X de tórax", "Gasometria arterial"],
        didYouKnow: "A espirometria pós-broncodilatador é o padrão-ouro indispensável para diagnosticar a DPOC.",
      },
      {
        name: "O que a Espirometria Mede",
        color: "var(--mint)",
        items: ["Capacidade vital (CVF)", "Volume no 1º seg (VEF1)", "Relação VEF1/CVF", "Resposta ao broncodilatador"],
        didYouKnow: "A relação VEF1/CVF menor que 0.70 após remédio confirma a presença de obstrução fixa.",
      },
      {
        name: "Questionários Clínicos",
        color: "var(--sky)",
        items: ["Escala mMRC", "Escore CAT", "Teste de caminhada 6min", "Diário de sintomas"],
        didYouKnow: "A escala mMRC avalia o impacto da falta de ar nas atividades diárias (grau 0 a 4).",
      },
      {
        name: "Sinais na Radiografia",
        color: "var(--violet)",
        items: ["Diafragma rebaixado", "Coração em gota", "Aumento dos espaços", "Hipertransparência"],
        didYouKnow: "O aprisionamento de ar empurra o diafragma para baixo, visível no raio-x.",
      },
    ],
  },
  {
    id: "medium-5",
    tier: "medium",
    levelNumber: 5,
    title: "Fase 5: Conservação de Energia",
    subtitle: "Estratégias para render mais sem perder o fôlego",
    icon: "activity",
    groups: [
      {
        name: "Adaptações no Banho",
        color: "var(--gold)",
        items: ["Cadeira de banho", "Esponja de cabo longo", "Toalha tipo roupão", "Banheiro ventilado"],
        didYouKnow: "Tomar banho sentado economiza até 40% da energia respiratória consumida no esforço.",
      },
      {
        name: "Técnica de Lábios Semicerrados",
        color: "var(--mint)",
        items: ["Puxar pelo nariz", "Formar bico com a boca", "Soltar o dobro do tempo", "Aliviar a sensação de sufoco"],
        didYouKnow: "O freio labial cria pressão positiva que mantém os brônquios abertos na expiração.",
      },
      {
        name: "Organização da Casa",
        color: "var(--sky)",
        items: ["Itens na altura do peito", "Evitar subir escadas", "Carrinho para compras", "Cozinhar sentado"],
        didYouKnow: "Evitar abaixar e levantar repetidamente reduz a pressão dos órgãos sobre os pulmões.",
      },
      {
        name: "Ritmo de Trabalho",
        color: "var(--violet)",
        items: ["Pausas programadas", "Fracionar tarefas", "Não ter pressa", "Expirar durante o esforço"],
        didYouKnow: "Expirar ao fazer força (como levantar peso) previne o aprisionamento súbito de ar.",
      },
    ],
  },

  // ==========================================
  // 🔴 DIFÍCIL / AVANÇADO (Fases 1 a 5)
  // ==========================================
  {
    id: "hard-1",
    tier: "hard",
    levelNumber: 1,
    title: "Fase 1: Mecânica e Fisiopatologia",
    subtitle: "Alterações estruturais do parênquima pulmonar",
    icon: "lungs",
    groups: [
      {
        name: "Alterações Alveolares",
        color: "var(--gold)",
        items: ["Destruição de septos", "Perda de elastina", "Hiperinsuflação pulmonar", "Espaço morto aumentado"],
        didYouKnow: "A destruição da elastina alveolar faz com que os alvéolos colapsem na expiração.",
      },
      {
        name: "Vias Aéreas Pequenas",
        color: "var(--mint)",
        items: ["Hipertrofia de glândulas", "Tampões mucosos", "Remodelamento brônquico", "Metaplasia escamosa"],
        didYouKnow: "A inflamação crônica substitui o epitélio ciliar por células produtoras de muco espesso.",
      },
      {
        name: "Consequências Gasométricas",
        color: "var(--sky)",
        items: ["Hipoxemia crônica", "Hipercapnia", "Acidose respiratória", "Compensação renal"],
        didYouKnow: "Rins retêm bicarbonato (HCO3) para compensar o acúmulo crônico de CO2 no sangue.",
      },
      {
        name: "Causas Genéticas",
        color: "var(--violet)",
        items: ["Alfa-1 antitripsina", "Genótipo PiZZ", "Enfisema panacinar", "Início em jovens"],
        didYouKnow: "A deficiência de Alfa-1 Antitripsina causa enfisema grave mesmo em não fumantes jovens.",
      },
    ],
  },
  {
    id: "hard-2",
    tier: "hard",
    levelNumber: 2,
    title: "Fase 2: Classificação GOLD Avançada",
    subtitle: "Estadiamento clínico e fenotipagem",
    icon: "chart",
    groups: [
      {
        name: "Estágios pelo VEF1",
        color: "var(--gold)",
        items: ["GOLD 1 (>=80%)", "GOLD 2 (50-79%)", "GOLD 3 (30-49%)", "GOLD 4 (<30%)"],
        didYouKnow: "O VEF1 define a gravidade espirométrica, mas o tratamento é guiado pelos sintomas e crises.",
      },
      {
        name: "Grupos Clínicos ABE",
        color: "var(--mint)",
        items: ["Grupo A (poucos sintomas)", "Grupo B (muitos sintomas)", "Grupo E (exacerbador frequente)", "Histórico de internação"],
        didYouKnow: "A classificação GOLD atual unificou pacientes exacerbadores no Grupo E.",
      },
      {
        name: "Biomarcadores",
        color: "var(--sky)",
        items: ["Eosinófilos no sangue", "Proteína C-Reativa", "Nível de Alfa-1", "Contagem de neutrófilos"],
        didYouKnow: "Eosinófilos acima de 300 células/uL indicam boa resposta ao uso de corticoides inalatórios.",
      },
      {
        name: "Fenótipos Clínicos",
        color: "var(--violet)",
        items: ["Enfisematoso ('Pink Puffer')", "Bronquítico ('Blue Bloater')", "Sobreposição Asma-DPOC", "Exacerbador crônico"],
        didYouKnow: "O fenótipo 'Blue Bloater' cursa com tosse produtiva, cianose e maior risco de cor pulmonale.",
      },
    ],
  },
  {
    id: "hard-3",
    tier: "hard",
    levelNumber: 3,
    title: "Fase 3: Manejo da Crise Aguda",
    subtitle: "Abordagem da exacerbação grave no pronto-socorro",
    icon: "alert-triangle",
    groups: [
      {
        name: "Critérios de Anthonisen",
        color: "var(--gold)",
        items: ["Piora da dispneia", "Mais volume de escarro", "Escarro purulento", "Indicação de antibiótico"],
        didYouKnow: "A presença de escarro purulento associado a piora do fôlego é o principal indicativo para antibióticos.",
      },
      {
        name: "Terapia de Emergência",
        color: "var(--mint)",
        items: ["Nebulização contínua", "Corticoide sistêmico oral", "Oxigênio controlado (88-92%)", "Sulfato de magnésio IV"],
        didYouKnow: "O alvo de saturação na crise é 88% a 92% para não inibir o drive respiratório central.",
      },
      {
        name: "Agentes Infecciosos",
        color: "var(--sky)",
        items: ["Haemophilus influenzae", "Streptococcus pneumoniae", "Pseudomonas aeruginosa", "Rinovírus humano"],
        didYouKnow: "Pseudomonas aeruginosa deve ser investigada em pacientes com exacerbações frequentes e VEF1 muito baixo.",
      },
      {
        name: "Critérios de UTI",
        color: "var(--violet)",
        items: ["Instabilidade hemodinâmica", "Rebaixamento de consciência", "Acidose grave (pH < 7.25)", "Fadiga respiratória iminente"],
        didYouKnow: "A sonolência na crise pode indicar narcose por CO2 (hipercapnia grave).",
      },
    ],
  },
  {
    id: "hard-4",
    tier: "hard",
    levelNumber: 4,
    title: "Fase 4: Suporte Ventilatório & UTI",
    subtitle: "Ventilação não invasiva e monitorização crítica",
    icon: "activity",
    groups: [
      {
        name: "Parâmetros da VNI (BiPAP)",
        color: "var(--gold)",
        items: ["Pressão inspiratória (IPAP)", "Pressão expiratória (EPAP)", "Máscara oronasal", "Sensibilidade do disparo"],
        didYouKnow: "A VNI reduz o trabalho da musculatura respiratória e 'lava' o excesso de gás carbônico.",
      },
      {
        name: "Benefícios da VNI",
        color: "var(--mint)",
        items: ["Evita intubação", "Reduz mortalidade", "Menor tempo de UTI", "Mantém a fala e deglutição"],
        didYouKnow: "O uso precoce de VNI na crise hipercapnica é uma das medidas mais eficazes em terapia intensiva.",
      },
      {
        name: "Contraindicações da VNI",
        color: "var(--sky)",
        items: ["Parada cardiorrespiratória", "Vômitos incoercíveis", "Trauma facial grave", "Coma não responsivo"],
        didYouKnow: "Pacientes sem capacidade de proteger a via aérea necessitam de intubação orotraqueal direta.",
      },
      {
        name: "Cuidados da Enfermagem em VNI",
        color: "var(--violet)",
        items: ["Proteger ponte nasal", "Monitorar vazamento", "Checar sincronia paciente-aparelho", "Avaliar conforto"],
        didYouKnow: "Usar curativo hidrocoloide no nariz previne lesões por pressão provocadas pela máscara.",
      },
    ],
  },
  {
    id: "hard-5",
    tier: "hard",
    levelNumber: 5,
    title: "Fase 5: Complicações Cardiopulmonares",
    subtitle: "Manejo da doença em estágio terminal e comorbidades",
    icon: "chart",
    groups: [
      {
        name: "Cor Pulmonale",
        color: "var(--gold)",
        items: ["Hipertensão pulmonar", "Sobrecarga de ventrículo direito", "Edema de membros inferiores", "Estase jugular"],
        didYouKnow: "A vasoconstrição hipóxica crônica nos pulmões sobrecarrega o lado direito do coração.",
      },
      {
        name: "Oxigenoterapia Domiciliar",
        color: "var(--mint)",
        items: ["Concentrador de oxigênio", "Uso >= 15 horas/dia", "Cânula nasal tipo óculos", "PaO2 < 55 mmHg em repouso"],
        didYouKnow: "Usar oxigênio por no mínimo 15 horas/dia é a única medida além de parar de fumar que aumenta a sobrevida.",
      },
      {
        name: "Comorbidades Frequentes",
        color: "var(--sky)",
        items: ["Doença arterial coronariana", "Osteoporose por corticoide", "Caquexia pulmonar", "Depressão maior"],
        didYouKnow: "A inflamação sistêmica crônica da DPOC acelera o risco de infarto e perda óssea.",
      },
      {
        name: "Cuidados Paliativos",
        color: "var(--violet)",
        items: ["Opioides em baixas doses", "Ventilador de mão no rosto", "Acolhimento familiar", "Diretivas antecipadas"],
        didYouKnow: "Doses baixas de morfina aliviam a sensação de sufoco refratária sem deprimir a respiração.",
      },
    ],
  },
];