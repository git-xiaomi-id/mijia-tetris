import { useGameProvider } from "@/hooks/use-game";
import ButtonTimer from "./button-timer";
import GameTimer from "./game-timer";
import { useState } from "react";

export default function TimeSet() {
  const { timerStep } = useGameProvider();
  const [time, setTime] = useState<number>(0);
  return (
    <>
      <GameTimer time={time} setTime={setTime} timerStep={timerStep} />
      <ButtonTimer />
    </>
  );
}
