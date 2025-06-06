import { useGameProvider } from "@/hooks/use-game";
import RackTopMiddle from "./rack-top-middle";
import RackTopDoor from "./rack-top-door";
import RackBoxMiddle from "./rack-box-middle";
import "./game-interact.css";
import GameSetArea from "./game-set-area";

export default function GameInteract() {
  const { screenStep, screenSteps, areaActive } = useGameProvider();
  return (
    screenSteps.findIndex((n) => n === screenStep) >= 3 && (
      <>
        <GameSetArea />

        {areaActive && (
          <>
            <div className="gs-gameActive-overlay" />

            <div className="absolute inset-0 flex items-center justify-center">
              {(areaActive.areaId === "top-left" ||
                areaActive.areaId === "top-right") && (
                <div className="w-[80%] h-[80%]">
                  <RackTopDoor
                    items={areaActive.items}
                    type={areaActive.areaId}
                  />
                </div>
              )}

              {areaActive.areaId.includes("top-middle") && (
                <div className="w-[80%] h-[80%]">
                  <RackTopMiddle items={areaActive.items} />
                </div>
              )}

              {(areaActive.areaId === "middle-left" ||
                areaActive.areaId === "middle-right" ||
                areaActive.areaId === "bottom-left" ||
                areaActive.areaId === "bottom-right" ||
                areaActive.areaId === "freezer-left" ||
                areaActive.areaId === "freezer-right" ||
                areaActive.areaId === "freezer-sec2-left" ||
                areaActive.areaId === "freezer-sec2-right") && (
                <div className="w-[80%] h-[80%]">
                  <RackBoxMiddle
                    items={areaActive.items}
                    isFreezerTop={
                      areaActive.areaId === "bottom-left" ||
                      areaActive.areaId === "bottom-right"
                    }
                  />
                </div>
              )}
            </div>
          </>
        )}
      </>
    )
  );
}
