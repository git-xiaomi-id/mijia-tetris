"use client";

import { useAppProvider } from "@/hooks/use-context";
import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import "./game-screen.css";
import GameTimer from "./game-timer";
import ButtonTimer from "./button-timer";
import ItemDock from "./item-dock";

function UsernameDisplay({ username }: { username: string }) {
  return (
    <div className="gs-usernameIg">
      <div className="gs-usernameIg-icon">
        <Instagram />
      </div>
      <div className="font-semibold">@{username}</div>
    </div>
  );
}

type TScreenStep =
  | "intro1"
  | "intro2"
  | "intro3"
  | "onboarding1"
  | "onboarding2";

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
const screenSteps = [
  "intro1",
  "intro2",
  "intro3",
  "onboarding1",
  "onboarding2",
];

type TTimerStep = "start" | "pause";

export default function GameScreen() {
  const { user } = useAppProvider();

  const [screenStep, setScreenStep] = useState<TScreenStep>("intro1");
  const [timerStep, setTimerStep] = useState<TTimerStep>("pause");

  useEffect(() => {
    const interval = setInterval(() => {
      setScreenStep((prev: TScreenStep) => {
        const currentIndex = screenSteps.findIndex((step) => step === prev);
        if (currentIndex === screenSteps.length - 1) {
          return prev; // Stop at the last step
        }
        return screenSteps[currentIndex + 1] as TScreenStep;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function togglingStep() {
    setTimerStep(timerStep === "start" ? "pause" : "start");
  }

  return (
    <div className="h-screen relative flex flex-col items-start">
      {/* JANGAN ADA FIXED DLL, GRID COL BAGI RATA */}
      <div className="gs-gamearea">
        {/* 1 */}
        <div className="gs-toparea">
          <UsernameDisplay username={user?.username_ig ?? ""} />
          <div className="flex flex-col items-end gap-4">
            <GameTimer step={timerStep} />
            <ButtonTimer onClick={togglingStep} step={timerStep} />
          </div>
        </div>

        {/* 2 */}
        <div className="relative w-full flex flex-1 items-center justify-center">
          {screenStep.includes("intro") ? (
            assets.map((asset) => (
              <img
                key={asset.key}
                alt={asset?.key || ""}
                src={asset?.src || ""}
                className={[
                  "size-full object-contain  gs-image-wrap absolute left-0 top-0",
                  screenStep === asset.key ? "active" : "hidden",
                ].join(" ")}
              />
            ))
          ) : (
            <img
              key={assets[assets.length - 1].key}
              alt={assets[assets.length - 1]?.key || ""}
              src={assets[assets.length - 1]?.src || ""}
              className="size-full object-contain  gs-image-wrap absolute left-0 top-0 active"
            />
          )}
        </div>

        {/* 3 */}
        <div
          className={`gs-item-drawer ${
            screenSteps.indexOf(screenStep) >= 2 ? "shown" : ""
          }`}
        >
          <ItemDock />
        </div>

        {/* Onboarding Overlay */}
        {screenStep.includes("onboarding") && (
          <>
            <div className="absolute inset-0 bg-black/80 transition-opacity duration-500" />
          </>
        )}
      </div>
    </div>
  );
}
