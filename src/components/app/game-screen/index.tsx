"use client";

// import { useAppProvider } from "@/hooks/use-context";
// import { Instagram } from "lucide-react";
// import { useEffect, useState } from "react";
// import GameTimer from "./game-timer";
// import ButtonTimer from "./button-timer";
// import ItemDock from "./item-dock";
// import { getCookie, KEY_ONBOARDING } from "@/lib/utils";
// import OnboardingModal from "./onboarding-modal";
import { GameProvider } from "@/hooks/use-game";
import GameScreenContent from "./screen";
import "./game-screen.css";

// function UsernameDisplay({ username }: { username: string }) {
//   return (
//     <div className="gs-usernameIg">
//       <div className="gs-usernameIg-icon">
//         <Instagram />
//       </div>
//       <div className="font-semibold">@{username}</div>
//     </div>
//   );
// }

// type TScreenStep = "intro1" | "intro2" | "intro3" | "onboarding" | "game";

// const assets = [
//   {
//     key: "intro1" as TScreenStep,
//     src: "/illustration/refrigerator-closed.webp",
//   },
//   {
//     key: "intro2" as TScreenStep,
//     src: "/illustration/refrigerator-without-door.webp",
//   },
//   {
//     key: "intro3" as TScreenStep,
//     src: "/illustration/refrigerator-naked.webp",
//   },
// ];
// const screenSteps = ["intro1", "intro2", "intro3", "onboarding", "game"];

// type TTimerStep = "start" | "pause";

export default function GameScreen() {
  // const { user } = useAppProvider();

  // const [screenStep, setScreenStep] = useState<TScreenStep>("intro1");
  // const [timerStep, setTimerStep] = useState<TTimerStep>("pause");

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setScreenStep((prev: TScreenStep) => {
  //       const currentIndex = screenSteps.findIndex((step) => step === prev);
  //       if (currentIndex === screenSteps.length - 2) {
  //         clearInterval(interval);
  //         return prev; // Stop at the last step
  //       }
  //       // Check if next step is onboarding and if onboarding cookie is true
  //       const nextStep = screenSteps[currentIndex + 1];

  //       if (nextStep === "onboarding" && getCookie(KEY_ONBOARDING) === "true") {
  //         clearInterval(interval);
  //         return prev; // Stay at current step if onboarding is already done
  //       }

  //       return nextStep as TScreenStep;
  //     });
  //   }, 1500);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <GameProvider>
      <GameScreenContent />
    </GameProvider>
  );
}
