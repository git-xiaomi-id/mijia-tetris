import useClickSound from "@/hooks/use-click-sound";
import { useGameProvider } from "@/hooks/use-game";
import { type TRack } from "@/lib/refrigerator-items";

// Map clickable areas to TRack types
const areaToRackMap: Record<string, TRack> = {
  "top-left": "top-left-door",
  "top-middle1": "top-middle-door",
  "top-middle2": "top-middle-door",
  "top-middle3": "top-middle-door",
  "top-right": "top-right-door",
  "middle-left": "middle-left-door",
  "middle-right": "middle-right-door",
  "bottom-left": "bottom-left-door",
  "bottom-right": "bottom-right-door",
  "freezer-left": "freezer-left-door",
  "freezer-right": "freezer-right-door",
  "freezer-sec2-left": "freezer-sec2-left-door",
  "freezer-sec2-right": "freezer-sec2-right-door",
};

export default function GameInteract() {
  const { clickPlay } = useClickSound();
  const { screenStep, screenSteps, assets, areaActive, setAreaActive } =
    useGameProvider();
  const asset = assets[assets.length - 1];

  function clickArea(areaId: string) {
    clickPlay();
    const rackType = areaToRackMap[areaId];
    if (rackType) {
      setAreaActive(rackType);
    }
  }

  return (
    screenSteps.findIndex((n) => n === screenStep) >= 3 && (
      <>
        <div className="absolute left-0 top-0 size-full">
          <div
            className={[
              "h-full w-fit mx-auto relative",
              screenStep === "game" ? "transition-all scale-110" : "",
            ].join(" ")}
          >
            <img
              key={asset.key}
              alt={asset?.key || ""}
              src={asset?.src || ""}
              className={[
                "h-full object-contain block mx-auto transition-all",
              ].join(" ")}
            />
            {
              // Clickable Area
              screenStep === "game" &&
                [
                  {
                    area: "top-left",
                    className: "gs-mask-door-dashed door-left",
                  },
                  {
                    area: "top-middle1",
                    className: "gs-mask-door-dashed door-middle",
                  },
                  {
                    area: "top-middle2",
                    className: "gs-mask-door-dashed door-middle second",
                  },
                  {
                    area: "top-middle3",
                    className: "gs-mask-door-dashed door-middle third",
                  },
                  {
                    area: "top-right",
                    className: "gs-mask-door-dashed door-right",
                  },
                  {
                    area: "middle-left",
                    className: "gs-mask-door-dashed-middle door-left",
                  },
                  {
                    area: "middle-right",
                    className: "gs-mask-door-dashed-middle door-right",
                  },
                  {
                    area: "bottom-left",
                    className: "gs-mask-door-dashed-bottom left",
                  },
                  {
                    area: "bottom-right",
                    className: "gs-mask-door-dashed-bottom right",
                  },
                  {
                    area: "freezer-left",
                    className: "gs-mask-door-dashed-freezerbottom left",
                  },
                  {
                    area: "freezer-right",
                    className: "gs-mask-door-dashed-freezerbottom right",
                  },
                  {
                    area: "freezer-sec2-left",
                    className: "gs-mask-door-dashed-freezerbottom sec2 left",
                  },
                  {
                    area: "freezer-sec2-right",
                    className: "gs-mask-door-dashed-freezerbottom sec2 right",
                  },
                ].map((button, index) => (
                  <button
                    key={index}
                    onClick={() => clickArea(button.area)}
                    type="button"
                    className={button.className}
                  />
                ))
            }
          </div>
        </div>

        {areaActive && (
          <>
            <div className="gs-gameActive-overlay" />
            {/* <div className="game-rack-area"> */}
            <div className="gra-top-middle">
              <div className="gra-area">
                {/* Here you can filter items based on the selected rack */}
                {areaActive}
              </div>
            </div>
            {/* </div> */}
          </>
        )}
      </>
    )
  );
}
