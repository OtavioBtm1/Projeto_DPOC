export const THEME_TIERS = {
  tutorial: {
    id: "tutorial",
    title: "Nível de Treinamento",
    subtitle: "Aprenda a jogar antes de começar",
    color: "var(--sky)",
  },
  easy: {
    id: "easy",
    title: "Nível Paciente",
    subtitle: "Sintomas, clima e o dia a dia com a doença",
    color: "var(--mint)",
  },
  medium: {
    id: "medium",
    title: "Nível Cuidado",
    subtitle: "Reabilitação, prevenção e monitoramento",
    color: "var(--gold)",
  },
  hard: {
    id: "hard",
    title: "Nível Clínico",
    subtitle: "Avaliação médica, exames e emergências",
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
    title: " Treinamento Básico",
    subtitle: "Aprenda as regras do jogo RespConex",
    icon: "activity",
    groups: [
      { hint: "Profissionais que cuidam da sua saúde", name: "Equipe Médica", color: "var(--gold)", items: ["Médico", "Enfermeiro", "Fisioterapeuta", "Nutricionista"], didYouKnow: "É isso aí! Você acabou de agrupar 4 palavras do mesmo tema. O jogo funciona exatamente assim!" },
      { hint: "Órgãos do corpo humano", name: "Anatomia Básica", color: "var(--mint)", items: ["Pulmão", "Coração", "Cérebro", "Músculos"], didYouKnow: "Muito bem! Fique sempre de olho nas lupas (🔍), elas são as dicas do que você deve procurar no tabuleiro." },
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
    title: "Fase 1: Conhecendo o Inimigo Respiratório",
    subtitle: "Desmistificação e Sinais de Alerta",
    icon: "users",
    groups: [
      { hint: "Sinais de alerta da DPOC: identifique os primeiros sintomas", name: "Sintomas Iniciais", color: "var(--gold)", items: ["Falta de ar", "Tosse crônica", "Fadiga diária", "Chiado no peito"], didYouKnow: "Muitos pacientes acham que o cansaço é 'só velhice', o que atrasa a busca por ajuda e o diagnóstico correto." },
      { hint: "FATOS X MITOS sobre a DPOC", name: "Fatos Importantes", color: "var(--mint)", items: ["Não é contagiosa", "Tem tratamento", "Exige movimento", "Não é só cigarro"], didYouKnow: "Embora o fumo seja a principal causa, a inalação prolongada de fumaça de fogão a lenha e poluição também adoecem os pulmões." },
      { hint: "Rota diagnóstica da DPOC: entenda a confirmação clínica", name: "Primeiros Passos", color: "var(--sky)", items: ["Buscar médico", "Fazer espirometria", "Parar de fumar", "Mudar hábitos"], didYouKnow: "A espirometria (o famoso exame do sopro) é o teste definitivo para descobrir como está a saúde dos seus pulmões." },
      { hint: "Revele os mitos mais comuns sobre a DPOC", name: "Mitos e Lendas", color: "var(--violet)", items: ["Bombinha vicia", "Oxigênio vicia", "Repouso absoluto", "Não tem cura"], didYouKnow: "As bombinhas não viciam! Elas entregam o remédio direto onde ele precisa agir, com muito menos efeitos colaterais que um comprimido." }
    ],
  },
  {
    id: "easy-2",
    tier: "easy",
    levelNumber: 2,
    title: "Fase 2: El Niño e o Clima",
    subtitle: "Como o calor extremo afeta a respiração",
    icon: "sun",
    groups: [
      { hint: "DPOC no ar abafado: os impactos do calor na respiração", name: "Impactos do El Niño", color: "var(--gold)", items: ["Tempo abafado", "Falta de chuvas", "Baixa umidade", "Muco grosso"], didYouKnow: "O aquecimento extremo provocado pelo El Niño deixa o ar muito seco, engrossando a secreção e dificultando a limpeza dos pulmões." },
      { hint: "Detecte as ameaças invisíveis no ar para pacientes com DPOC", name: "Queimadas e Fumaça", color: "var(--mint)", items: ["Fumaça no ar", "Irritação ocular", "Gatilho de crise", "Fuligem invisível"], didYouKnow: "As secas prolongadas aumentam as queimadas. Essas partículas finas viajam longe e inflamam rapidamente as vias aéreas." },
      { hint: "Reconheça as armadilhas dos dias muito quentes", name: "Ondas de Calor", color: "var(--sky)", items: ["Suor excessivo", "Queda de pressão", "Cansaço térmico", "Desidratação"], didYouKnow: "No calor intenso, o corpo gasta muita energia para tentar se resfriar, o que exige mais do coração e aumenta a sensação de falta de ar." },
      { hint: "Aprenda a proteger seus pulmões no tempo seco", name: "Prevenção Diária", color: "var(--violet)", items: ["Lavar o nariz", "Umidificador", "Ficar na sombra", "Beber água"], didYouKnow: "Lavar o nariz com soro funciona como um 'filtro' natural, retirando a poluição antes dela descer para os pulmões." }
    ],
  },
  {
    id: "easy-3",
    tier: "easy",
    levelNumber: 3,
    title: "Fase 3: Arsenal Inalatório",
    subtitle: "Como usar seus medicamentos sem erro",
    icon: "activity",
    groups: [
      { hint: "Conheça os dispositivos de tratamento para DPOC", name: "Tipos de Dispositivos", color: "var(--gold)", items: ["Spray (Bombinha)", "Cápsula de pó", "Névoa suave", "Espaçador"], didYouKnow: "O espaçador é muito recomendado, pois ele garante que o remédio chegue fundo no pulmão e não fique parado na garganta." },
      { hint: "Domine a técnica perfeita de inalação para DPOC", name: "Uso Correto", color: "var(--mint)", items: ["Agitar o frasco", "Soltar todo o ar", "Puxar e apertar", "Prender respiração"], didYouKnow: "Segurar a respiração por cerca de 10 segundos após inalar é o segredo para o medicamento assentar e fazer efeito." },
      { hint: "Identifique as falhas que atrapalham o alívio da DPOC", name: "Erros Comuns", color: "var(--sky)", items: ["Esquecer de agitar", "Não usar espaçador", "Respirar rápido", "Vazamento no bocal"], didYouKnow: "Puxar o ar muito rápido faz o remédio bater no fundo da boca. O ideal é inspirar de forma lenta, suave e profunda." },
      { hint: "Cuidados com Aparelhos de DPOC: Mantenha seus dispositivos prontos", name: "Higiene do Material", color: "var(--violet)", items: ["Lavar espaçador", "Secar à sombra", "Limpar bocal", "Checar validade"], didYouKnow: "Esfregar o espaçador por dentro com um pano cria energia estática, o que faz o remédio grudar no plástico em vez de ir para você." }
    ],
  },
  {
    id: "easy-4",
    tier: "easy",
    levelNumber: 4,
    title: "Fase 4: Rotina e Movimento",
    subtitle: "Exercícios, alimentação e sono",
    icon: "users",
    groups: [
      { hint: "Descubra como o exercício físico te oferece autonomia", name: "Corpo em Movimento", color: "var(--gold)", items: ["Caminhada leve", "Alongamento", "Pausas regulares", "Conservar energia"], didYouKnow: "Sincronizar a respiração com os passos (exemplo: puxar o ar em 1 passo, soltar em 2) facilita incrivelmente a caminhada." },
      { hint: "Nutrição na DPOC: Monte refeições que evitam o cansaço respiratório", name: "Apoio Nutricional", color: "var(--mint)", items: ["Comer devagar", "Porções pequenas", "Evitar gases", "Mastigar bem"], didYouKnow: "Alimentos que produzem muitos gases estufam o estômago, empurrando o diafragma para cima e piorando o cansaço." },
      { hint: "Prepare o ambiente para uma boa noite de sono", name: "Hora de Dormir", color: "var(--sky)", items: ["Travesseiro alto", "Quarto escuro", "Elevar cabeceira", "Higiene do sono"], didYouKnow: "Elevar um pouco a cabeceira da cama diminui o peso dos órgãos sobre os pulmões, trazendo muito mais alívio ao deitar." },
      { hint: "Encontre os inimigos da DPOC escondidos em casa", name: "Riscos Domiciliares", color: "var(--violet)", items: ["Ácaros e mofo", "Cloro de limpeza", "Fumaça de fritura", "Pelos de animais"], didYouKnow: "Inalar produtos de limpeza com cheiro muito forte, como água sanitária pura, irrita os brônquios na mesma hora." }
    ],
  },
  {
    id: "easy-5",
    tier: "easy",
    levelNumber: 5,
    title: "Fase 5: Saúde Mental",
    subtitle: "O apoio emocional e o alívio da mente",
    icon: "shield",
    groups: [
      { hint: "Reconheça o peso emocional do diagnóstico da DPOC", name: "Impacto Psicológico", color: "var(--gold)", items: ["Tristeza", "Isolamento social", "Medo de sufocar", "Ansiedade diária"], didYouKnow: "É muito comum o paciente se isolar e deixar de sair de casa por medo de ter crises de tosse ou cansaço em público." },
      { hint: "Quebre o círculo vicioso do desespero", name: "Ciclo da Falta de Ar", color: "var(--mint)", items: ["Falta de ar", "Gera pânico", "Acelera respiração", "Cansa o músculo"], didYouKnow: "O pânico tensiona a musculatura do peito, o que torna a respiração ainda mais curta, rápida e difícil." },
      { hint: "Rede de Apoio à DPOC: Encontre força compartilhada para não lutar sozinho", name: "Rede de Apoio", color: "var(--sky)", items: ["Família presente", "Grupos de pacientes", "Terapia", "Conversar abertamente"], didYouKnow: "Compartilhar medos e conquistas com pessoas que passam pelo mesmo problema reduz muito os sentimentos de angústia." },
      { hint: "Controle da Ansiedade na DPOC: Técnicas para acalmar durante crises", name: "Técnicas de Relaxamento", color: "var(--violet)", items: ["Respiração lenta", "Meditação", "Ouvir música", "Leitura"], didYouKnow: "Relaxar ajuda a diminuir os batimentos do coração, permitindo que você retome o controle da respiração mais rápido." }
    ],
  },

  // ==========================================
  // 🟡 MÉDIO
  // ==========================================
  {
    id: "medium-1",
    tier: "medium",
    levelNumber: 1,
    title: "Fase 6: Reabilitação",
    subtitle: "Treinando o corpo para respirar melhor",
    icon: "activity",
    groups: [
      { hint: "Descubra os focos principais da reabilitação", name: "Objetivos Principais", color: "var(--gold)", items: ["Reduzir sintomas", "Melhorar esforço", "Independência", "Educação em saúde"], didYouKnow: "A reabilitação ensina a musculatura do seu corpo a aproveitar ao máximo o oxigênio que os pulmões conseguem captar." },
      { hint: "Identifique as atividades de fortalecimento respiratório", name: "Treino Físico", color: "var(--mint)", items: ["Força de membros", "Exercício aeróbico", "Halteres leves", "Faixas elásticas"], didYouKnow: "Fortalecer os braços ajuda muito, pois pacientes usam a mesma musculatura para levantar pesos do dia a dia e para ajudar a respirar." },
      { hint: "Reúna os profissionais essenciais para o cuidado da DPOC", name: "Equipe Multidisciplinar", color: "var(--sky)", items: ["Fisioterapeuta", "Nutricionista", "Psicólogo", "Enfermeiro"], didYouKnow: "O bem-estar real não vem só de remédios. Envolve cuidar do corpo físico, da mente e da alimentação em conjunto." },
      { hint: "Domine a técnica para poupar os pulmões de mais riscos respiratórios", name: "Padrão Respiratório", color: "var(--violet)", items: ["Freno labial", "Uso do diafragma", "Ritmo constante", "Expirar longo"], didYouKnow: "Expirar fazendo um 'biquinho' (freno labial) cria uma pressão interna que mantém as vias aéreas abertas por mais tempo." }
    ],
  },
  {
    id: "medium-2",
    tier: "medium",
    levelNumber: 2,
    title: "Fase 7: Sinais de Alerta",
    subtitle: "Atenção a crises e monitoramento",
    icon: "shield",
    groups: [
      { hint: "Identifique os sinais de que algo está errado com sua respiração", name: "Atenção à Crise", color: "var(--gold)", items: ["Catarro amarelado", "Febre inesperada", "Falta de ar severa", "Confusão mental"], didYouKnow: "Se o catarro mudar de cor (para amarelo ou esverdeado) ou aumentar de volume, é um forte sinal de infecção e o médico deve ser avisado." },
      { hint: "Manejo Domiciliar da DPOC: Práticas seguras de contenção em casa", name: "Monitoramento", color: "var(--mint)", items: ["Oxímetro de pulso", "Pressão arterial", "Controle de peso", "Frequência cardíaca"], didYouKnow: "Na hora de usar o oxímetro de dedo, mãos muito frias ou esmaltes escuros podem gerar um número falsamente baixo." },
      { hint: "Proteja as barreiras naturais do corpo contra DPOC", name: "Prevenção de Infecções", color: "var(--sky)", items: ["Vacina da gripe", "Uso de máscara", "Higiene das mãos", "Saúde bucal"], didYouKnow: "Bactérias escondidas em gengivites mal curadas podem ser aspiradas para os pulmões e causar graves pneumonias." },
      { hint: "Reúna as ferramentas para o controle pessoal da DPOC", name: "Autocuidado", color: "var(--violet)", items: ["Plano de ação", "Adesão correta", "Reconhecer piora", "Contato de urgência"], didYouKnow: "Ter um Plano de Ação escrito ajuda a saber exatamente quantos jatos a mais de remédio tomar antes de correr para a emergência." }
    ],
  },
  {
    id: "medium-3",
    tier: "medium",
    levelNumber: 3,
    title: "Fase 8: Cuidado e Enfermagem",
    subtitle: "O apoio técnico e a visita domiciliar",
    icon: "users",
    groups: [
      { hint: "Triagem da DPOC na Atenção Básica: Priorize riscos na chegada ao posto", name: "Consulta de Rotina", color: "var(--gold)", items: ["Checar inalação", "Revisar vacinas", "Avaliar sintomas", "Acolhimento"], didYouKnow: "Um dos papéis cruciais da enfermagem é pedir para o paciente demonstrar como usa a bombinha, corrigindo vícios do dia a dia." },
      { hint: "Ações Imediatas no Alívio da DPOC: Intervenções rápidas de enfermagem", name: "Intervenção Básica", color: "var(--mint)", items: ["Decúbito elevado", "Oxigênio prescrito", "Orientar tosse", "Hidratação oral"], didYouKnow: "A equipe orienta a 'tosse eficaz': tossir de forma curta e controlada evita machucar a garganta e gasta bem menos energia." },
      { hint: "Descubra como a equipe de saúde acompanha de perto a DPOC", name: "Busca Ativa", color: "var(--sky)", items: ["Visita domiciliar", "Telefonemas", "Evitar internação", "Monitorar faltas"], didYouKnow: "Pacientes que recebem ligações e visitas regulares da equipe de saúde têm uma redução gigante nas idas ao pronto-socorro." },
      { hint: "Entenda como o conhecimento e autocuidado liberta", name: "Educação em Saúde", color: "var(--violet)", items: ["Cartilhas visuais", "Linguagem simples", "Checar entendimento", "Envolver família"], didYouKnow: "O 'Letramento em Saúde' é a técnica de usar palavras simples e pedir para o paciente explicar o que entendeu, garantindo o cuidado seguro." }
    ],
  },
  {
    id: "medium-4",
    tier: "medium",
    levelNumber: 4,
    title: "Fase 9: Poluição e El Niño",
    subtitle: "Clima severo e fumaças perigosas",
    icon: "wind",
    groups: [
      { hint: "Entenda o fenômeno - El Niño - que prende a poluição no ar", name: "Inversão Térmica", color: "var(--gold)", items: ["Ar frio retido", "Poluentes no solo", "Piora matinal", "Risco de crise"], didYouKnow: "Em dias frios, a inversão térmica age como uma 'tampa' na cidade, prendendo a fumaça dos carros na exata altura em que respiramos." },
      { hint: "Identifique os riscos da fumaça dentro de casa para pacientes com DPOC", name: "Poluição Doméstica", color: "var(--mint)", items: ["Fogão a lenha", "Querosene", "Uso de incensos", "Falta de ventilação"], didYouKnow: "A fumaça crônica dentro de casa, especialmente de fogões a lenha e querosene, é a principal causa de danos pulmonares na zona rural." },
      { hint: "Descubra como proteger as vias aéreas de pacientes com DPOC no frio", name: "Cuidados no Inverno", color: "var(--sky)", items: ["Cachecol no rosto", "Aquecer o ar", "Evitar friagem", "Roupas em camadas"], didYouKnow: "Respirar o ar muito gelado de uma vez causa um choque nos brônquios. Usar um cachecol sobre a boca ajuda a aquecer o ar." },
      { hint: "Saiba como o calor do El Niño afeta os remédios", name: "Clima e Medicamentos", color: "var(--violet)", items: ["Longe do calor", "Não expor ao sol", "Manter fechado", "Checar validade"], didYouKnow: "Bombinhas pressurizadas deixadas no carro sob o sol escaldante do El Niño podem perder a pressão e entregar a dose errada do remédio." }
    ],
  },
  {
    id: "medium-5",
    tier: "medium",
    levelNumber: 5,
    title: "Fase 10: Vivência Sistêmica",
    subtitle: "As consequências além dos pulmões",
    icon: "alert-triangle",
    groups: [
      { hint: "Entenda a perda silenciosa de energia pelo corpo", name: "Desnutrição", color: "var(--gold)", items: ["Caquexia pulmonar", "Gasto calórico", "Perda muscular", "Hipermetabolismo"], didYouKnow: "Fazer muita força para respirar o dia inteiro gasta tantas calorias que é comum o paciente emagrecer de forma drástica." },
      { hint: "Descubra a conexão vital entre os órgãos", name: "Coração e Pulmão", color: "var(--mint)", items: ["Arritmias", "Pressão alta", "Cor Pulmonale", "Inchaço nas pernas"], didYouKnow: "Quando o pulmão fica muito doente, o coração precisa fazer o dobro de força para bombear sangue, o que pode causar inchaço nas pernas." },
      { hint: "Identifique as ameaças à estrutura do seu corpo", name: "Saúde dos Ossos", color: "var(--sky)", items: ["Uso de corticoide", "Risco de fratura", "Falta de sol", "Sedentarismo"], didYouKnow: "O uso prolongado de corticoides orais, somado à falta de exercícios físicos e pouco sol, enfraquece severamente a estrutura óssea." },
      { hint: "Reconheça os perigos que ocorrem durante a noite", name: "Apneia do Sono", color: "var(--violet)", items: ["Ronco alto", "Despertares súbitos", "Falta de ar noturna", "Risco cardíaco"], didYouKnow: "Ter apneia (paradas respiratórias ao dormir) junto com uma doença pulmonar crônica faz a oxigenação do corpo despencar de madrugada." }
    ],
  },

  // ==========================================
  // 🔴 DIFÍCIL
  // ==========================================
  {
    id: "hard-1",
    tier: "hard",
    levelNumber: 1,
    title: "Fase 11: Exame Clínico",
    subtitle: "O olhar apurado sobre a respiração",
    icon: "chart",
    groups: [
      { hint: "Observe os sinais visíveis da doença crônica pulmonar obstrutiva", name: "Inspeção", color: "var(--gold)", items: ["Tórax em barril", "Tiragem intercostal", "Cianose central", "Baqueteamento digital"], didYouKnow: "O 'tórax em barril' surge porque o paciente não consegue expirar todo o ar, deixando os pulmões hiperinsuflados com o passar dos anos." },
      { hint: "Decifre os sons revelados pelo estetoscópio no exame físico respiratório", name: "Ausculta Pulmonar", color: "var(--mint)", items: ["Murmúrio reduzido", "Sibilos expiratórios", "Estertores", "Tempo expiratório longo"], didYouKnow: "O silêncio na ausculta pulmonar durante uma crise pode ser um péssimo sinal clínico: indica que quase não há mais passagem de ar." },
      { hint: "Identifique as alterações físicas da caixa torácica ao respirar", name: "Percussão e Palpação", color: "var(--sky)", items: ["Hipersonoridade", "Frêmito diminuído", "Expansibilidade baixa", "Baixa excursão base"], didYouKnow: "Ao percutir o tórax enfisematoso, ouve-se um som muito mais oco (hipersonoro) devido à enorme quantidade de ar preso nos alvéolos." },
      { hint: "Reconheça os alertas de falência pulmonar iminente por DPOC", name: "Sinais de Gravidade", color: "var(--violet)", items: ["Uso de escalenos", "Respiração paradoxal", "Confusão mental", "Letargia"], didYouKnow: "A respiração paradoxal (quando a barriga murcha em vez de estufar ao inspirar) indica fadiga extrema e falência do diafragma." }
    ],
  },
  {
    id: "hard-2",
    tier: "hard",
    levelNumber: 2,
    title: "Fase 12: Farmacologia",
    subtitle: "Drogas inalatórias e oxigenoterapia",
    icon: "pill",
    groups: [
      { hint: "Conheça a base do tratamento de DPOC contínuo", name: "Broncodilatadores", color: "var(--gold)", items: ["SABA e LABA", "SAMA e LAMA", "Receptor Beta-2", "Relaxamento muscular"], didYouKnow: "Os agonistas Beta-2 estimulam receptores que relaxam o brônquio, enquanto os anticolinérgicos bloqueiam os receptores que causam a contração." },
      { hint: "Identifique as armas contra a inflamação de pacientes com DPOC", name: "Corticoides", color: "var(--mint)", items: ["Anti-inflamatório", "Inalatório e Oral", "Efeitos sistêmicos", "Risco de candidíase"], didYouKnow: "Após inalar corticoide, é essencial lavar a boca e gargarejar. O resíduo diminui a imunidade local e favorece infecções por fungos." },
      { hint: "Descubra quando combater as bactérias respiratórias", name: "Antibioticoterapia", color: "var(--sky)", items: ["Escarro purulento", "Macrolídeos", "Efeito imunomodulador", "Prevenir resistência"], didYouKnow: "Antibióticos da classe dos macrolídeos (como a azitromicina) são usados muitas vezes pelo seu forte efeito anti-inflamatório, e não apenas para matar bactérias." },
      { hint: "Entenda as regras do suporte de O2 para pacientes com DPOC", name: "Oxigenoterapia", color: "var(--violet)", items: ["O2 domiciliar", "Cânula nasal", "Concentrador", "Saturação 88-92%"], didYouKnow: "Para retentores crônicos de CO2, a saturação alvo de oxigênio não deve chegar a 100%. Níveis muito altos podem desligar o estímulo cerebral para respirar." }
    ],
  },
  {
    id: "hard-3",
    tier: "hard",
    levelNumber: 3,
    title: "Fase 13: Gasometria",
    subtitle: "Desvendando a química do sangue arterial",
    icon: "activity",
    groups: [
      { hint: "Revele os sinais da falta de oxigênio no sangue", name: "Hipoxemia", color: "var(--gold)", items: ["PaO2 baixa", "Saturação < 88%", "Cianose", "Sofrimento celular"], didYouKnow: "Uma pressão de oxigênio (PaO2) abaixo de 60 mmHg em estado de repouso é a principal indicação para prescrever oxigênio contínuo em casa." },
      { hint: "Identifique os perigos da retenção de gases tóxicos", name: "Hipercapnia", color: "var(--mint)", items: ["Retenção de CO2", "PaCO2 > 45", "Narcose por CO2", "Sonolência diurna"], didYouKnow: "Níveis criticamente altos de gás carbônico no sangue agem no sistema nervoso central como um anestésico, levando o paciente à letargia e ao coma." },
      { hint: "Entenda o desequilíbrio que sinaliza emergência respiratória", name: "Acidose Respiratória", color: "var(--sky)", items: ["pH < 7.35", "Falência mecânica", "Fadiga diafragmática", "Emergência médica"], didYouKnow: "Quando a ventilação falha e o CO2 se acumula rapidamente, ele se transforma em ácido, derrubando o pH sanguíneo e indicando necessidade de ventilação mecânica." },
      { hint: "Descubra como o corpo tenta se proteger do sangue ácido", name: "Compensação Renal", color: "var(--violet)", items: ["Reter bicarbonato", "Base Excess alta", "Processo lento", "pH crônico normal"], didYouKnow: "Os rins e os pulmões trabalham juntos. Se a respiração torna o sangue ácido de forma crônica, o rim passa a reter bases (bicarbonato) para neutralizá-lo." }
    ],
  },
  {
    id: "hard-4",
    tier: "hard",
    levelNumber: 4,
    title: "Fase 14: Crises Climáticas",
    subtitle: "O El Niño no contexto de urgência",
    icon: "wind",
    groups: [
      { hint: "Investigue o impacto das ondas de calor no corpo de um paciente com DPOC", name: "Estresse Térmico do El Niño", color: "var(--gold)", items: ["Vasodilatação", "Aumento do débito", "Sobrecarga cardíaca", "Risco de choque"], didYouKnow: "Ondas de calor severas forçam o coração a desviar muito sangue para a pele a fim de tentar resfriá-la, esgotando a reserva de oxigênio do paciente." },
      { hint: "Reconheça o dano microscópico da seca extrema na respiração", name: "Partículas Finas", color: "var(--mint)", items: ["Penetração alveolar", "Estresse oxidativo", "Inflamação sistêmica", "Microtrombose"], didYouKnow: "A fuligem das queimadas impulsionadas pela seca é tão fina (PM2.5) que atravessa os pulmões, cai na corrente sanguínea e desencadeia eventos trombóticos." },
      { hint: "Identifique os passos críticos de um paciente com DPOC na urgência médica", name: "Manejo na Emergência", color: "var(--sky)", items: ["Reposição venosa", "Cuidado com edema", "Monitorar eletrólitos", "Corticoide IV"], didYouKnow: "A reposição agressiva de soro na veia em um idoso que já tem insuficiência do coração direito pode rapidamente causar edema agudo e 'afogar' o pulmão." },
      { hint: "Descubra como o clima agressivo ataca as defesas do sistema respiratório", name: "Fisiopatologia do Clima", color: "var(--violet)", items: ["Vasoespasmo", "Muco viscoso", "Paralisia ciliar", "Infecção secundária"], didYouKnow: "Eventos climáticos extremos e ar seco paralisam os cílios microscópicos da nossa traqueia, que literalmente param de 'varrer' as bactérias para fora do pulmão." }
    ],
  },
  {
    id: "hard-5",
    tier: "hard",
    levelNumber: 5,
    title: "Fase 15: Cuidados Paliativos",
    subtitle: "Dignidade e conforto na fase terminal",
    icon: "shield",
    groups: [
      { hint: "Compreenda a prioridade no tratamento avançado da DPOC", name: "Foco do Cuidado", color: "var(--gold)", items: ["Alívio do sofrimento", "Conforto total", "Qualidade de vida", "Dignidade"], didYouKnow: "Cuidados paliativos não significam 'desistir do paciente', mas sim mudar o foco da cura impossível para a promoção do bem-estar e da dignidade." },
      { hint: "Descubra as táticas para aliviar o terror do sufocamento (falta de ar)", name: "Manejo da Dispneia", color: "var(--mint)", items: ["Morfina baixa dose", "Ventilador no rosto", "Ansiedade controlada", "Benzodiazepínicos"], didYouKnow: "A morfina, em baixas doses guiadas por médicos, atua no cérebro desligando a sensação aterrorizante de sufocamento (conhecida como fome de ar)." },
      { hint: "Identifique as intervenções não invasivas para alívio respiratório", name: "Suporte Compassivo", color: "var(--sky)", items: ["Uso de VNI", "Limitação terapêutica", "Sedação paliativa", "Extubação compassiva"], didYouKnow: "A Ventilação Não Invasiva (VNI/BIPAP) pode ser usada na fase terminal não para curar, mas puramente para diminuir o trabalho respiratório e trazer paz." },
      { hint: "Reconheça a importância de planejar o amanhã de forma lúcida para um paciente com DPOC", name: "Diretivas Antecipadas", color: "var(--violet)", items: ["Testamento vital", "Vontade do paciente", "Reunião familiar", "Processo de luto"], didYouKnow: "Permitir que o paciente decida antecipadamente, de forma clara, se quer ou não ser intubado, garante que seus desejos finais sejam rigorosamente respeitados." }
    ],
  },
];