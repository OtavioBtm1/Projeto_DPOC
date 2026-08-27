// src/data/themes.js

export const THEME_TIERS = {
  tutorial: {
    id: "tutorial",
    title: "Nível de Treinamento",
    subtitle: "Aprenda a jogar antes de começar",
    color: "var(--sky)",
  },
  easy: {
    id: "easy",
    title: "Nível Estudante",
    subtitle: "Sintomas, clima e o dia a dia do paciente",
    color: "var(--mint)",
  },
  medium: {
    id: "medium",
    title: "Nível Enfermeiro",
    subtitle: "Reabilitação, prevenção e monitoramento",
    color: "var(--gold)",
  },
  hard: {
    id: "hard",
    title: "Nível Professor",
    subtitle: "Avaliação clínica, emergência e exacerbações",
    color: "var(--coral)",
  },
};

export const THEMES = [
  // ==========================================
  // 🔵 TUTORIAL (Nível Exclusivo de Treino)
  // ==========================================
  {
    id: "tutorial-1",
    tier: "tutorial",
    levelNumber: 0,
    title: "Treinamento Básico",
    subtitle: "Aprenda as regras do jogo",
    icon: "activity",
    groups: [
      { hint: "Profissionais que cuidam da sua saúde", name: "Equipe Médica", color: "var(--gold)", items: ["Médico", "Enfermeiro", "Fisioterapeuta", "Nutricionista"], didYouKnow: "É isso aí! Você acabou de agrupar 4 palavras que fazem parte do mesmo tema. O jogo funciona exatamente assim!" },
      { hint: "Órgãos do corpo humano", name: "Anatomia Básica", color: "var(--mint)", items: ["Pulmão", "Coração", "Cérebro", "Estômago"], didYouKnow: "Muito bem! Fique sempre de olho nas lupas (🔍), elas são as dicas do que você deve procurar no tabuleiro." },
      { hint: "Usamos para proteger os pés", name: "Calçados", color: "var(--sky)", items: ["Tênis", "Chinelo", "Sapato", "Bota"], didYouKnow: "Excelente! Cuidado: você pode errar, mas preste atenção no número de vidas (corações) lá no topo da tela." },
      { hint: "As cores do semáforo de trânsito", name: "Sinalização", color: "var(--violet)", items: ["Verde", "Amarelo", "Vermelho", "Pisca-alerta"], didYouKnow: "🎉 Parabéns! Você completou o tutorial e entendeu a mecânica perfeitamente. Agora você está pronto para o desafio real!" }
    ],
  },
  // ==========================================
  // 🟢 FÁCIL
  // ==========================================
  {
    id: "easy-1",
    tier: "easy",
    levelNumber: 1,
    title: "Fase 1: Conhecendo o Inimigo",
    subtitle: "Desmistificação e Sinais de Alerta",
    icon: "users",
    groups: [
      { hint: "Identifique os primeiros sinais de alerta", name: "Sintomas Iniciais", color: "var(--gold)", items: ["Falta de ar", "Tosse crônica", "Fadiga diária", "Chiado no peito"], didYouKnow: "Muitos pacientes acham que o cansaço é 'só velhice', o que atrasa o diagnóstico em vários anos." },
      { hint: "Desvende as verdades sobre a DPOC", name: "Desmistificando a DPOC", color: "var(--mint)", items: ["Não é contagiosa", "Tem tratamento", "Exige movimento", "Não é só cigarro"], didYouKnow: "Embora o fumo seja a principal causa, a inalação de fumaça de fogão a lenha e poluição também causam DPOC grave." },
      { hint: "Decifre o caminho para o diagnóstico", name: "Primeiros Passos", color: "var(--sky)", items: ["Buscar médico", "Fazer espirometria", "Parar de fumar", "Mudar hábitos"], didYouKnow: "A espirometria (exame do sopro) é o único teste definitivo para diagnosticar o nível de obstrução pulmonar." },
      { hint: "Revele os mitos mais comuns", name: "Mitos Comuns", color: "var(--violet)", items: ["Bombinha vicia", "Oxigênio vicia", "Repouso absoluto", "Não tem cura"], didYouKnow: "Bombinhas não viciam! Elas entregam o remédio direto no pulmão, com muito menos efeitos colaterais que um comprimido." }
    ],
  },
  {
    id: "easy-2",
    tier: "easy",
    levelNumber: 2,
    title: "Fase 2: Clima e Ar Seco",
    subtitle: "Impactos climáticos e prevenção sazonal",
    icon: "sun",
    groups: [
      { hint: "Descubra os efeitos do tempo abafado", name: "El Niño e Seca", color: "var(--gold)", items: ["Tempo abafado", "Falta de chuvas", "Baixa umidade", "Muco grosso"], didYouKnow: "O ar muito seco engrossa a secreção, dificultando a tosse e favorecendo infecções bacterianas graves." },
      { hint: "Encontre os perigos no ar que respiramos", name: "Queimadas e Fuligem", color: "var(--mint)", items: ["Fumaça no ar", "Irritação ocular", "Gatilho de crise", "Fuligem invisível"], didYouKnow: "As partículas finas das queimadas viajam quilômetros, atravessam as defesas do nariz e inflamam violentamente os brônquios." },
      { hint: "Reconheça as armadilhas das altas temperaturas", name: "Ondas de Calor", color: "var(--sky)", items: ["Suor excessivo", "Queda de pressão", "Cansaço térmico", "Desidratação"], didYouKnow: "O corpo gasta muita energia para tentar se resfriar no calor intenso, exigindo mais do coração e 'roubando' oxigênio." },
      { hint: "Aprenda a se proteger nos dias secos", name: "Prevenção Sazonal", color: "var(--violet)", items: ["Lavar o nariz", "Umidificador", "Ficar na sombra", "Beber água"], didYouKnow: "Lavar o nariz com soro funciona como um 'filtro' extra, retirando a poluição antes dela descer para os pulmões." }
    ],
  },
  {
    id: "easy-3",
    tier: "easy",
    levelNumber: 3,
    title: "Fase 3: Arsenal Inalatório",
    subtitle: "Técnica do uso da bombinha sem erros",
    icon: "activity",
    groups: [
      { hint: "Conheça o arsenal para a respiração", name: "Tipos de Dispositivos", color: "var(--gold)", items: ["Spray (Bombinha)", "Cápsula de pó", "Névoa suave", "Espaçador"], didYouKnow: "O espaçador é recomendado para adultos e idosos, pois garante que o remédio chegue no pulmão e não fique preso na garganta." },
      { hint: "Domine a técnica perfeita de inalação", name: "Uso Sem Erros", color: "var(--mint)", items: ["Agitar o frasco", "Soltar todo o ar", "Puxar e apertar", "Prender respiração"], didYouKnow: "Segurar a respiração por 10 segundos após inalar é o segredo vital para o pó assentar e fazer efeito." },
      { hint: "Identifique as falhas que prejudicam o tratamento", name: "Erros Mais Comuns", color: "var(--sky)", items: ["Esquecer de agitar", "Não usar espaçador", "Respirar rápido", "Vazamento no bocal"], didYouKnow: "Inspirar rápido demais faz o remédio bater no fundo da garganta. O ideal é puxar o ar de forma lenta e profunda." },
      { hint: "Saiba como manter seu equipamento seguro", name: "Higiene do Material", color: "var(--violet)", items: ["Lavar espaçador", "Secar à sombra", "Limpar bocal", "Checar validade"], didYouKnow: "Esfregar o espaçador por dentro com pano cria energia estática, fazendo o remédio grudar nas paredes de plástico." }
    ],
  },
  {
    id: "easy-4",
    tier: "easy",
    levelNumber: 4,
    title: "Fase 4: Rotina e Movimento",
    subtitle: "Exercício, nutrição e riscos em casa",
    icon: "users",
    groups: [
      { hint: "Descubra como o corpo pode ajudar o pulmão", name: "Movimento e Exercício", color: "var(--gold)", items: ["Caminhada leve", "Alongamento", "Pausas regulares", "Conservar energia"], didYouKnow: "Sincronizar a respiração com o passo (ex: puxar o ar em 1 passo, soltar em 2) facilita incrivelmente a caminhada." },
      { hint: "Monte o prato ideal para respirar melhor", name: "Apoio Nutricional", color: "var(--mint)", items: ["Comer devagar", "Porções pequenas", "Evitar gases", "Mastigar bem"], didYouKnow: "Alimentos que produzem gases estufam o estômago, empurrando o diafragma para cima e piorando a falta de ar." },
      { hint: "Prepare o ambiente para uma noite de alívio", name: "Descanso do Paciente", color: "var(--sky)", items: ["Travesseiro alto", "Quarto escuro", "Elevar cabeceira", "Higiene do sono"], didYouKnow: "Elevar a cabeceira da cama diminui a pressão dos órgãos abdominais sobre os pulmões durante a noite." },
      { hint: "Encontre os inimigos escondidos dentro de casa", name: "Riscos Ocultos no Ambiente", color: "var(--violet)", items: ["Ácaros e mofo", "Cloro de limpeza", "Fumaça de fritura", "Pelos de animais"], didYouKnow: "Inalar produtos de limpeza com cheiro muito forte, como água sanitária pura, pode causar broncoespasmo imediato." }
    ],
  },
  {
    id: "easy-5",
    tier: "easy",
    levelNumber: 5,
    title: "Fase 5: Saúde Mental",
    subtitle: "O ciclo da dispneia e o apoio emocional",
    icon: "shield",
    groups: [
      { hint: "Reconheça o peso invisível da doença", name: "Impacto Emocional", color: "var(--gold)", items: ["Tristeza", "Isolamento social", "Medo de sufocar", "Ansiedade diária"], didYouKnow: "O isolamento social é comum, pois o paciente teme ter crises de tosse severa ou falta de ar em público." },
      { hint: "Quebre o círculo vicioso da falta de ar", name: "Ciclo da Dispneia", color: "var(--mint)", items: ["Falta de ar", "Gera pânico", "Acelera respiração", "Cansa o músculo"], didYouKnow: "O pânico tensiona a musculatura do tórax, tornando a respiração ainda mais superficial, rápida e difícil." },
      { hint: "Encontre força na união e no diálogo", name: "Rede de Apoio", color: "var(--sky)", items: ["Família presente", "Grupos de pacientes", "Terapia", "Conversar abertamente"], didYouKnow: "Compartilhar medos com quem tem a mesma doença em grupos de apoio reduz significativamente as taxas de depressão." },
      { hint: "Explore formas de acalmar a mente e o corpo", name: "Técnicas de Relaxamento", color: "var(--violet)", items: ["Respiração lenta", "Meditação", "Ouvir música", "Leitura"], didYouKnow: "Praticar o relaxamento diminui a frequência cardíaca e ajuda a retomar o controle respiratório em crises leves." }
    ],
  },

  // ==========================================
  // 🟡 MÉDIO
  // ==========================================
  {
    id: "medium-1",
    tier: "medium",
    levelNumber: 1,
    title: "Fase 6: Reabilitação Pulmonar",
    subtitle: "Condicionamento e equipe multidisciplinar",
    icon: "activity",
    groups: [
      { hint: "Descubra os focos principais da reabilitação", name: "Objetivos", color: "var(--gold)", items: ["Reduzir sintomas", "Melhorar esforço", "Independência", "Educação em saúde"], didYouKnow: "A reabilitação não reverte a lesão pulmonar, mas ensina os músculos a aproveitar melhor o oxigênio disponível." },
      { hint: "Identifique as atividades de fortalecimento", name: "Treino Físico", color: "var(--mint)", items: ["Força de membros", "Exercício aeróbico", "Halteres leves", "Faixas elásticas"], didYouKnow: "Fortalecer os braços ajuda muito, pois pacientes usam a musculatura acessória para levantar peso e respirar ao mesmo tempo." },
      { hint: "Reúna os profissionais essenciais para o cuidado", name: "Equipe Multidisciplinar", color: "var(--sky)", items: ["Fisioterapeuta", "Nutricionista", "Psicólogo", "Enfermeiro"], didYouKnow: "O sucesso a longo prazo na reabilitação depende de ajustar tanto o corpo quanto a mente e a dieta do paciente." },
      { hint: "Domine a técnica para poupar os pulmões", name: "Padrão Respiratório", color: "var(--violet)", items: ["Freno labial", "Uso do diafragma", "Ritmo constante", "Expirar longo"], didYouKnow: "A respiração com freio labial (bico) cria uma pressão que mantém os brônquios abertos por mais tempo na expiração." }
    ],
  },
  {
    id: "medium-2",
    tier: "medium",
    levelNumber: 2,
    title: "Fase 7: Sinais de Alerta",
    subtitle: "Atenção à crise e monitoramento em casa",
    icon: "shield",
    groups: [
      { hint: "Identifique os sinais de que algo está errado", name: "Atenção à Crise", color: "var(--gold)", items: ["Catarro amarelado", "Febre inesperada", "Falta de ar severa", "Confusão mental"], didYouKnow: "Se o catarro mudar de cor (para amarelo ou verde) ou aumentar de volume, é forte indício de infecção pulmonar." },
      { hint: "Descubra as formas de controle em casa", name: "Monitoramento", color: "var(--mint)", items: ["Oxímetro de pulso", "Pressão arterial", "Controle de peso", "Frequência cardíaca"], didYouKnow: "No oxímetro, esmaltes escuros ou mãos muito frias podem causar falsas leituras baixas de oxigênio." },
      { hint: "Proteja as barreiras naturais do corpo", name: "Prevenção de Infecções", color: "var(--sky)", items: ["Vacina da gripe", "Uso de máscara", "Higiene das mãos", "Saúde bucal"], didYouKnow: "Bactérias escondidas em gengivites mal curadas podem ser aspiradas para o pulmão e causar pneumonias graves." },
      { hint: "Reúna as ferramentas para o controle pessoal", name: "Autocuidado", color: "var(--violet)", items: ["Plano de ação", "Adesão correta", "Reconhecer piora", "Contato de urgência"], didYouKnow: "Ter um plano de ação escrito ajuda o paciente a saber exatamente quantos jatos a mais de remédio tomar antes de ir ao PS." }
    ],
  },
  {
    id: "medium-3",
    tier: "medium",
    levelNumber: 3,
    title: "Fase 8: Papel da Enfermagem",
    subtitle: "Acompanhamento e intervenção domiciliar",
    icon: "users",
    groups: [
      { hint: "Liste os focos da avaliação no consultório", name: "Consulta de Rotina", color: "var(--gold)", items: ["Checar inalação", "Revisar vacinas", "Avaliar sintomas", "Acolhimento"], didYouKnow: "A maior causa de falha no tratamento é o uso incorreto da bombinha, que deve ser reavaliado em toda consulta." },
      { hint: "Conheça as ações iniciais de alívio rápido", name: "Intervenção Básica", color: "var(--mint)", items: ["Decúbito elevado", "Oxigênio prescrito", "Orientar tosse", "Hidratação oral"], didYouKnow: "Ensinar a 'tosse eficaz' (tossir de forma curta e controlada) evita o colapso das vias aéreas e gasta menos energia." },
      { hint: "Descubra como a equipe acompanha de perto", name: "Busca Ativa", color: "var(--sky)", items: ["Visita domiciliar", "Telefonemas", "Evitar internação", "Monitorar faltas"], didYouKnow: "O acompanhamento próximo por enfermeiros e agentes de saúde reduz as idas à emergência em mais de 40%." },
      { hint: "Entenda como o conhecimento salva vidas", name: "Educação em Saúde", color: "var(--violet)", items: ["Cartilhas visuais", "Linguagem simples", "Checar entendimento", "Envolver família"], didYouKnow: "O letramento em saúde é vital: pedir para o paciente repetir a orientação garante que ele realmente compreendeu." }
    ],
  },
  {
    id: "medium-4",
    tier: "medium",
    levelNumber: 4,
    title: "Fase 9: Meio Ambiente Intenso",
    subtitle: "Inversão térmica e poluição indoor",
    icon: "wind",
    groups: [
      { hint: "Entenda o fenômeno que prende a poluição no ar", name: "Inversão Térmica", color: "var(--gold)", items: ["Ar frio retido", "Poluentes no solo", "Piora matinal", "Risco de crise"], didYouKnow: "A inversão térmica no inverno age como uma 'tampa', prendendo a fumaça dos escapamentos na altura da nossa respiração." },
      { hint: "Identifique os riscos dentro de quatro paredes", name: "Poluição Interna (Indoor)", color: "var(--mint)", items: ["Fogão a lenha", "Querosene", "Uso de incensos", "Falta de ventilação"], didYouKnow: "A fumaça crônica de fogões a lenha em ambientes fechados é uma das maiores causas de DPOC em mulheres no interior." },
      { hint: "Descubra como proteger as vias aéreas no frio", name: "Cuidados no Frio", color: "var(--sky)", items: ["Cachecol no rosto", "Aquecer o ar", "Evitar friagem", "Roupas em camadas"], didYouKnow: "Respirar ar gelado de uma vez causa broncoespasmo (fechamento dos brônquios). O cachecol ajuda a aquecer o ar." },
      { hint: "Saiba como o clima extremo afeta seus medicamentos", name: "Impacto nos Remédios", color: "var(--violet)", items: ["Longe do calor", "Não expor ao sol", "Manter fechado", "Checar validade"], didYouKnow: "Bombinhas pressurizadas expostas ao sol intenso do El Niño podem sofrer alteração na dose disparada." }
    ],
  },
  {
    id: "medium-5",
    tier: "medium",
    levelNumber: 5,
    title: "Fase 10: Vivência Sistêmica",
    subtitle: "As consequências além do pulmão",
    icon: "alert-triangle",
    groups: [
      { hint: "Entenda a perda silenciosa de energia pelo corpo", name: "Desnutrição Grave", color: "var(--gold)", items: ["Caquexia pulmonar", "Gasto calórico", "Perda muscular", "Hipermetabolismo"], didYouKnow: "O esforço para respirar pesado o dia todo gasta tantas calorias que muitos pacientes emagrecem drasticamente." },
      { hint: "Descubra a conexão vital entre os órgãos", name: "Coração e Pulmão", color: "var(--mint)", items: ["Arritmias", "Pressão pulmonar alta", "Cor Pulmonale", "Inchaço nas pernas"], didYouKnow: "Quando o pulmão adoece, o lado direito do coração faz muita força para bombear sangue para ele, podendo inchar (Cor Pulmonale)." },
      { hint: "Identifique as ameaças à estrutura óssea", name: "Risco de Osteoporose", color: "var(--sky)", items: ["Uso de corticoide", "Risco de fratura", "Falta de sol", "Sedentarismo"], didYouKnow: "O uso prolongado de corticoides orais, somado à falta de exercícios, enfraquece severamente os ossos do paciente." },
      { hint: "Reconheça os perigos que ocorrem durante a noite", name: "Apneia do Sono", color: "var(--violet)", items: ["Ronco alto", "Despertares súbitos", "Falta de ar noturna", "Risco cardiovascular"], didYouKnow: "A sobreposição de DPOC com Apneia (Síndrome de Overlap) despenca os níveis de oxigênio durante a madrugada." }
    ],
  },

  // ==========================================
  // 🔴 DIFÍCIL
  // ==========================================
  {
    id: "hard-1",
    tier: "hard",
    levelNumber: 1,
    title: "Fase 11: Avaliação Física",
    subtitle: "O exame clínico respiratório avançado",
    icon: "chart",
    groups: [
      { hint: "Observe os sinais visíveis no corpo do paciente", name: "Inspeção", color: "var(--gold)", items: ["Tórax em barril", "Tiragem intercostal", "Cianose central", "Baqueteamento digital"], didYouKnow: "O 'tórax em barril' surge porque o paciente não consegue expirar todo o ar, deixando os pulmões hiperinsuflados cronicamente." },
      { hint: "Decifre os sons revelados pelo estetoscópio", name: "Ausculta Pulmonar", color: "var(--mint)", items: ["Murmúrio reduzido", "Sibilos expiratórios", "Estertores", "Tempo expiratório longo"], didYouKnow: "O silêncio na ausculta pulmonar durante uma crise pode ser um péssimo sinal: indica que quase não há passagem de ar." },
      { hint: "Identifique as alterações físicas no tórax", name: "Percussão e Palpação", color: "var(--sky)", items: ["Hipersonoridade", "Frêmito diminuído", "Expansibilidade baixa", "Baixa excursão base"], didYouKnow: "Ao percutir o tórax, ouve-se um som mais oco (hipersonoro) devido à enorme quantidade de ar aprisionado." },
      { hint: "Reconheça os alertas de falência respiratória iminente", name: "Sinais de Gravidade", color: "var(--violet)", items: ["Uso de escalenos", "Respiração paradoxal", "Confusão mental", "Letargia"], didYouKnow: "A respiração paradoxal (a barriga murcha em vez de estufar ao inspirar) indica falência iminente do músculo diafragma." }
    ],
  },
  {
    id: "hard-2",
    tier: "hard",
    levelNumber: 2,
    title: "Fase 12: Fármacos Utilizados",
    subtitle: "Farmacologia respiratória e oxigenoterapia",
    icon: "pill",
    groups: [
      { hint: "Conheça a base do alívio respiratório", name: "Broncodilatadores", color: "var(--gold)", items: ["SABA e LABA", "SAMA e LAMA", "Receptor Beta-2", "Relaxamento muscular"], didYouKnow: "SABA/LABA estimulam os receptores que relaxam o brônquio, enquanto SAMA/LAMA bloqueiam os receptores que causam contração." },
      { hint: "Identifique as armas contra a inflamação brônquica", name: "Corticoides", color: "var(--mint)", items: ["Anti-inflamatório", "ICS, Oral e IV", "Efeitos sistêmicos", "Risco de candidíase"], didYouKnow: "Após inalar corticoide (ICS), é obrigatório lavar a boca. O resíduo imunossuprime a mucosa e causa fungos (sapinho)." },
      { hint: "Descubra quando combater os invasores", name: "Antibioticoterapia", color: "var(--sky)", items: ["Exacerbação purulenta", "Macrolídeos", "Efeito imunomodulador", "Prevenir resistência"], didYouKnow: "Macrolídeos como a azitromicina contínua são usados não só para matar bactérias, mas por seu forte efeito anti-inflamatório." },
      { hint: "Entenda as regras do suporte artificial de O2", name: "Oxigenoterapia", color: "var(--violet)", items: ["O2 domiciliar", "Cânula nasal", "Concentrador", "Saturação 88-92%"], didYouKnow: "Para retentores crônicos, a saturação alvo é de 88% a 92%. Mais que isso pode desligar o estímulo cerebral para respirar." }
    ],
  },
  {
    id: "hard-3",
    tier: "hard",
    levelNumber: 3,
    title: "Fase 13: Gasometria e Distúrbios",
    subtitle: "Desvendando o sangue arterial",
    icon: "activity",
    groups: [
      { hint: "Revele os sinais da falta de oxigênio no sangue", name: "Hipoxemia", color: "var(--gold)", items: ["PaO2 baixa", "Saturação < 88%", "Cianose", "Sofrimento tecidual"], didYouKnow: "Uma PaO2 (pressão de oxigênio no sangue) abaixo de 60 mmHg em repouso é indicação de oxigênio domiciliar contínuo." },
      { hint: "Identifique os perigos da retenção de gases", name: "Hipercapnia", color: "var(--mint)", items: ["Retenção de CO2", "PaCO2 > 45", "Narcose por CO2", "Sonolência diurna"], didYouKnow: "Níveis extremamente altos de Gás Carbônico agem no cérebro como um anestésico, levando o paciente ao coma." },
      { hint: "Entenda o desequilíbrio químico que paralisa o corpo", name: "Acidose Respiratória", color: "var(--sky)", items: ["pH < 7.35", "Falência mecânica", "Fadiga diafragmática", "Emergência médica"], didYouKnow: "Quando o pulmão exausto não joga o CO2 fora, ele vira ácido no sangue, derrubando o pH. É indicativo de suporte ventilatório." },
      { hint: "Descubra como o corpo tenta se salvar por outros meios", name: "Compensação Renal", color: "var(--violet)", items: ["Reter bicarbonato", "Base Excess alta", "Processo lento", "pH crônico normal"], didYouKnow: "O rim é o parceiro do pulmão. Se o pulmão está ácido (alto CO2), o rim retém base (bicarbonato) para neutralizar o sangue." }
    ],
  },
  {
    id: "hard-4",
    tier: "hard",
    levelNumber: 4,
    title: "Fase 14: Exacerbações Extremas",
    subtitle: "Estresse climático e descompensação",
    icon: "wind",
    groups: [
      { hint: "Investigue a resposta do corpo ao calor extremo", name: "Estresse Térmico", color: "var(--gold)", items: ["Vasodilatação", "Aumento do débito", "Sobrecarga cardíaca", "Risco de choque"], didYouKnow: "Ondas de calor severas forçam o coração a bombear muito sangue para a pele tentar resfriar, esgotando a reserva do paciente." },
      { hint: "Reconheça o impacto dos invasores microscópicos", name: "Partículas PM2.5", color: "var(--mint)", items: ["Penetração alveolar", "Estresse oxidativo", "Inflamação sistêmica", "Microtrombose"], didYouKnow: "Fuligens muito finas (menores que 2.5 micrômetros) atravessam o pulmão, caem na corrente sanguínea e inflamam os vasos." },
      { hint: "Identifique os passos críticos dentro da emergência", name: "Manejo no Pronto-Socorro", color: "var(--sky)", items: ["Reposição venosa", "Cuidado com edema", "Monitorar eletrólitos", "Corticoide IV"], didYouKnow: "Reposição agressiva e rápida de soro num idoso com cor pulmonale pode causar edema agudo e afogar o pulmão." },
      { hint: "Descubra como a friagem agride o sistema", name: "Fisiopatologia do Frio", color: "var(--violet)", items: ["Vasoespasmo", "Muco viscoso", "Redução do batimento ciliar", "Infecção secundária"], didYouKnow: "O ar gelado paralisa os 'cílios' microscópicos da traqueia, que param de varrer a sujeira para fora do pulmão." }
    ],
  },
  {
    id: "hard-5",
    tier: "hard",
    levelNumber: 5,
    title: "Fase 15: Cuidados Paliativos",
    subtitle: "Dignidade, conforto e fim de vida",
    icon: "shield",
    groups: [
      { hint: "Compreenda a prioridade no tratamento avançado", name: "Foco do Cuidado", color: "var(--gold)", items: ["Alívio do sofrimento", "Conforto total", "Qualidade de vida", "Dignidade"], didYouKnow: "Cuidados paliativos não significam 'desistir', mas sim mudar o foco da cura impossível para o bem-estar absoluto do paciente." },
      { hint: "Descubra as táticas para aliviar o sufocamento", name: "Manejo da Dispneia", color: "var(--mint)", items: ["Morfina baixa dose", "Ventilador no rosto", "Ansiedade controlada", "Benzodiazepínicos"], didYouKnow: "A morfina, em baixas doses guiadas, atua no cérebro desligando a sensação aterrorizante de sufocamento (fome de ar)." },
      { hint: "Identifique as intervenções não invasivas para o conforto", name: "Suporte Avançado", color: "var(--sky)", items: ["Uso de VNI", "Limitação terapêutica", "Sedação paliativa", "Extubação compassiva"], didYouKnow: "A Ventilação Não Invasiva (máscara de BIPAP) é muitas vezes usada apenas para conforto respiratório, sem intenção de cura." },
      { hint: "Reconheça a importância de planejar o amanhã", name: "Diretivas Antecipadas", color: "var(--violet)", items: ["Testamento vital", "Vontade do paciente", "Reunião familiar", "Processo de luto"], didYouKnow: "Permitir que o paciente decida antecipadamente, de forma lúcida, se quer ou não ser intubado, garante autonomia na terminalidade." }
    ],
  },
];