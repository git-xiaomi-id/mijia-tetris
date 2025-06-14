import useClickSound from "@/hooks/use-click-sound";
import { useGameProvider } from "@/hooks/use-game";
import type { IItemPlaced, IRackArea } from "@/lib/refrigerator-items";

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
          {[...row].map((item, colIndex) => (
            <div key={colIndex} className="w-full">
              <img
                key={colIndex}
                className="relative pointer-events-none"
                style={{
                  transform: `translateY(${colIndex * -12}%) scale(2)`,
                }}
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
            <div key={colIndex} className="w-full">
              <img
                key={colIndex}
                className="relative pointer-events-none"
                style={{ transform: `translateY(${colIndex * 12}%) scale(2)` }}
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

function SetAreaFreezer({
  items,
  text,
}: {
  items: IItemPlaced[][];
  text?: string;
}) {
  return (
    <div className="size-full relative">
      {items.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-1 items-end w-full"
          style={{ height: `${100 / items.length}%` }}
        >
          {row.map((item, colIndex) => (
            <div
              key={colIndex}
              className="relative w-full h-full  flex flex-col items-center"
            >
              {Array.from({ length: item.amount }).map((_, i) => (
                <img
                  key={i}
                  src={item.image}
                  alt={item.name}
                  className="pointer-events-none size-[69%] object-contain"
                  style={{
                    scale: item.amount > 1 ? 0.85 + i * 0.1 : 1,
                    transform: `translateX(0%) translateY(${i * -70}%)`,
                    pointerEvents: item.amount - 1 === i ? "auto" : "none",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      ))}

      <div className="h-[100%] w-full bg-[#595C62]/10 backdrop-blur-[1px] rounded-sm  absolute left-0 bottom-0  flex items-center justify-center  text-[#595C62] text-[6px] font-medium">
        {text}
      </div>
    </div>
  );
}

function SetDrawerMiddle({
  items,
  text,
  areaId,
}: {
  items: IItemPlaced[][];
  text?: string;
  areaId: IRackArea["areaId"];
}) {
  return (
    <div className="size-full">
      {items.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-1 items-end w-full"
          style={{ height: `${100 / items.length}%` }}
        >
          {row.map((item, colIndex) => (
            <div
              key={colIndex}
              className="relative w-full h-full  flex flex-1 flex-col items-center overflow-hidden"
            >
              {Array.from({ length: item.amount }).map((_, i) => (
                <img
                  key={i}
                  src={item.image}
                  alt={item.name}
                  className="pointer-events-none object-contain"
                  style={{
                    scale: item.amount > 1 ? 0.85 + i * 0.1 : 1,
                    transform: `translateX(0%) translateY(${i * -43}%)`,
                    pointerEvents: item.amount - 1 === i ? "auto" : "none",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
      {areaId === "bottom-left" || areaId === "bottom-right" ? (
        <div className="h-[20%] w-full bg-white backdrop-blur-[5px] rounded-t-[2px] rounded-b-sm shadow-xl  absolute left-0 bottom-0  flex items-center justify-center  text-[#595C62] text-[6px] font-medium"></div>
      ) : (
        <div className="h-[100%] w-full bg-[#595C62]/10 backdrop-blur-[1px] rounded-b-sm  absolute left-0 bottom-0  flex items-center justify-center  text-[#595C62] text-[6px] font-medium">
          {text}
        </div>
      )}
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
          "h-full w-fit mx-auto relative transition-all  flex flex-col justify-center",
          screenStep === "game" ? "scale-110" : "",
        ].join(" ")}
      >
        <div className="w-full h-auto relative">
          <img
            key={asset.key}
            alt={asset?.key || ""}
            src={asset?.src || ""}
            className="h-auto w-full max-w-[520px] object-contain block mx-auto transition-all"
          />
          {
            // Clickable Area
            screenStep === "game" &&
              rackState.map((area, index) => (
                <button
                  key={index}
                  onClick={() => clickArea(area)}
                  type="button"
                  title={area.areaId}
                  className={`${area.className} ${
                    area.items.flat()?.some((item) => item?.id)
                      ? "off-blinking"
                      : ""
                  }`}
                >
                  {area.items.flat()?.some((item) => item?.id) ? (
                    area.areaId === "top-left" ? (
                      <SetAreaTopDoorLeft items={area.items} />
                    ) : area.areaId === "top-right" ? (
                      <SetAreaTopDoorRight items={area.items} />
                    ) : area.areaId.includes("top-middle") ? (
                      <SetAreaTopMiddle items={area.items} />
                    ) : area.areaId.includes("freezer-sec2") ? (
                      <SetAreaFreezer items={area.items} text="Freeze Box" />
                    ) : area.areaId === "middle-right" ||
                      area.areaId === "middle-left" ||
                      area.areaId.includes("freezer-left") ||
                      area.areaId.includes("freezer-right") ||
                      area.areaId.includes("bottom-left") ||
                      area.areaId.includes("bottom-right") ? (
                      <SetDrawerMiddle
                        items={area.items}
                        areaId={area.areaId}
                        text={
                          area.areaId === "middle-left"
                            ? "i Fresh"
                            : "Fresh Box"
                        }
                      />
                    ) : (
                      <span className="pointer-events-none text-white text-[6px] font-medium">
                        {area?.name}
                      </span>
                    )
                  ) : (
                    <span className="pointer-events-none text-white text-[6px] font-medium">
                      {area?.name}
                    </span>
                  )}
                </button>
              ))
          }
        </div>
      </div>
    </div>
  );
}
