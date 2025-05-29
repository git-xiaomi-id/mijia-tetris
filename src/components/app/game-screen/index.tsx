"use client";

import { useAppProvider } from "@/hooks/use-context";
import "./game-screen.css";
import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";

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

export default function GameScreen() {
  const { user } = useAppProvider();

  const [gameStep, setGameStep] = useState<TGameStep>("intro1");
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

  return (
    <div className="h-screen relative flex flex-col items-start">
      {/* JANGAN ADA FIXED DLL, GRID COL BAGI RATA */}
      <div className="gs-gamearea">
        <div className="gs-toparea">
          <UsernameDisplay username={user?.username_ig ?? ""} />
        </div>
        <div className="relative aspect-[1/1.12] w-full flex items-center justify-center">
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
      </div>
      <div className={`gs-item-drawer ${gameStep === "intro3" ? "shown" : ""}`}>
        BOTTOM
      </div>
    </div>
  );
}
