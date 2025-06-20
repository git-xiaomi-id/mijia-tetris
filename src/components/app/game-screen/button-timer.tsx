import useClickSound from "@/hooks/use-click-sound";
import StartIcon from "../icon/start-icon";
import PauseIcon from "../icon/pause-icon";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import PauseHeading from "./pause-heading";
import AppButton from "../button";
import GamePlayIcon from "../icon/game-play";
import GameRestartIcon from "../icon/game-reset";
import GameExitIcon from "../icon/game-exit";
import { useState } from "react";
import { useGameProvider } from "@/hooks/use-game";
import { useAppProvider } from "@/hooks/use-context";
import RestartGameHeading from "./restart-game-heading";
import ExitGameHeading from "./exit-game-heading";
import AppModal from "../welcome-screen/modal";

export default function ButtonTimer() {
  const {
    screenStep,
    timerStep,
    togglingStep,
    runScenario,
    doResetGame,
    saveGameProgress,
  } = useGameProvider();
  const { setScreen, gamesCount } = useAppProvider();

  const { clickPlay } = useClickSound();
  const [pop, setPop] = useState<"exit" | "restart" | "">("");
  const [chanceModal, setChanceModal] = useState(false);

  function _onClick() {
    clickPlay();
    // if (typeof onClick === "function") onClick();
    togglingStep();
  }

  function popExit() {
    setPop("exit");
  }

  function popRestart() {
    setPop("restart");
  }

  function callReset(callback?: () => void) {
    doResetGame(callback);
    setPop("");
  }

  function doExitGame() {
    saveGameProgress();
    if (gamesCount >= 3) {
      setChanceModal(true);
    } else {
      callReset(() => setScreen("welcome"));
    }
  }

  function doRestartGame() {
    saveGameProgress();
    if (gamesCount >= 3) {
      setChanceModal(true);
    } else {
      callReset(() => runScenario());
    }
  }

  function closeChanceModal() {
    setChanceModal(false);

    if (pop === "exit") {
      callReset(() => setScreen("welcome"));
    } else if (pop === "restart") {
      callReset(() => runScenario());
    }
  }

  return (
    <>
      <AlertDialog
        open={timerStep === "pause" && screenStep?.includes("game") && !pop}
      >
        <AlertDialogTrigger asChild>
          <button
            type="button"
            onClick={_onClick}
            className="size-10 aspect-square transition-all active:scale-90 absolute right-0 -bottom-7"
          >
            {timerStep === "start" ? (
              <PauseIcon size={40} />
            ) : (
              <StartIcon size={40} />
            )}
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[90%] max-w-sm rounded-xl">
          <div className="flex flex-col gap-10 items-center">
            <div className="flex flex-col gap-1.5">
              <AlertDialogTitle className="w-full [&>svg]:w-full">
                <PauseHeading />
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-lg">
                Permainan dijeda, ayo main lagi!
              </AlertDialogDescription>
            </div>
            <div className="flex flex-col gap-6 w-full">
              <AppButton variant="blue" onClick={_onClick}>
                <div className="flex items-center gap-3 w-full [&_svg]:size-5">
                  <GamePlayIcon />
                  <div className="w-full text-center">Lanjut Main</div>
                </div>
              </AppButton>
              <AppButton variant="orange" onClick={popRestart}>
                <div className="flex items-center gap-3 w-full [&_svg]:size-5">
                  <GameRestartIcon />
                  <div className="w-full text-center">Restart Game</div>
                </div>
              </AppButton>
              <AppButton variant="red" onClick={popExit}>
                <div className="flex items-center gap-3 w-full [&_svg]:size-5">
                  <GameExitIcon />
                  <div className="w-full text-center">Keluar Game</div>
                </div>
              </AppButton>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={pop === "restart"}
        onOpenChange={(e) => setPop(e ? "restart" : "")}
      >
        <AlertDialogContent className="w-[90%] max-w-sm rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle hidden>Restart Game</AlertDialogTitle>
            <div className="size-[120px] mx-auto relative animate-headscaling">
              <img
                alt="restart-illustration"
                src="/mi-bunny/mi-bunny-shock.webp"
                className="size-full object-contain"
              />
            </div>
            <div className="w-full [&>svg]:w-full">
              <RestartGameHeading />
            </div>
            <AlertDialogDescription className="text-center text-lg">
              Yakin mau restart game? Kamu akan menggunakan 1 kesempatan main.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row gap-6 w-full">
            <AlertDialogCancel noBaseClass asChild>
              <AppButton variant="white">Batal</AppButton>
            </AlertDialogCancel>
            <AppButton variant="orange" onClick={doRestartGame}>
              Ya, Restart
            </AppButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={pop === "exit"}
        onOpenChange={(e) => setPop(e ? "exit" : "")}
      >
        <AlertDialogContent className="w-[90%] max-w-sm rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle hidden>Exit Game</AlertDialogTitle>
            <div className="size-[120px] mx-auto relative animate-headshaking">
              <img
                alt="exit-illustration"
                src="/mi-bunny/mi-bunny-cry.webp"
                className="size-full object-contain"
              />
            </div>
            <div className="w-full [&>svg]:w-full">
              <ExitGameHeading />
            </div>
            <AlertDialogDescription className="text-center text-lg">
              Yakin mau keluar dari game? Kamu akan menggunakan 1 kesempatan
              main.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row gap-6 w-full">
            <AlertDialogCancel noBaseClass asChild>
              <AppButton variant="white">Batal</AppButton>
            </AlertDialogCancel>
            <AppButton variant="red" onClick={doExitGame}>
              Ya, Keluar
            </AppButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AppModal
        open={chanceModal}
        title="Kesempatan main habis"
        description="Kamu sudah menghabiskan semua kesempatan main hari ini. Kembali lagi besok untuk mendapatkan 3 kesempatan main tambahan."
        image="/mi-bunny/mi-bunny-cry.webp"
        animationImage="animate-headshaking"
        textConfirm="Oke, mengerti"
        onOpenChange={closeChanceModal}
        onCancelClick={closeChanceModal}
      />
    </>
  );
}
