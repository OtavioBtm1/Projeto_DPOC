# 🫁 RespConex — Jogo Educativo sobre DPOC

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> **Conscientização e educação em saúde respiratória através da gamificação.**

O **RespConex** é uma aplicação web interativa e gamificada (inspirada na mecânica de associação lógica em grupos, estilo *Connections*) desenvolvida para apresentação em um Summit Universitário de Saúde. O objetivo do projeto é transformar o ensino e a conscientização sobre a **DPOC (Doença Pulmonar Obstrutiva Crônica)** e outras condições respiratórias crônicas em uma experiência leve, acessível e dinâmica.

🔗 **[Acesse a demonstração ao vivo aqui](#)** *(Substitua pelo link da Vercel/Netlify)*

---

## ✨ Funcionalidades Principais

* 🧩 **Motor de Puzzle Associativo:** Tabuleiro interativo onde o jogador deve identificar e agrupar blocos de termos clínicos, sintomas, fatores de risco, prevenção e tratamentos em categorias correspondentes (`Tile` e `SolvedBand`)[cite: 1].
* 🫁 **Sistema de Vidas Temático:** Indicador visual de tentativas baseado na saúde pulmonar (`LivesIndicator`), com feedback visual dinâmico em estados críticos de alerta (`danger.css`)[cite: 1].
* 🏆 **Gamificação Completa (Ranks & Conquistas):** Sistema de evolução de patentes (`ranks.js`) e desbloqueio de medalhas em tempo real com notificações animadas (`AchievementBanner`, `AchievementPopup` e `AchievementBadge`)[cite: 1].
* 🌍 **Placar Global & Autenticação:** Integração em nuvem para criação de conta/login (`AuthModal`) e sincronização de pontuação em um *Leaderboard* competitivo (`RankingScreen`)[cite: 1].
* 📚 **Biblioteca Educativa & Níveis de Dificuldade:** Trilhas temáticas sobre saúde respiratória (`ThemeScreen`), seleção de complexidade (`DifficultyScreen`) e acervo de consulta para revisão dos conceitos aprendidos (`LibraryScreen`)[cite: 1].
* 📱 **Progressive Web App (PWA):** Suporte para instalação direta na tela inicial de smartphones (Android/iOS) sem necessidade de lojas de aplicativos, incluindo modal com guia passo a passo nativo (`InstallGuideModal` e `manifest.json`)[cite: 1].
* 🎵 **Imersão Audiovisual:** Identidade visual clínica com assinatura de eletrocardiograma (`EcgSignature`), efeitos sonoros interativos e trilha sonora de fundo dedicada controlada por um gerenciador de áudio próprio (`audio.js` e `musica.mp3`)[cite: 1].

---

## 🛠️ Tecnologias e Arquitetura

O projeto foi construído priorizando performance em dispositivos móveis (*Mobile-First*), desacoplamento de responsabilidades e facilidade de manutenção[cite: 1]:

* **Front-end:** React.js (JSX) com empacotamento rápido via **Vite** (`vite.config.js`)[cite: 1].
* **Gerenciamento de Estado:** **React Context API** (`GameContext.jsx`) aliada a **Custom Hooks** (`useGame.js` e `usePuzzle.js`) para isolar a regra de negócios do jogo da camada de interface[cite: 1].
* **Back-end as a Service (BaaS):** **Supabase** (`utils/supabase.js`) para autenticação de jogadores e persistência de dados do ranking e perfil[cite: 1].
* **Estilização:** CSS3 modularizado e dividido por contextos de tela e estado (`theme.css`, `game.css`, `screens.css`, `danger.css`)[cite: 1].
* **Capacidades Mobile:** Configuração de `manifest.json` e ícones de alta resolução (`192x192` e `512x512`) para comportamento de aplicativo nativo[cite: 1].

---

## 📂 Estrutura do Repositório

```text
Projeto_DPOC/
├── public/ / root
│   ├── icon-192x192.png          # Ícone PWA (192px)
│   ├── icon-512x512.png          # Ícone PWA (512px)
│   ├── index.html                # Entry point HTML
│   └── manifest.json             # Manifesto de configuração PWA
├── src/
│   ├── assets/
│   │   └── musica.mp3            # Trilha sonora de background
│   ├── components/
│   │   ├── about/                # Telas e blocos informativos sobre o projeto/DPOC
│   │   ├── common/               # Banners de conquistas globais
│   │   ├── difficulty/           # Seleção e cards de nível de dificuldade
│   │   ├── game/                 # Core da partida (GameScreen, Tile, SolvedBand, LivesIndicator)
│   │   ├── howto/                # Tutorial interativo passo a passo (HowToScreen, HowToStep)
│   │   ├── layout/               # Componentes estruturais (TopBar, EcgSignature)
│   │   ├── menu/                 # Menu principal, guia de instalação PWA e Changelog
│   │   ├── profile/              # Perfil, modal de Auth, conquistas e Biblioteca de estudo
│   │   ├── ranking/              # Placar de líderes global (RankingScreen)
│   │   ├── result/               # Resumo de desempenho pós-partida (ResultScreen)
│   │   ├── shared/               # Ícones vetorizados customizados (LungIcon, ThemeIcon)
│   │   └── themes/               # Seleção de módulos e temas clínicos
│   ├── context/
│   │   └── GameContext.jsx       # Provedor global de estado da aplicação
│   ├── data/
│   │   ├── achievements.js       # Regras e metadados de conquistas
│   │   ├── difficulties.js       # Parâmetros de dificuldade das rodadas
│   │   └── themes.js             # Banco de palavras, categorias e conteúdos de DPOC
│   ├── hooks/
│   │   ├── useGame.js            # Hook de acesso ao contexto e fluxo do jogo
│   │   └── usePuzzle.js          # Motor de embaralhamento, validação e estado do tabuleiro
│   ├── styles/
│   │   ├── danger.css            # Animações e alertas visuais de estado crítico
│   │   ├── game.css              # Layout do tabuleiro e animações de peças
│   │   ├── screens.css           # Estilização das telas de navegação e modais
│   │   └── theme.css             # Variáveis globais de cores, fontes e tema clínico
│   ├── utils/
│   │   ├── audio.js              # Controlador de efeitos sonoros e música
│   │   ├── ranks.js              # Cálculo de experiência e patentes dos jogadores
│   │   └── supabase.js           # Cliente e métodos de integração com o Supabase
│   ├── App.jsx                   # Roteamento de telas e composição de layout
│   ├── main.jsx                  # Inicialização do React DOM
│   └── utils.js                  # Funções utilitárias auxiliares
├── package.json                  # Dependências e scripts do projeto
└── vite.config.js                # Configuração de build do Vite
