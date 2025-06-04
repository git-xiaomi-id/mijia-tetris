"use client";

import { type Tables } from "@/lib/supabase";
import { createContext, useContext, useState, type ReactNode } from "react";
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>("welcome");

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
