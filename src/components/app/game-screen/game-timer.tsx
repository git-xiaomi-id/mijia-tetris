import { useEffect, useState } from "react";

type TStep = "start" | "pause";

export default function GameTimer({ step }: { step?: TStep }) {
  const [_step, setStep] = useState<TStep>("pause");
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    setStep(step || "pause");
  }, [step]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (_step === "start") {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (_step === "pause") {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [_step]);

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
