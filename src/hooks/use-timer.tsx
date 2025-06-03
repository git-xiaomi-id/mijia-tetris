import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type TTimerStep = "start" | "pause";

interface TimerContextType {
  timerStep: TTimerStep;
  setTimerStep: (step: TTimerStep) => void;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  togglingStep: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timerStep, setTimerStep] = useState<TTimerStep>("pause");
  const [time, setTime] = useState<number>(0);

  function togglingStep() {
    setTimerStep(timerStep === "start" ? "pause" : "start");
  }

  return (
    <TimerContext.Provider
      value={{
        timerStep,
        setTimerStep,
        time,
        setTime,
        togglingStep,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
