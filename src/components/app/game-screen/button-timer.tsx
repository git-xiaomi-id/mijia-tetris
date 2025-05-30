import useClickSound from "@/hooks/use-click-sound";
import StartIcon from "../icon/start-icon";
import PauseIcon from "../icon/pause-icon";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PauseHeading from "./pause-heading";
import AppButton from "../button";
import GamePlayIcon from "../icon/game-play";
import GameRestartIcon from "../icon/game-reset";
import GameExitIcon from "../icon/game-exit";

type TStep = "start" | "pause";
type TScreenStep = "intro1" | "intro2" | "intro3" | "onboarding" | "game";

export default function ButtonTimer({
  onClick,
  step,
  screen,
}: {
  onClick?: () => void;
  step: TStep;
  screen: TScreenStep;
}) {
  const { clickPlay } = useClickSound();

  function _onClick() {
    clickPlay();
    if (typeof onClick === "function") onClick();
  }

  return (
    <AlertDialog open={step === "pause" && screen.includes("game")}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          onClick={_onClick}
          className="size-10 aspect-square transition-all active:scale-90"
        >
          {step === "start" ? <PauseIcon size={40} /> : <StartIcon size={40} />}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] max-w-xs rounded-xl">
        <div className="flex flex-col gap-10 items-center">
          <div className="flex flex-col gap-1.5">
            <div className="w-full [&>svg]:w-full">
              <PauseHeading />
            </div>
            <div className="text-center text-lg">
              Permainan dijeda, ayo main lagi!
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full">
            <AppButton variant="blue" onClick={_onClick}>
              <div className="flex items-center gap-3 w-full [&_svg]:size-5">
                <GamePlayIcon />
                <div className="w-full text-center">Lanjut Main</div>
              </div>
            </AppButton>
            <AppButton variant="orange">
              <div className="flex items-center gap-3 w-full [&_svg]:size-5">
                <GameRestartIcon />
                <div className="w-full text-center">Restart Game</div>
              </div>
            </AppButton>
            <AppButton variant="red">
              <div className="flex items-center gap-3 w-full [&_svg]:size-5">
                <GameExitIcon />
                <div className="w-full text-center">Keluar Game</div>
              </div>
            </AppButton>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
