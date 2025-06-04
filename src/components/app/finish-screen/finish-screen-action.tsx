import { useAppProvider } from "@/hooks/use-context";
import { useGameProvider } from "@/hooks/use-game";
import { RotateCw } from "lucide-react";
import { NavLink } from "react-router";
import AppButton from "../button";
import FinishChart from "./icons/finish-chart";
import FinishHome from "./icons/finish-home";
import FinishShare from "./icons/finish-share";
import FinishShareIG from "./finish-share-ig";
import { useState } from "react";
import AppModal from "../welcome-screen/modal";

export default function FinishScreenAction() {
  const [modal, setModal] = useState<"alert" | "empty" | "">("");
  const { time, runScenario, doResetGame } = useGameProvider();
  const { user, setScreen, gamesCount } = useAppProvider();
  const { generateUltraQualityImage } = FinishShareIG({
    time,
    username: user?.username_ig,
  });

  function doRestartGame() {
    if (gamesCount >= 3) {
      setModal("empty");
      return;
    }
    setScreen("game");
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

  function doAlertRestart() {
    setModal("alert");
  }

  function onCloseModal() {
    setModal("");
  }

  return (
    <div className="finish-screen-action flex flex-col gap-5 w-full">
      <div className="flex gap-2.5 items-center w-full">
        <AppButton variant="orange" onClick={doAlertRestart} size="md">
          <div className="flex items-center gap-2.5 w-full [&_svg]:size-6">
            <RotateCw className="flex-shrink-0 -rotate-90" />
            <div className="text-center text-[20px]">Main lagi</div>
          </div>
        </AppButton>
        <AppButton variant="blue" onClick={doShareIG} size="md">
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
      {modal === "alert" && (
        <AppModal
          open={modal === "alert"}
          title="Kamu yakin mau main lagi?"
          description="Setiap bermain akan mengurangi 1 kesempatan main. Manfaatkan 3 kesempatan main setiap harinya dengan efektif!"
          image="/mi-bunny/mi-bunny-fun.webp"
          animationImage="animate-headshaking"
          textConfirm="Lanjut main"
          textCancel="Batal main"
          onOpenChange={onCloseModal}
          onCancelClick={onCloseModal}
          onConfirmClick={doRestartGame}
        />
      )}
      {modal === "empty" && (
        <AppModal
          open={modal === "empty"}
          title="Kesempatan main habis"
          description="Kamu sudah menghabiskan semua kesempatan main hari ini. Kembali lagi besok untuk mendapatkan 3 kesempatan main tambahan."
          image="/mi-bunny/mi-bunny-cry.webp"
          animationImage="animate-headshaking"
          textConfirm="Oke, mengerti"
          onOpenChange={onCloseModal}
          onCancelClick={onCloseModal}
        />
      )}
    </div>
  );
}
