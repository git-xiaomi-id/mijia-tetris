import useClickSound from "@/hooks/use-click-sound";
import { useGameProvider } from "@/hooks/use-game";
import RackTopMiddle from "./rack-top-middle";
import RackTopDoor from "./rack-top-door";
import RackBoxMiddle from "./rack-box-middle";

export default function GameInteract() {
  const { clickPlay } = useClickSound();
  const {
    screenStep,
    screenSteps,
    assets,
    areaActive,
    setAreaActive,
    rackState,
  } = useGameProvider();
  const asset = assets[assets.length - 1];

  function clickArea(area: (typeof rackState)[0]) {
    clickPlay();
    setAreaActive(area);
  }

  return (
    screenSteps.findIndex((n) => n === screenStep) >= 3 && (
      <>
        <div className="absolute left-0 top-0 size-full">
          <div
            className={[
              "h-full w-fit mx-auto relative transition-all",
              screenStep === "game" ? "scale-110" : "",
            ].join(" ")}
          >
            <img
              key={asset.key}
              alt={asset?.key || ""}
              src={asset?.src || ""}
              className="h-full object-contain block mx-auto transition-all"
            />
            {
              // Clickable Area
              screenStep === "game" &&
                rackState.map((area, index) => (
                  <button
                    key={index}
                    onClick={() => clickArea(area)}
                    type="button"
                    className={area.className}
                  >
                    <span className="text-[10px]">{area?.name}</span>
                  </button>
                ))
            }
          </div>
        </div>

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
                // <div className="w-[80%] h-[80%]">
                <RackTopMiddle items={areaActive.items} />
                // </div>
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
                  <RackBoxMiddle items={areaActive.items} />
                </div>
              )}
            </div>
          </>
        )}
      </>
    )
  );
}
