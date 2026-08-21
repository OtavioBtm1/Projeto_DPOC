# RespConex

Jogo de associação de termos sobre DPOC (estilo "Connections"), com tema
visual clínico/enfermagem, responsivo para celular e desktop. Construído
com **React + Vite + Bootstrap**.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Como gerar a versão de produção

```bash
npm run build
npm run preview
```

## Como publicar no Vercel

1. Suba esta pasta para um repositório (GitHub/GitLab).
2. Em vercel.com → "Add New Project" → importe o repositório.
3. Framework Preset: **Vite** (o Vercel detecta automaticamente).
4. Deploy.

Alternativa rápida: `npx vercel` dentro desta pasta (com a Vercel CLI
instalada).

## Estrutura do projeto

```
src/
  main.jsx                 # ponto de entrada, importa estilos e monta o App
  App.jsx                  # decide qual tela mostrar, com base no GameContext

  context/
    GameContext.jsx        # estado global: tela ativa, dificuldade, tema escolhido

  hooks/
    usePuzzle.js            # toda a lógica de uma rodada (seleção, acertos,
                             # erros, vidas, vitória/derrota)

  data/
    themes.js               # os 3 blocos de conteúdo do jogo (grupos de termos)
    difficulties.js          # configuração de fácil/médio/difícil

  utils.js                  # função de embaralhar (shuffle)

  components/
    layout/
      EcgSignature.jsx       # linha de ECG animada (assinatura visual)
      TopBar.jsx             # cabeçalho com nome do app e botão de menu
    menu/
      MainMenu.jsx           # tela inicial
      MenuButton.jsx         # botão reutilizável do menu
    difficulty/
      DifficultyScreen.jsx   # tela de escolha de dificuldade
      DifficultyCard.jsx     # card de cada dificuldade
    themes/
      ThemeScreen.jsx        # tela de escolha de tema/bloco de conteúdo
      ThemeCard.jsx          # card de cada tema
    howto/
      HowToScreen.jsx        # tela "Como jogar"
      HowToStep.jsx          # cada passo numerado
    about/
      AboutScreen.jsx        # tela "Sobre o projeto"
      AboutBlock.jsx         # cada bloco de texto
    game/
      GameScreen.jsx         # tela principal do jogo (usa o hook usePuzzle)
      Tile.jsx                # cada peça do tabuleiro
      SolvedBand.jsx          # faixa de grupo resolvido
      LivesIndicator.jsx      # indicador de vidas restantes
    result/
      ResultScreen.jsx        # tela de vitória/derrota
    shared/
      LungIcon.jsx            # ícone de pulmão em SVG (usado nas vidas)

  styles/
    theme.css                # variáveis de cor/fonte e reset
    screens.css               # layout geral, menu, sub-telas, botões
    game.css                  # tabuleiro, peças, vidas, faixas de grupo
```

## Onde mexer em cada coisa

- **Trocar/adicionar termos do jogo** → `src/data/themes.js`
- **Mudar regras de vidas por dificuldade** → `src/data/difficulties.js`
- **Mudar cores/fontes** → `src/styles/theme.css` (variáveis `:root`)
- **Mudar a lógica do jogo (como pontos são verificados, etc.)** →
  `src/hooks/usePuzzle.js`
- **Adicionar uma tela nova** → criar o componente em `src/components/`,
  registrar em `SCREENS` dentro de `src/App.jsx`, e navegar até ela com
  `goTo("nome-da-tela")` (disponível via `useGame()`)

## Próximos passos sugeridos

- Persistência de progresso (ex: histórico de partidas)
- Tela de estatísticas por tema
- Sons/feedback tátil ao acertar ou errar
- Validação de conteúdo pela professora antes de qualquer uso com pacientes reais
