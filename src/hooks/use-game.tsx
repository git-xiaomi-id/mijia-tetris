import refrigeratorItems, {
  rackArea,
  type IItem,
  type IRackArea,
} from "@/lib/refrigerator-items";
import { postGameResult } from "@/lib/supabase-client";
import {
  generateGridArray,
  getCookie,
  KEY_ONBOARDING,
  setCookie,
} from "@/lib/utils";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { toast } from "sonner";
import { useAppProvider } from "./use-context";

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
  doResetGame: (callback?: (...args: unknown[]) => void) => void;
  placeItem: (rowIndex: number, colIndex: number) => void;
  onClickItem: (item: (typeof refrigeratorItems)[0]) => void;
  rackState: IRackArea[];
  setRackState: Dispatch<SetStateAction<IRackArea[]>>;
  loadingSubmit: boolean;
  saveGameProgress: () => void;
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
  const { user, setScreen, updateGamesCount } = useAppProvider();

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
  const [rackState, setRackState] = useState<IRackArea[] | []>([...rackArea]);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

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
    setGameStartTime(new Date());

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
    }, 1000);
  }

  useEffect(() => {
    if (screenStep === "onboarding") setOnboardingOpen(true);
    else setOnboardingOpen(false);
  }, [screenStep]);

  function doResetGame(callback?: () => void) {
    setTime(0);
    setTimerStep("pause");
    setScreenStep("intro1");
    setOnboardingStep(0);
    setGameStartTime(null);

    shuffleItems();
    setAreaActive(null);
    setItemActive(null);
    setTimeout(() => {
      setRackState(
        rackArea.map((rack) => ({
          ...rack,
          items: generateGridArray(rack.rows, rack.columns),
        }))
      );
    }, 100);

    if (callback) setTimeout(callback, 200);
  }

  function placeItem(rowIndex: number) {
    if (!areaActive) return;
    if (!itemActive) return toast.error("Pilih item terlebih dahulu");

    const item = refrigeratorItems.find((item) => item.id === itemActive)!;
    if (item.rack !== areaActive.area) {
      setItemActive(null);
      toast.error(`Oops!`, {
        description: `${item.name} tidak bisa ditaruh di ${areaActive.name}`,
      });
      return;
    } else toast.dismiss();

    const newItems = areaActive.items.map((row) => [...row]);
    const lastIndex = newItems[rowIndex].findIndex(
      (i) => typeof i === "string"
    );
    if (lastIndex === -1) {
      setItemActive(null);
      return toast.error("Opps", {
        description: "Tidak cukup ruang untuk menaruh item",
      });
    }
    newItems[rowIndex][lastIndex] = {
      id: itemActive,
      name: item?.name || "",
      image: item?.image || "",
      amount: item?.placementAmount || 1,
      blockWidth: item?.blockWidth || 1,
      blockHeight: item?.blockHeight || 1,
      rack: areaActive.area,
      dock: item?.dock || "top",
    };

    // Find the current item from state (not from refrigeratorItems)
    const inTop = topItem.findIndex((i) => i.id === itemActive);
    const inBottom = bottomItem.findIndex((i) => i.id === itemActive);

    let currentItem: IItem;
    let updatedTopItems = topItem;
    let updatedBottomItems = bottomItem;

    if (inTop >= 0) {
      currentItem = topItem[inTop];
      const newQuantity = currentItem.totalQty - currentItem.placementAmount;
      updatedTopItems = topItem.map((item, index) =>
        index === inTop ? { ...item, totalQty: newQuantity } : item
      );
    } else if (inBottom >= 0) {
      currentItem = bottomItem[inBottom];
      const newQuantity = currentItem.totalQty - currentItem.placementAmount;
      updatedBottomItems = bottomItem.map((item, index) =>
        index === inBottom ? { ...item, totalQty: newQuantity } : item
      );
    } else {
      setItemActive(null);
      return;
    }

    // Check game completion with calculated values
    const allUpdatedItems = [...updatedTopItems, ...updatedBottomItems];
    const hasRemainingItems = allUpdatedItems.some((item) => item.totalQty > 0);

    // UPDATE RACK INFORMATION
    setAreaActive({ ...areaActive, items: newItems });
    setRackState((curr) => {
      const newData = [...curr];
      newData[newData.findIndex((i) => i.areaId === areaActive.areaId)].items =
        newItems;
      return newData;
    });

    // UPDATE ITEM INFORMATION
    if (inTop >= 0) {
      setTopItem(updatedTopItems);
    } else if (inBottom >= 0) {
      setBottomItem(updatedBottomItems);
    }

    setItemActive(null);

    if (!hasRemainingItems) {
      completeGame();
    }
  }
  async function submitGameResult(isCompleted: boolean) {
    if (!gameStartTime || !user) return { error: null };

    const finishTime = new Date();
    const duration = Math.floor(
      (finishTime.getTime() - gameStartTime.getTime()) / 1000
    );
    const totalItems = refrigeratorItems.length;
    const score = isCompleted ? Math.max(1000 - duration * 10, 100) : 0;

    return await postGameResult({
      user: user.id,
      username_ig: user?.username_ig ?? null,
      duration: isCompleted ? duration : 0,
      token: user.token ?? null,
      finishAt: finishTime.toISOString(),
      startAt: gameStartTime.toISOString(),
      items: totalItems,
      score,
    });
  }

  async function completeGame() {
    setLoadingSubmit(true);

    const { error } = await submitGameResult(true);

    if (!error) {
      updateGamesCount(true);
      const COMPLETION_DELAY = 1000;
      setTimeout(() => {
        setLoadingSubmit(false);
        setScreen("finished");
      }, COMPLETION_DELAY);
    } else {
      setLoadingSubmit(false);
    }
  }

  async function saveGameProgress() {
    setLoadingSubmit(true);
    const { error } = await submitGameResult(false);
    setLoadingSubmit(false);

    if (!error) {
      updateGamesCount(true);
    }
  }

  function onClickItem(item: (typeof refrigeratorItems)[0]) {
    if (areaActive) {
      setItemActive(itemActive === item.id ? null : item.id);
    }
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
        onClickItem,
        rackState,
        setRackState,
        loadingSubmit,
        saveGameProgress,
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
