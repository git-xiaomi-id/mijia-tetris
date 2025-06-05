"use client";

import { type Tables } from "@/lib/supabase";
import { getCookie, KEY_PRIZE_ALERT } from "@/lib/utils";
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [hasPrizeAlert, setHasPrizeAlert] = useState<boolean>(() => {
    const hasSeenAlert = getCookie(KEY_PRIZE_ALERT);
    return !hasSeenAlert;
  });

  const { data, isLoading } = useSWR("user", tapCheckUser);

  const { data: dataGames, isLoading: loadingGames } = useSWR(
    "games",
    tapCheckUserGames
  );

  return (
    <AppContext.Provider
      value={{
        user: data?.data,
        gamesCount: dataGames?.count ?? 0,
        gamesLoading: loadingGames,
        userLoading: isLoading,
        screen,
        setScreen,
        hasPrizeAlert,
        setHasPrizeAlert,
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
