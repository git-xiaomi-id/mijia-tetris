import useClickSound from "@/hooks/use-click-sound";
import { useGameProvider } from "@/hooks/use-game";
import { rackArea } from "@/lib/refrigerator-items";

export default function GameInteract() {
  const { clickPlay } = useClickSound();
  const { screenStep, screenSteps, assets, areaActive, setAreaActive } =
    useGameProvider();
  const asset = assets[assets.length - 1];

  function clickArea(area: (typeof rackArea)[0]) {
    clickPlay();
    setAreaActive(area);
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
              className="h-full object-contain block mx-auto transition-all"
            />
            {
              // Clickable Area
              screenStep === "game" &&
                rackArea.map((area, index) => (
                  <button
                    key={index}
                    onClick={() => clickArea(area)}
                    type="button"
                    className={area.className}
                  />
                ))
            }
          </div>
        </div>

        {areaActive && (
          <>
            <div className="gs-gameActive-overlay" />

            {/*  */}
            {areaActive.areaId.includes("top-middle") && (
              <div className="gra-top-middle">
                <div className="gra-area"></div>
              </div>
            )}

            {areaActive.areaId === "top-left" && (
              <div className="gra-top-door">
                <div className="gra-area">
                  {/* <div className="size-full flex flex-col gap-20"> */}
                  <div className="gra-top-door-row" />
                  <div className="gra-top-door-row mt-4" />
                  <div className="gra-top-door-row mt-12" />
                  {/* </div> */}
                </div>
              </div>
            )}

            {areaActive.areaId === "top-right" && (
              <div className="gra-top-door">
                <div className="gra-area">
                  {/* <div className="size-full flex flex-col gap-20"> */}
                  <div className="gra-top-door-row ">
                    <div className="gra-grid-item" />
                    <div className="gra-grid-item" />
                    <div className="gra-grid-item" />
                    <div className="gra-grid-item" />
                  </div>
                  <div className="gra-top-door-row mt-4">
                    <div className="gra-grid-item" />
                    <div className="gra-grid-item" />
                    <div className="gra-grid-item" />
                    <div className="gra-grid-item" />
                  </div>
                  <div className="gra-top-door-row mt-12">
                    <div className="gra-grid-item" />
                    <div className="gra-grid-item" />
                    <div className="gra-grid-item" />
                    <div className="gra-grid-item" />
                  </div>
                  {/* </div> */}
                </div>
              </div>
            )}

            {/*  */}
          </>
        )}
      </>
    )
  );
}
