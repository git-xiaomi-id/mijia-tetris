import useClickSound from "@/hooks/use-click-sound";
import { useGameProvider } from "@/hooks/use-game";

export default function GameSetArea() {
  const { clickPlay } = useClickSound();
  const { screenStep, assets, setAreaActive, rackState } = useGameProvider();
  const asset = assets[assets.length - 1];

  function clickArea(area: (typeof rackState)[0]) {
    clickPlay();
    setAreaActive(area);
  }

  return (
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
                {area.items.flat()?.some((item) => item?.id) ? (
                  <div className="relative size-full flex flex-col gap-1">
                    {area.items.map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="flex flex-1 items-end w-full"
                        style={{ height: `${100 / area.items.length}%` }}
                      >
                        {row.map((item, colIndex) => (
                          <div key={colIndex} className="relative w-full">
                            {Array.from({ length: item.amount }).map((_, i) => (
                              <img
                                key={i}
                                src={item.image}
                                alt={item.name}
                                className="pointer-events-none"
                                style={{
                                  scale:
                                    item.amount > 1
                                      ? i > 0
                                        ? 0.9 + 0.1 * i
                                        : 0.9
                                      : 1,
                                  transform: `translateY(${
                                    (item.amount - 1 - i) * 55
                                  }%)`,
                                  pointerEvents:
                                    item.amount - 1 === i ? "auto" : "none",
                                }}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px]">{area?.name}</span>
                )}
              </button>
            ))
        }
      </div>
    </div>
  );
}
