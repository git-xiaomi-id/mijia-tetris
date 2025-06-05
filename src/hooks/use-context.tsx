"use client";

import { type Tables } from "@/lib/supabase";
import { getCookie, KEY_PRIZE_ALERT, KEY_PLAY_COUNT } from "@/lib/utils";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import useSWR from "swr";
import { tapCheckUser, tapCheckUserGames } from "../lib/actions";

type Screen = "welcome" | "game" | "finished";

interface AppContextType {
  user: Tables<"user"> | null | undefined;
  screen: Screen;
  setScreen: (screen: Screen) => void;
  userLoading: boolean;
  gamesCount: number;
  gamesLoading: boolean;
  hasPrizeAlert: boolean;
  setHasPrizeAlert: Dispatch<SetStateAction<boolean>>;
  updateGamesCount: (increment?: boolean) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [hasPrizeAlert, setHasPrizeAlert] = useState<boolean>(() => {
    const hasSeenAlert = getCookie(KEY_PRIZE_ALERT);
    return !hasSeenAlert;
  });

  const [localGamesCount, setLocalGamesCount] = useState<number>(() => {
    const savedCount = getCookie(KEY_PLAY_COUNT);
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const { data, isLoading } = useSWR("user", tapCheckUser);

  const {
    data: dataGames,
    isLoading: loadingGames,
    mutate: mutateGames,
  } = useSWR("games", tapCheckUserGames, {
    onSuccess: (data) => {
      if (data?.count !== undefined) {
        setLocalGamesCount(data.count);
      }
    },
  });

  const updateGamesCount = async (increment: boolean = false) => {
    if (increment) {
      const newCount = (dataGames?.count ?? localGamesCount) + 1;
      setLocalGamesCount(newCount);

      if (dataGames) {
        mutateGames(
          {
            ...dataGames,
            count: newCount,
          },
          false
        );
      }
    }

    await mutateGames();
  };

  return (
    <AppContext.Provider
      value={{
        user: data?.data,
        gamesCount: dataGames?.count ?? localGamesCount,
        gamesLoading: loadingGames,
        userLoading: isLoading,
        screen,
        setScreen,
        hasPrizeAlert,
        setHasPrizeAlert,
        updateGamesCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppProvider() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppProvider must be used within a AppProvider");
  }
  return context;
}
