import { useGameProvider } from "@/hooks/use-game";
import { useEffect } from "react";

export default function GameTimer() {
  //   const [_step, setStep] = useState<TStep>("pause");
  //   const [time, setTime] = useState<number>(0);

  const { time, setTime, timerStep } = useGameProvider();

  //   useEffect(() => {
  //     setStep(step || "pause");
  //   }, [step]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (timerStep === "start") {
      interval = setInterval(() => {
        setTime((time: number) => time + 1);
      }, 1000);
    } else if (timerStep === "pause") {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerStep]);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Menambahkan leading zero jika kurang dari 10
    const formatNumber = (num: number): string => {
      return num.toString().padStart(2, "0");
    };

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      seconds
    )}`;
  };

  return (
    <div className="gs-timer-area">
      <div className="gs-time-box">
        <div className="text-white text-sm font-[450]">{formatTime(time)}</div>
      </div>
      <div className="gs-icon-clock">
        <img alt="icon-clock" src="/icon/icon-clock.webp" />
      </div>
    </div>
  );
}
