import { useEffect } from "react";
import FinishScreen from "./components/app/finish-screen";
import GameScreen from "./components/app/game-screen";
import WelcomeScreen from "./components/app/welcome-screen";
import { useAppProvider } from "./hooks/use-context";
import { getCookie, KEY_TOKEN } from "./lib/utils";

export default function ScreenWrapper() {
  const tokenCookie = getCookie(KEY_TOKEN);
  const { screen } = useAppProvider();

  useEffect(() => {
    if (screen === "game") {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [screen]);

  if (screen === "game") return <GameScreen />;

  if (screen === "finished") return <FinishScreen />;

  return <WelcomeScreen tokenCookie={tokenCookie} />;
}
