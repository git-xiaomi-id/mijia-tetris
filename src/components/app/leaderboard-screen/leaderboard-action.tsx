import { useAppProvider } from "@/hooks/use-context";
import { useGameProvider } from "@/hooks/use-game";
import { RotateCw } from "lucide-react";
import { useNavigate } from "react-router";
import AppButton from "../button";
import FinishHome from "../finish-screen/icons/finish-home";
import AppModal from "../welcome-screen/modal";
import { useState } from "react";

export default function LeaderboardAction() {
  const navigate = useNavigate();
  const { runScenario, doResetGame } = useGameProvider();
  const { setScreen, gamesCount } = useAppProvider();
  const [modal, setModal] = useState<boolean>(false);

  function doRestartGame() {
    doResetGame();
    runScenario();
    setScreen("game");
    navigate("/");
  }

  function checkChances() {
    if (gamesCount >= 3) {
      setModal(true);
    } else {
      doRestartGame();
    }
  }

  function goHome() {
    doResetGame();
    setScreen("welcome");
    navigate("/");
  }

  return (
    <div className="ls-action">
      <AppButton variant="orange" className="flex-1" onClick={checkChances}>
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
      {modal && (
        <AppModal
          open={modal}
          title="Kesempatan main habis"
          description="Kamu sudah menghabiskan semua kesempatan main hari ini. Kembali lagi besok untuk mendapatkan 3 kesempatan main tambahan."
          image="/mi-bunny/mi-bunny-cry.webp"
          animationImage="animate-headshaking"
          textConfirm="Oke, mengerti"
          onOpenChange={setModal}
        />
      )}
    </div>
  );
}
