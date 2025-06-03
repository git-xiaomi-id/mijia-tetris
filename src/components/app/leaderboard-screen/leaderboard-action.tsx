import { useAppProvider } from "@/hooks/use-context";
import { useGameProvider } from "@/hooks/use-game";
import { RotateCw } from "lucide-react";
import { useNavigate } from "react-router";
import AppButton from "../button";
import FinishHome from "../finish-screen/icons/finish-home";

export default function LeaderboardAction() {
  const navigate = useNavigate();
  const {
    setTime,
    setTimerStep,
    setScreenStep,
    setOnboardingStep,
    runScenario,
  } = useGameProvider();
  const { setScreen } = useAppProvider();

  function doResetGame() {
    setTime(0);
    setTimerStep("pause");
    setScreenStep("intro1");
    setOnboardingStep(0);
  }

  function doRestartGame() {
    doResetGame();
    runScenario();
    setScreen("game");
    navigate("/");
  }

  function goHome() {
    doResetGame();
    setScreen("welcome");
    navigate("/");
  }

  return (
    <div className="ls-action">
      <AppButton variant="orange" className="flex-1" onClick={doRestartGame}>
        <div className="flex items-center gap-2.5 w-full [&_svg]:size-6">
          <RotateCw className="flex-shrink-0 -rotate-90" />
          <div className="text-center text-base">Main lagi</div>
        </div>
      </AppButton>
      <AppButton variant="blue" className="flex-1" onClick={goHome}>
        <div className="flex items-center gap-2.5 w-full [&_svg]:size-6">
          <FinishHome />
          <div className="text-center text-base">Ke Home</div>
        </div>
      </AppButton>
    </div>
  );
}
