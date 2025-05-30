"use client";

import { useAppProvider } from "@/hooks/use-context";
import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import "./game-screen.css";
import GameTimer from "./game-timer";
import ButtonTimer from "./button-timer";

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

type TGameStep = "intro1" | "intro2" | "intro3" | "intro4";

const assets = [
  {
    key: "intro1" as TGameStep,
    src: "/illustration/refrigerator-closed.webp",
  },
  {
    key: "intro2" as TGameStep,
    src: "/illustration/refrigerator-without-door.webp",
  },
  {
    key: "intro3" as TGameStep,
    src: "/illustration/refrigerator-naked.webp",
  },
];

type TStep = "start" | "pause";

export default function GameScreen() {
  const { user } = useAppProvider();

  const [gameStep, setGameStep] = useState<TGameStep>("intro1");
  const [timerStep, setTimerStep] = useState<TStep>("start");
  // const active = assets.find((asset) => asset.key === gameStep);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameStep((prev) => {
        const currentIndex = assets.findIndex((asset) => asset.key === prev);
        if (currentIndex === assets.length - 1) return prev;
        const nextIndex = currentIndex + 1;
        return assets[nextIndex].key;
      });
    }, 4000);

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
        <div className="relative aspect-[1/1.12] w-full flex flex-1 items-center justify-center">
          {assets.map((asset) => (
            <img
              key={asset.key}
              alt={asset?.key || ""}
              src={asset?.src || ""}
              className={[
                "size-full object-contain  gs-image-wrap absolute left-0 top-0",
                gameStep === asset.key ? "active" : "hidden",
              ].join(" ")}
            />
          ))}
        </div>

        {/* 3 */}
        <div
          className={`gs-item-drawer ${gameStep === "intro3" ? "shown" : ""}`}
        >
          BOTTOM
        </div>
      </div>
    </div>
  );
}
