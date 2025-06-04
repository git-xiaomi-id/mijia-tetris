// import { GameProvider } from "@/hooks/use-game";
import FinishScreenAction from "./finish-screen-action";
import FinishScreenView from "./finish-screen-view";
import "./finish-screen.css";

export default function FinishScreen() {
  return (
    // <GameProvider>
    <div className="finish-screen">
      <FinishScreenView />
      <FinishScreenAction />
    </div>
    // </GameProvider>
  );
}
