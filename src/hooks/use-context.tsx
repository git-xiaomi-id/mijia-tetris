"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { type Tables } from "@/lib/supabase";
import useSWR from "swr";
import { tapCheckUser } from "../lib/actions";

type Screen = "welcome" | "game" | "finished";

interface AppContextType {
  user: Tables<"user"> | null | undefined;
  screen: Screen;
  setScreen: (screen: Screen) => void;
  userLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>("finished");

  const { data, isLoading } = useSWR("user", tapCheckUser);

  return (
    <AppContext.Provider
      value={{ user: data?.data, userLoading: isLoading, screen, setScreen }}
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
