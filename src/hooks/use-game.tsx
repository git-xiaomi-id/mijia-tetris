import refrigeratorItems, {
  rackArea,
  type IItemPlaced,
} from "@/lib/refrigerator-items";
import { getCookie, KEY_ONBOARDING, setCookie } from "@/lib/utils";
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
  hasOnboarding: boolean;
  setHasOnboarding: Dispatch<SetStateAction<boolean>>;
  itemActive: string | null;
  setItemActive: Dispatch<SetStateAction<string | null>>;
  areaActive: (typeof rackArea)[0] | null;
  setAreaActive: Dispatch<SetStateAction<(typeof rackArea)[0] | null>>;
  topItem: typeof refrigeratorItems | [];
  setTopItem: Dispatch<SetStateAction<typeof refrigeratorItems | []>>;
  bottomItem: typeof refrigeratorItems | [];
  setBottomItem: Dispatch<SetStateAction<typeof refrigeratorItems | []>>;
  doResetGame: () => void;
  placeItem: (rowIndex: number, colIndex: number) => void;
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

// const area = ["top-left", "top-right", "top-middle1", "top-middle2", "top-middle3", "middle-left", "middle-right", ""]

export function GameProvider({ children }: { children: ReactNode }) {
  const [screenStep, setScreenStep] = useState<TScreenStep>("intro1");
  const [timerStep, setTimerStep] = useState<TTimerStep>("pause");
  const [time, setTime] = useState<number>(0);
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [onboardingOpen, setOnboardingOpen] = useState<boolean>(false);
  const [hasOnboarding, setHasOnboarding] = useState<boolean>(
    getCookie(KEY_ONBOARDING) === "true"
  );
  const [topItem, setTopItem] = useState<typeof refrigeratorItems | []>([]);
  const [bottomItem, setBottomItem] = useState<typeof refrigeratorItems | []>(
    []
  );
  const [itemActive, setItemActive] = useState<string | null>(null);
  const [areaActive, setAreaActive] = useState<(typeof rackArea)[0] | null>(
    null
  );

  function shuffleItems() {
    const shuffledItems = [...refrigeratorItems].sort(
      () => Math.random() - 0.5
    );
    const halfLength = Math.floor(shuffledItems.length / 2);

    setTopItem(shuffledItems.slice(0, halfLength));
    setBottomItem(shuffledItems.slice(halfLength));
  }

  useEffect(() => {
    shuffleItems();
  }, []);

  function togglingStep() {
    setTimerStep(timerStep === "start" ? "pause" : "start");
  }

  function closeOnboarding() {
    setScreenStep("game");
    setTimerStep("start");
    setOnboardingOpen(false);

    if (hasOnboarding) {
      setHasOnboarding(true);
      setCookie(KEY_ONBOARDING, "true");
    }
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

        if (nextStep === "onboarding" && hasOnboarding) {
          clearInterval(interval);
          closeOnboarding();
          return "game"; // Stay at current step if onboarding is already done
        }

        return nextStep as TScreenStep;
      });
    }, 1500);
  }

  useEffect(() => {
    if (screenStep === "onboarding") setOnboardingOpen(true);
    else setOnboardingOpen(false);
  }, [screenStep]);

  function doResetGame() {
    setTime(0);
    setTimerStep("pause");
    setScreenStep("intro1");
    setOnboardingStep(0);
    setAreaActive(null);

    shuffleItems();
  }

  function placeItem(rowIndex: number, colIndex: number) {
    console.log("handleGridClick: ", { rowIndex, colIndex, itemActive });

    if (!itemActive || !areaActive) return;

    const item = [...topItem, ...bottomItem].find((i) => i.id === itemActive);
    if (!item) return;

    // Check if the item can be placed in this area
    if (item.rack !== areaActive.area) return;

    // Create a copy of the items array
    const newItems = areaActive.items.map((row) => [...row]);

    // Check if the space is available
    const canPlace = checkSpaceAvailability(newItems, rowIndex, colIndex, item);
    if (!canPlace) return;

    // Place the item
    const placedItem: IItemPlaced = {
      id: item.id,
      name: item.name,
      image: item.image.startsWith("/") ? item.image : `/${item.image}`,
      amount: 1,
    };

    // Update the grid with the placed item
    for (let i = 0; i < item.blockHeight; i++) {
      for (let j = 0; j < item.blockWidth; j++) {
        if (
          rowIndex + i < newItems.length &&
          colIndex + j < newItems[0].length
        ) {
          newItems[rowIndex + i][colIndex + j] = placedItem;
        }
      }
    }

    // Update the area's items
    setAreaActive({
      ...areaActive,
      items: newItems,
    });

    // Update item quantity in topItem or bottomItem
    if (item.dock === "top") {
      setTopItem((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, totalQty: Math.max(0, i.totalQty - 1) } : i
        )
      );
    } else {
      setBottomItem((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, totalQty: Math.max(0, i.totalQty - 1) } : i
        )
      );
    }

    // Deselect the item
    setItemActive(null);
  }

  function checkSpaceAvailability(
    grid: (IItemPlaced | null)[][],
    rowIndex: number,
    colIndex: number,
    item: (typeof refrigeratorItems)[0]
  ): boolean {
    // Check if the space is available
    for (let i = 0; i < item.blockHeight; i++) {
      for (let j = 0; j < item.blockWidth; j++) {
        if (
          rowIndex + i >= grid.length ||
          colIndex + j >= grid[0].length ||
          grid[rowIndex + i][colIndex + j] !== null
        ) {
          return false;
        }
      }
    }
    return true;
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
        runScenario,
        onboardingStep,
        setOnboardingStep,
        onboardingOpen,
        setOnboardingOpen,
        hasOnboarding,
        setHasOnboarding,
        itemActive,
        setItemActive,
        areaActive,
        setAreaActive,
        topItem,
        setTopItem,
        bottomItem,
        setBottomItem,
        doResetGame,
        placeItem,
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
