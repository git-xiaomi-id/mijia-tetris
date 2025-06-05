import type { IItemPlaced, IRackArea } from "@/lib/refrigerator-items";
import { useGameProvider } from "@/hooks/use-game";
import useClickSound from "@/hooks/use-click-sound";

export default function RackTopDoor({
  items,
  absolute = true,
  type,
}: {
  items: IItemPlaced[][];
  absolute?: boolean;
  type?: IRackArea["areaId"];
}) {
  const { itemActive, areaActive, placeItem } = useGameProvider();
  const { clickPlay } = useClickSound();

  const handleGridClick = (rowIndex: number, colIndex: number) => {
    clickPlay();
    if (itemActive && areaActive) {
      placeItem(rowIndex, colIndex);
    }
  };

  const view = (
    <div className="gra-area">
      {/* <div className="size-full flex flex-col gap-20"> */}
      {items.map((row, rowIndex) => (
        <div key={rowIndex} className="gra-top-door-row">
          {row.map((item, colIndex) => (
            <div
              key={colIndex}
              className={`gra-grid-item`}
              onClick={() => handleGridClick(rowIndex, colIndex)}
            >
              {item && (
                <div className="relative size-full">
                  <img
                    key={colIndex}
                    src={item.image}
                    alt={item.name}
                    className="pointer-events-none"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      {/* </div> */}
    </div>
  );
  if (absolute)
    return (
      <div className="gra-top-door gra-top-door-set">
        <div className={`gra-top-door-bg gra-top-door-set ${type}`} />
        {view}
      </div>
    );
  return view;
}
