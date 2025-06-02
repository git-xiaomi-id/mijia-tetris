import { useAppProvider } from "@/hooks/use-context";
import { useGameProvider } from "@/hooks/use-game";
import { RotateCw } from "lucide-react";
import { NavLink } from "react-router";
import AppButton from "../button";
import FinishChart from "./icons/finish-chart";
import FinishHome from "./icons/finish-home";
import FinishShare from "./icons/finish-share";
import FinishShareIG from "./finish-share-ig";

export default function FinishScreenAction() {
  const {
    setTime,
    setTimerStep,
    setScreenStep,
    runScenario,
    setOnboardingStep,
  } = useGameProvider();
  const { setScreen } = useAppProvider();
  const { generateUltraQualityImage } = FinishShareIG();

  function doResetGame() {
    setTime(0);
    setTimerStep("pause");
    setScreenStep("intro1");
    setOnboardingStep(0);
  }

  function doRestartGame() {
    doResetGame();
    runScenario();
  }

  function doExitGame() {
    doResetGame();
    setScreen("welcome");
  }

  async function doShareIG() {
    await generateUltraQualityImage();
  }

  return (
    <div className="finish-screen-action flex flex-col gap-5 w-full">
      <div className="flex gap-2.5 items-center w-full">
        <AppButton variant="orange" onClick={doRestartGame} size="sm">
          <div className="flex items-center gap-2.5 w-full [&_svg]:size-6">
            <RotateCw className="flex-shrink-0 -rotate-90" />
            <div className="text-center text-[20px]">Main lagi</div>
          </div>
        </AppButton>
        <AppButton variant="blue" onClick={doShareIG} size="sm">
          <div className="flex items-center gap-2.5 w-full [&_svg]:size-6">
            <FinishShare />
            <div className="text-center text-[20px]">Share ke IG</div>
          </div>
        </AppButton>
      </div>
      <NavLink to="/leaderboard">
        <AppButton variant="white" className="w-full">
          <div className="flex items-center justify-center gap-2.5 w-full [&_svg]:size-6">
            <FinishChart />
            <div className="text-center text-[20px]">Lihat Klasemen</div>
          </div>
        </AppButton>
      </NavLink>
      <AppButton variant="red" onClick={doExitGame} className="w-full">
        <div className="flex items-center justify-center gap-2.5 w-full [&_svg]:size-6">
          <FinishHome />
          <div className="text-center text-[20px]">Kembali ke Home</div>
        </div>
      </AppButton>
    </div>
  );
}
