import { getCookie, KEY_ONBOARDING } from "@/lib/utils";
import {
  createContext,
  useContext,
  useEffect,
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
  runScenario: () => void;
  onboardingStep: number;
  setOnboardingStep: Dispatch<SetStateAction<number>>;
  onboardingOpen: boolean;
  setOnboardingOpen: Dispatch<SetStateAction<boolean>>;
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
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [onboardingOpen, setOnboardingOpen] = useState<boolean>(false);

  function togglingStep() {
    setTimerStep(timerStep === "start" ? "pause" : "start");
  }

  function closeOnboarding() {
    setScreenStep("game");
    setTimerStep("start");
  }

  function runScenario() {
    const interval = setInterval(() => {
      setScreenStep((prev: TScreenStep) => {
        const currentIndex = screenSteps.findIndex((step) => step === prev);
        if (currentIndex === screenSteps.length - 2) {
          clearInterval(interval);
          return prev; // Stop at the last step
        }
        // Check if next step is onboarding and if onboarding cookie is true
        const nextStep = screenSteps[currentIndex + 1];

        if (nextStep === "onboarding" && getCookie(KEY_ONBOARDING) === "true") {
          clearInterval(interval);
          return prev; // Stay at current step if onboarding is already done
        }

        return nextStep as TScreenStep;
      });
    }, 1500);
  }

  useEffect(() => {
    if (screenStep === "onboarding") setOnboardingOpen(true);
    else setOnboardingOpen(false);
  }, [screenStep]);

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
        runScenario,
        onboardingStep,
        setOnboardingStep,
        onboardingOpen,
        setOnboardingOpen,
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
