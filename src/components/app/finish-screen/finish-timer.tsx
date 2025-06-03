import { useGameProvider } from "@/hooks/use-game";
import { formatTime } from "@/utils/format-time";

export default function FinishTimer() {
  const { time } = useGameProvider();

  return (
    <div className="fs-timer-area">
      <div className="fs-time-box">
        <div className="text-white text-2xl font-[450]">{formatTime(time)}</div>
      </div>
      <div className="fs-icon-clock">
        <img alt="icon-clock" src="/icon/icon-clock.webp" />
      </div>
    </div>
  );
}
