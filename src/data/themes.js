// src/data/themes.js

export const THEME_TIERS = {
  easy: {
    id: "easy",
    title: "Nível Estudante",
    subtitle: "Qualidade de vida, alimentação e clima",
    color: "var(--mint)",
  },
  medium: {
    id: "medium",
    title: "Nível Enfermeiro",
    subtitle: "Reabilitação, dispositivos e alertas ambientais",
    color: "var(--gold)",
  },
  hard: {
    id: "hard",
    title: "Nível Professor",
    subtitle: "Comorbidades sistêmicas e exacerbações climáticas",
    color: "var(--coral)",
  },
};

export const THEMES = [
  // ==========================================
  // 🟢 FÁCIL (Temporada 2)
  // ==========================================
  {
    id: "easy-1",
    tier: "easy",
    levelNumber: 1,
    title: "Fase 1: Nutrição e Respiração",
    subtitle: "O impacto do prato nos pulmões",
    icon: "activity",
    groups: [
      { name: "Alimentos a Evitar", color: "var(--gold)", items: ["Refrigerantes", "Feijão em excesso", "Frituras", "Repolho"], didYouKnow: "Alimentos que produzem muitos gases estufam o estômago, empurrando o diafragma e piorando a falta de ar." },
      { name: "Bons Hábitos à Mesa", color: "var(--mint)", items: ["Comer devagar", "Mastigar bem", "Porções pequenas", "Sentar-se ereto"], didYouKnow: "Fazer refeições menores e mais frequentes exige menos energia e oxigênio para a digestão." },
      { name: "Nutrientes Aliados", color: "var(--sky)", items: ["Fibras", "Vitamina C", "Ômega-3", "Proteínas magras"], didYouKnow: "Uma dieta rica em proteínas ajuda a manter a massa muscular, essencial para a força da respiração." },
      { name: "Hidratação", color: "var(--violet)", items: ["Beber água aos poucos", "Evitar líquidos na refeição", "Sucos naturais", "Água de coco"], didYouKnow: "Beber líquidos longe das refeições principais evita a sensação de estômago cheio demais." }
    ],
  },
  {
    id: "easy-2",
    tier: "easy",
    levelNumber: 2,
    title: "Fase 2: O Sono do Paciente",
    subtitle: "Descansar para conseguir respirar",
    icon: "users",
    groups: [
      { name: "Problemas Noturnos", color: "var(--gold)", items: ["Insônia", "Ronco alto", "Despertar ofegante", "Dor de cabeça matinal"], didYouKnow: "A dor de cabeça ao acordar pode ser sinal de acúmulo de gás carbônico (CO2) durante a noite." },
      { name: "Higiene do Sono", color: "var(--mint)", items: ["Quarto escuro", "Horário regular", "Evitar telas", "Refeição leve à noite"], didYouKnow: "A luz de celulares antes de dormir inibe a melatonina, piorando a insônia comum na DPOC." },
      { name: "Posições Confortáveis", color: "var(--sky)", items: ["Travesseiros altos", "Dormir de lado", "Cabeceira elevada", "Apoio nos joelhos"], didYouKnow: "Elevar a cabeceira da cama diminui a pressão dos órgãos abdominais sobre os pulmões." },
      { name: "Riscos Adicionais", color: "var(--violet)", items: ["Apneia do sono", "Uso de calmantes", "Falta de oxigênio", "Refluxo"], didYouKnow: "Calmantes e remédios para dormir sem orientação médica podem deprimir perigosamente a respiração." }
    ],
  },
  {
    id: "easy-3",
    tier: "easy",
    levelNumber: 3,
    title: "Fase 3: Movimento e Exercício",
    subtitle: "Atividade física como remédio",
    icon: "activity",
    groups: [
      { name: "Exercícios Seguros", color: "var(--gold)", items: ["Caminhada leve", "Alongamento", "Bicicleta ergométrica", "Hidroginástica"], didYouKnow: "O sedentarismo atrofia os músculos; caminhar melhora a eficiência com que o corpo usa o oxigênio." },
      { name: "Sinais para Parar", color: "var(--mint)", items: ["Tontura", "Dor no peito", "Falta de ar extrema", "Palpitação forte"], didYouKnow: "Sentir um pouco de cansaço é normal, mas dor no peito exige interrupção imediata da atividade." },
      { name: "Preparo para a Atividade", color: "var(--sky)", items: ["Usar a bombinha antes", "Roupas confortáveis", "Tênis adequado", "Aquecimento"], didYouKnow: "Usar o broncodilatador 15 minutos antes do exercício ajuda a prevenir o cansaço precoce." },
      { name: "Respiração no Esforço", color: "var(--violet)", items: ["Inspirar parado", "Expirar no movimento", "Ritmo constante", "Pausas regulares"], didYouKnow: "Sincronizar a respiração com o passo (ex: puxar o ar em 1 passo, soltar em 2) facilita a caminhada." }
    ],
  },
  {
    id: "easy-4",
    tier: "easy",
    levelNumber: 4,
    title: "Fase 4: Saúde Mental",
    subtitle: "O peso invisível da DPOC",
    icon: "users",
    groups: [
      { name: "Desafios Emocionais", color: "var(--gold)", items: ["Tristeza", "Isolamento social", "Medo de sufocar", "Vergonha da tosse"], didYouKnow: "O isolamento social é comum, pois o paciente teme ter crises de tosse ou falta de ar em público." },
      { name: "O Ciclo da Ansiedade", color: "var(--mint)", items: ["Falta de ar gera pânico", "Pânico acelera respiração", "Respiração rápida cansa", "Piora da falta de ar"], didYouKnow: "A ansiedade tensiona a musculatura do tórax, tornando a respiração ainda mais difícil e superficial." },
      { name: "Rede de Apoio", color: "var(--sky)", items: ["Família presente", "Grupos de pacientes", "Terapia", "Visitas regulares"], didYouKnow: "Compartilhar medos com quem tem a mesma doença em grupos de apoio reduz significativamente a depressão." },
      { name: "Relaxamento", color: "var(--violet)", items: ["Ouvir música", "Leitura", "Meditação guiada", "Trabalhos manuais"], didYouKnow: "Técnicas de relaxamento diminuem a frequência cardíaca e ajudam a controlar crises de ansiedade leve." }
    ],
  },
  {
    id: "easy-5",
    tier: "easy",
    levelNumber: 5,
    title: "Fase 5: O Impacto do El Niño",
    subtitle: "Clima extremo e seus perigos",
    icon: "sun",
    groups: [
      { name: "O Fenômeno Climático", color: "var(--gold)", items: ["Seca prolongada", "Ondas de calor", "Ar muito seco", "Falta de chuvas"], didYouKnow: "O El Niño eleva as temperaturas globais, tornando o ar extremamente seco, o que dificulta a respiração na DPOC." },
      { name: "Adaptação da Rotina", color: "var(--mint)", items: ["Evitar sol do meio-dia", "Roupas leves", "Ficar na sombra", "Exercício só de manhã"], didYouKnow: "O esforço físico no pico do calor aumenta a demanda de oxigênio pelo corpo, gerando cansaço rápido." },
      { name: "Sinais de Alerta no Calor", color: "var(--sky)", items: ["Boca muito seca", "Catarro espesso", "Cansaço extremo", "Tontura térmica"], didYouKnow: "A desidratação faz o muco pulmonar engrossar, dificultando a sua eliminação." },
      { name: "Aliados da Hidratação", color: "var(--violet)", items: ["Beber mais água", "Uso de umidificador", "Bacia com água no quarto", "Toalha úmida"], didYouKnow: "Umidificar o ambiente ajuda a manter as vias aéreas lubrificadas durante os dias secos." }
    ],
  },

  // ==========================================
  // 🟡 MÉDIO (Temporada 2)
  // ==========================================
  {
    id: "medium-1",
    tier: "medium",
    levelNumber: 1,
    title: "Fase 1: Reabilitação Pulmonar",
    subtitle: "Recuperando a independência",
    icon: "activity",
    groups: [
      { name: "Objetivos do Programa", color: "var(--gold)", items: ["Reduzir sintomas", "Melhorar esforço", "Educação em saúde", "Independência"], didYouKnow: "A reabilitação não reverte a lesão pulmonar, mas ensina o corpo a aproveitar melhor o oxigênio disponível." },
      { name: "Equipe Multidisciplinar", color: "var(--mint)", items: ["Fisioterapeuta", "Nutricionista", "Psicólogo", "Enfermeiro"], didYouKnow: "O sucesso da reabilitação depende da ação conjunta de diversos profissionais da saúde." },
      { name: "Treino Muscular", color: "var(--sky)", items: ["Força de membros", "Treino de resistência", "Halteres leves", "Faixas elásticas"], didYouKnow: "Fortalecer os braços ajuda muito, pois usamos músculos acessórios do tórax para levantar peso e respirar ao mesmo tempo." },
      { name: "Resultados Esperados", color: "var(--violet)", items: ["Menos internações", "Caminhar mais longe", "Melhora do humor", "Volta ao trabalho"], didYouKnow: "Pacientes reabilitados apresentam uma drástica redução nas idas à emergência." }
    ],
  },
  {
    id: "medium-2",
    tier: "medium",
    levelNumber: 2,
    title: "Fase 2: Tecnologia e Dispositivos",
    subtitle: "Ferramentas de monitoramento",
    icon: "shield",
    groups: [
      { name: "Oxímetro de Pulso", color: "var(--gold)", items: ["Dedo indicador", "Sem esmalte escuro", "Mãos aquecidas", "Leitura de SpO2"], didYouKnow: "Esmaltes escuros ou mãos muito frias podem causar falsas leituras baixas de oxigênio no aparelho." },
      { name: "Saturação Alvo", color: "var(--mint)", items: ["Geralmente 88% a 92%", "Evitar excesso de O2", "Aceitar valores menores", "Monitorar tendências"], didYouKnow: "Na DPOC grave, saturar 100% não é o objetivo e pode até ser perigoso, inibindo o estímulo da respiração." },
      { name: "Espaçadores Modernos", color: "var(--sky)", items: ["Válvula unidirecional", "Máscara acoplada", "Antiestáticos", "Alarme de fluxo"], didYouKnow: "Alguns espaçadores apitam se o paciente inspirar rápido demais, ajudando a corrigir a técnica." },
      { name: "Concentradores de O2", color: "var(--violet)", items: ["Filtro limpo", "Distância de chamas", "Uso contínuo", "Extensão de cânula"], didYouKnow: "Concentradores portáteis deram liberdade de locomoção aos pacientes dependentes de oxigenoterapia." }
    ],
  },
  {
    id: "medium-3",
    tier: "medium",
    levelNumber: 3,
    title: "Fase 3: Prevenção de Infecções",
    subtitle: "A defesa da barreira respiratória",
    icon: "shield",
    groups: [
      { name: "Ameaças Invisíveis", color: "var(--gold)", items: ["Vírus da gripe", "Bactérias", "Fungos de mofo", "Aglomerações"], didYouKnow: "Um simples resfriado em uma pessoa saudável pode virar uma pneumonia grave no paciente com DPOC." },
      { name: "Cuidados Odontológicos", color: "var(--mint)", items: ["Escovar dentes", "Fio dental", "Ir ao dentista", "Limpar próteses"], didYouKnow: "Bactérias de gengivites podem ser aspiradas para os pulmões, causando infecções graves." },
      { name: "Barreiras Físicas", color: "var(--sky)", items: ["Uso de máscara", "Álcool em gel", "Distanciamento", "Ventilação natural"], didYouKnow: "Manter a casa arejada dispersa gotículas e reduz a carga viral do ambiente." },
      { name: "Vacinação Específica", color: "var(--violet)", items: ["Tríplice bacteriana (dTpa)", "Hepatite B", "Herpes Zóster", "Reforços em dia"], didYouKnow: "Além das vacinas respiratórias, a vacina contra Herpes Zóster é recomendada devido à baixa imunidade natural da idade." }
    ],
  },
  {
    id: "medium-4",
    tier: "medium",
    levelNumber: 4,
    title: "Fase 4: O Papel da Enfermagem",
    subtitle: "Acompanhamento longitudinal",
    icon: "users",
    groups: [
      { name: "Consultas de Rotina", color: "var(--gold)", items: ["Revisar inalação", "Checar vacinas", "Avaliar adesão", "Medir pressão"], didYouKnow: "A consulta de enfermagem foca na educação contínua e em corrigir vícios no uso dos medicamentos." },
      { name: "Busca Ativa", color: "var(--mint)", items: ["Visita domiciliar", "Telefonemas", "Faltas em consulta", "Rastreio de piora"], didYouKnow: "Agentes comunitários e enfermeiros evitam internações ao detectar sinais precoces de exacerbação em casa." },
      { name: "Plano de Cuidados", color: "var(--sky)", items: ["Metas realistas", "Diário de sintomas", "Orientações escritas", "Contato de urgência"], didYouKnow: "As orientações devem ser escritas com letras grandes e linguagem simples para facilitar a leitura por idosos." },
      { name: "Triagem no Acolhimento", color: "var(--violet)", items: ["Frequência respiratória", "Sinais de cianose", "Uso de musculatura", "Confusão mental"], didYouKnow: "Um paciente usando a musculatura do pescoço (escalenos) para respirar precisa de atendimento prioritário." }
    ],
  },
  {
    id: "medium-5",
    tier: "medium",
    levelNumber: 5,
    title: "Fase 5: Riscos Ambientais e Poluição",
    subtitle: "Alerta Climático e El Niño",
    icon: "wind",
    groups: [
      { name: "Inversão Térmica", color: "var(--gold)", items: ["Bloqueio de ar frio", "Retenção de poluentes", "Qualidade do ar ruim", "Risco de broncoespasmo"], didYouKnow: "A inversão térmica age como uma 'tampa', prendendo a poluição perto do solo." },
      { name: "Fumaça e Queimadas", color: "var(--mint)", items: ["Inalação de fuligem", "Irritação brônquica", "Fechar janelas", "Uso de máscara PFF2"], didYouKnow: "Durante secas do El Niño, as queimadas aumentam e o uso de máscara PFF2 ao sair filtra a fuligem fina." },
      { name: "Cuidados Preventivos", color: "var(--sky)", items: ["Monitorar hidratação", "Lavagem nasal com soro", "Ajustar banho", "Identificar desidratação"], didYouKnow: "A lavagem nasal diária remove mecanicamente os poluentes presos na mucosa superior." },
      { name: "Impacto nos Remédios", color: "var(--violet)", items: ["Ressecamento da mucosa", "Enxágue redobrado", "Longe do calor", "Checar validade"], didYouKnow: "Bombinhas não devem ser expostas ao sol; o calor extremo altera a pressão do gás e a dose." }
    ],
  },

  // ==========================================
  // 🔴 DIFÍCIL (Temporada 2)
  // ==========================================
  {
    id: "hard-1",
    tier: "hard",
    levelNumber: 1,
    title: "Fase 1: Interações e Farmacologia",
    subtitle: "Complexidade medicamentosa",
    icon: "pill",
    groups: [
      { name: "Betabloqueadores", color: "var(--gold)", items: ["Usados na pressão", "Cardiosseletivos", "Risco de broncoespasmo", "Atenolol / Bisoprolol"], didYouKnow: "Pacientes com DPOC e problema cardíaco devem usar apenas betabloqueadores específicos (cardiosseletivos) para não fechar os brônquios." },
      { name: "Uso de Corticoides", color: "var(--mint)", items: ["Osteoporose", "Catarata", "Diabetes induzida", "Pele frágil"], didYouKnow: "O uso prolongado de corticoide em comprimido afina a pele, descalcifica ossos e desregula o açúcar no sangue." },
      { name: "Diuréticos", color: "var(--sky)", items: ["Perda de potássio", "Alcalose metabólica", "Fraqueza muscular", "Arritmias"], didYouKnow: "Diuréticos usados para inchaço nas pernas podem eliminar potássio demais, gerando fraqueza nos músculos da respiração." },
      { name: "Antibioticoterapia", color: "var(--violet)", items: ["Macrolídeos", "Azitromicina contínua", "Efeito imunomodulador", "Resistência bacteriana"], didYouKnow: "A Azitromicina não é usada apenas para matar bactérias, mas por seu forte efeito anti-inflamatório nos pulmões." }
    ],
  },
  {
    id: "hard-2",
    tier: "hard",
    levelNumber: 2,
    title: "Fase 2: Consequências Sistêmicas",
    subtitle: "Muito além dos pulmões",
    icon: "alert-triangle",
    groups: [
      { name: "Disfunção Muscular", color: "var(--gold)", items: ["Sarcopenia", "Fibras de contração rápida", "Atrofia por desuso", "Fadiga láctica"], didYouKnow: "A DPOC altera as fibras musculares das pernas, fazendo o paciente produzir ácido lático e cansar muito mais rápido." },
      { name: "Policitemia Secundária", color: "var(--mint)", items: ["Aumento de hemácias", "Sangue viscoso", "Hipóxia crônica", "Risco de trombose"], didYouKnow: "O corpo produz glóbulos vermelhos em excesso tentando compensar a falta de oxigênio, deixando o sangue 'grosso'." },
      { name: "Desnutrição Grave", color: "var(--sky)", items: ["Caquexia pulmonar", "Perda de massa magra", "Alto gasto energético", "Hipermetabolismo"], didYouKnow: "O trabalho de respirar pesado gasta tantas calorias que muitos pacientes emagrecem drasticamente mesmo comendo bem." },
      { name: "Doença Cardiovascular", color: "var(--violet)", items: ["Isquemia miocárdica", "Fibrilação atrial", "Cor Pulmonale", "Rigidez arterial"], didYouKnow: "A inflamação crônica nos pulmões viaja pelo sangue e danifica diretamente as artérias do coração." }
    ],
  },
  {
    id: "hard-3",
    tier: "hard",
    levelNumber: 3,
    title: "Fase 3: Gasometria e Distúrbios",
    subtitle: "A química do sangue no paciente",
    icon: "chart",
    groups: [
      { name: "Retenção de CO2", color: "var(--gold)", items: ["Hipercapnia crônica", "Sonolência", "Cefaleia", "Tremor de extremidades"], didYouKnow: "Níveis altos de CO2 atuam como um anestésico no cérebro, causando confusão e letargia." },
      { name: "Acidose Respiratória", color: "var(--mint)", items: ["pH < 7.35", "PaCO2 > 45", "Fadiga diafragmática", "Emergência médica"], didYouKnow: "A acidose indica que o pulmão entrou em falência mecânica e não consegue mais jogar o gás carbônico para fora." },
      { name: "Compensação Renal", color: "var(--sky)", items: ["Retenção de Bicarbonato", "pH normalizado", "Base Excess alta", "Processo lento"], didYouKnow: "Os rins demoram até 3 dias para reter bicarbonato suficiente e equilibrar a acidez do sangue." },
      { name: "Toxicidade por Oxigênio", color: "var(--violet)", items: ["Efeito Haldane", "Perda do drive hipóxico", "Piora da hipercapnia", "Narcose"], didYouKnow: "Dar muito oxigênio para um paciente retentor de CO2 pode fazer ele parar de respirar por conta própria." }
    ],
  },
  {
    id: "hard-4",
    tier: "hard",
    levelNumber: 4,
    title: "Fase 4: Cuidados Paliativos",
    subtitle: "Dignidade e conforto avançado",
    icon: "users",
    groups: [
      { name: "Foco do Cuidado", color: "var(--gold)", items: ["Alívio do sofrimento", "Conforto", "Qualidade de vida", "Apoio espiritual"], didYouKnow: "Os cuidados paliativos não significam 'desistir', mas sim garantir a melhor qualidade de vida na fase avançada." },
      { name: "Manejo da Dispneia", color: "var(--mint)", items: ["Opioides (Morfina)", "Ventilador no rosto", "Posição sentada", "Ambiente fresco"], didYouKnow: "Morfina em baixas doses diminui a percepção de falta de ar no cérebro sem causar parada respiratória." },
      { name: "Ansiedade de Fim de Vida", color: "var(--sky)", items: ["Medo da asfixia", "Apoio psicológico", "Uso de benzodiazepínicos", "Presença familiar"], didYouKnow: "O pânico constante de sufocar exige manejo farmacológico delicado associado a forte apoio humano." },
      { name: "Diretivas Antecipadas", color: "var(--violet)", items: ["Testamento vital", "Decisão sobre intubação", "Vontade do paciente", "Conferência familiar"], didYouKnow: "Permitir que o paciente decida antecipadamente se deseja ou não ir para a UTI garante autonomia e dignidade." }
    ],
  },
  {
    id: "hard-5",
    tier: "hard",
    levelNumber: 5,
    title: "Fase 5: Exacerbações Climáticas",
    subtitle: "Fisiopatologia do estresse térmico",
    icon: "alert-triangle",
    groups: [
      { name: "Estresse Térmico", color: "var(--gold)", items: ["Vasodilatação", "Aumento do débito", "Fadiga", "Descompensação"], didYouKnow: "O corpo tenta se resfriar dilatando os vasos, obrigando o coração a bater mais rápido e sobrecarregando o sistema." },
      { name: "Material Particulado (PM2.5)", color: "var(--mint)", items: ["Penetração alveolar", "Inflamação sistêmica", "Estresse oxidativo", "Pico de crise"], didYouKnow: "Partículas finas de queimadas atravessam os alvéolos, entram no sangue e causam inflamação violenta." },
      { name: "Manejo Avançado no PS", color: "var(--sky)", items: ["Reposição cuidadosa", "Hipertermia", "Ajuste de O2", "Prevenção de edema"], didYouKnow: "Reposição agressiva de soro em paciente com cor pulmonale desidratado pelo calor pode gerar edema agudo de pulmão." },
      { name: "Dados Epidemiológicos", color: "var(--violet)", items: ["Mais internações", "UTI lotada", "Hipoxemia agravada", "Mortalidade idosa"], didYouKnow: "Ondas de calor do El Niño aumentam exponencialmente a mortalidade por falência respiratória em idosos com DPOC." }
    ],
  },
];