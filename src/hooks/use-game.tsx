import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type TScreenStep =
  | "intro1"
  | "intro2"
  | "intro3"
  | "onboarding"
  | "game";
export type TTimerStep = "start" | "pause";

interface GameContextType {
  screenStep: TScreenStep;
  setScreenStep: Dispatch<SetStateAction<TScreenStep>>;
  timerStep: TTimerStep;
  setTimerStep: (step: TTimerStep) => void;
  screenSteps: TScreenStep[];
  togglingStep: () => void;
  assets: typeof assets;
  closeOnboarding: () => void;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const screenSteps: TScreenStep[] = [
  "intro1",
  "intro2",
  "intro3",
  "onboarding",
  "game",
];

const assets = [
  {
    key: "intro1" as TScreenStep,
    src: "/illustration/refrigerator-closed.webp",
  },
  {
    key: "intro2" as TScreenStep,
    src: "/illustration/refrigerator-without-door.webp",
  },
  {
    key: "intro3" as TScreenStep,
    src: "/illustration/refrigerator-naked.webp",
  },
];

export function GameProvider({ children }: { children: ReactNode }) {
  const [screenStep, setScreenStep] = useState<TScreenStep>("intro1");
  const [timerStep, setTimerStep] = useState<TTimerStep>("pause");
  const [time, setTime] = useState<number>(0);

  function togglingStep() {
    setTimerStep(timerStep === "start" ? "pause" : "start");
  }

  function closeOnboarding() {
    setScreenStep("game");
    setTimerStep("start");
  }

  return (
    <GameContext.Provider
      value={{
        screenStep,
        setScreenStep,
        timerStep,
        setTimerStep,
        screenSteps,
        togglingStep,
        assets,
        closeOnboarding,
        time,
        setTime,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameProvider() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
