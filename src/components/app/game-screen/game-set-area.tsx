import useClickSound from "@/hooks/use-click-sound";
import { useGameProvider } from "@/hooks/use-game";
import type { IItemPlaced } from "@/lib/refrigerator-items";

function SetAreaTopMiddle({ items }: { items: IItemPlaced[][] }) {
  return (
    <div className="relative size-full flex flex-col gap-0">
      {items.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-1 items-end w-full"
          style={{ height: `${100 / items.length}%` }}
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
                    scale: item.amount > 1 ? (i > 0 ? 0.9 + 0.1 * i : 0.9) : 1,
                    transform: `translateY(${(item.amount - 1 - i) * 60}%)`,
                    pointerEvents: item.amount - 1 === i ? "auto" : "none",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function SetAreaTopDoorRight({ items }: { items: IItemPlaced[][] }) {
  return (
    <div className="relative size-full flex flex-col gap-0">
      {items.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex items-end w-full"
          style={{
            marginTop:
              rowIndex === 0
                ? "20px"
                : rowIndex === 1
                ? "32px"
                : rowIndex === 2
                ? "60px"
                : "0px",
          }}
          //   style={{ height: `${100 / items.length}%` }}
        >
          {row.map((item, colIndex) => (
            <div key={colIndex} className="w-full">
              <img
                key={colIndex}
                className="relative pointer-events-none"
                style={{ transform: `translateY(${colIndex * -12}%)` }}
                src={item.image}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function SetAreaTopDoorLeft({ items }: { items: IItemPlaced[][] }) {
  return (
    <div className="relative size-full flex flex-col gap-0">
      {items.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex items-end w-full"
          style={{
            marginTop:
              rowIndex === 0
                ? "20px"
                : rowIndex === 1
                ? "32px"
                : rowIndex === 2
                ? "60px"
                : "0px",
          }}
          //   style={{ height: `${100 / items.length}%` }}
        >
          {row.map((item, colIndex) => (
            <div key={colIndex}>
              <img
                key={colIndex}
                className="relative pointer-events-none"
                style={{ transform: `translateY(${colIndex * 12}%)` }}
                src={item.image}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

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
                  area.areaId === "top-left" ? (
                    <SetAreaTopDoorLeft items={area.items} />
                  ) : area.areaId === "top-right" ? (
                    <SetAreaTopDoorRight items={area.items} />
                  ) : area.areaId.includes("top-middle") ? (
                    <SetAreaTopMiddle items={area.items} />
                  ) : (
                    <span className="text-[10px]">{area?.name}</span>
                  )
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
