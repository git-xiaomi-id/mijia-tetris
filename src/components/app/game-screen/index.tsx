"use client";

import { useAppProvider } from "@/hooks/use-context";
import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import "./game-screen.css";
import GameTimer from "./game-timer";
import ButtonTimer from "./button-timer";
import ItemDock from "./item-dock";
import { getCookie, KEY_ONBOARDING } from "@/lib/utils";
import OnboardingModal from "./onboarding-modal";

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

type TScreenStep = "intro1" | "intro2" | "intro3" | "onboarding" | "game";

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
const screenSteps = ["intro1", "intro2", "intro3", "onboarding", "game"];

type TTimerStep = "start" | "pause";

export default function GameScreen() {
  const { user } = useAppProvider();

  const [screenStep, setScreenStep] = useState<TScreenStep>("intro1");
  const [timerStep, setTimerStep] = useState<TTimerStep>("pause");

  useEffect(() => {
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

    return () => clearInterval(interval);
  }, []);

  function togglingStep() {
    setTimerStep(timerStep === "start" ? "pause" : "start");
  }

  function closeOnboarding() {
    setScreenStep("game");
    setTimerStep("start");
  }

  return (
    <div className="h-screen relative flex flex-col items-start">
      {/* JANGAN ADA FIXED DLL, GRID COL BAGI RATA */}
      <div className="gs-gamearea">
        {/* 1 */}
        <div className="gs-toparea">
          <UsernameDisplay username={user?.username_ig ?? ""} />
          {screenSteps.indexOf(screenStep)}
          <div className="flex flex-col items-end gap-4">
            <GameTimer step={timerStep} />
            <ButtonTimer
              onClick={togglingStep}
              screen={screenStep}
              step={timerStep}
            />
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
            // Onboarding image
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
            <div className="absolute inset-0 bg-[#222222BF]  transition-opacity duration-500" />
            <OnboardingModal
              open={screenStep.includes("onboarding")}
              onClose={closeOnboarding}
            />
          </>
        )}
      </div>
    </div>
  );
}
