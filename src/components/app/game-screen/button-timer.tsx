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
    <button type="button" onClick={_onClick} className="size-8 aspect-square">
      {step === "start" ? <PauseIcon /> : <StartIcon />}
    </button>
  );
}
