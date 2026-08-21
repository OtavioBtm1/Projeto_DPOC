import { useGame } from "./context/GameContext";
import EcgSignature from "./components/layout/EcgSignature";
import TopBar from "./components/layout/TopBar";
import MainMenu from "./components/menu/MainMenu";
import DifficultyScreen from "./components/difficulty/DifficultyScreen";
import ThemeScreen from "./components/themes/ThemeScreen";
import HowToScreen from "./components/howto/HowToScreen";
import AboutScreen from "./components/about/AboutScreen";
import GameScreen from "./components/game/GameScreen";
import ResultScreen from "./components/result/ResultScreen";
import ProfileScreen from "./components/profile/ProfileScreen";
import LibraryScreen from "./components/profile/LibraryScreen";
import AchievementPopup from "./components/profile/AchievementPopup";
import RankingScreen from "./components/ranking/RankingScreen";

const SCREENS = {
  menu: MainMenu,
  difficulty: DifficultyScreen,
  themes: ThemeScreen,
  howto: HowToScreen,
  about: AboutScreen,
  game: GameScreen,
  result: ResultScreen,
  profile: ProfileScreen,
  library: LibraryScreen,
  ranking: RankingScreen,
};

export default function App() {
  const { screen, heartRate } = useGame();
  const ActiveScreen = SCREENS[screen] ?? MainMenu;

  return (
    <div className="app">
      <AchievementPopup />
      <div className={`danger-overlay danger-overlay--${heartRate}`} />

      <EcgSignature heartRate={heartRate} />
      <TopBar />
      <ActiveScreen key={screen} />
    </div>
  );
}