import { GameProvider } from "@/hooks/use-game";
import GameScreenContent from "./screen";
import "./game-screen.css";

export default function GameScreen() {
  return (
    <GameProvider>
      <GameScreenContent />
    </GameProvider>
  );
}
