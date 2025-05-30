import useClickSound from "@/hooks/use-click-sound";
import StartIcon from "../icon/start-icon";
import PauseIcon from "../icon/pause-icon";

type TStep = "start" | "pause";

export default function ButtonTimer({
  onClick,
  step,
}: {
  onClick?: () => void;
  step: TStep;
}) {
  const { clickPlay } = useClickSound();

  function _onClick() {
    clickPlay();
    if (typeof onClick === "function") onClick();
  }

  return (
    <button
      type="button"
      onClick={_onClick}
      className="size-10 aspect-square transition-all active:scale-90"
    >
      {step === "start" ? <PauseIcon size={40} /> : <StartIcon size={40} />}
    </button>
  );
}
