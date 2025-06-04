import type { IItemPlaced } from "@/lib/refrigerator-items";
import { useGameProvider } from "@/hooks/use-game";
import useClickSound from "@/hooks/use-click-sound";
import { useEffect } from "react";

export default function RackTopMiddle({
  items,
  absolute = true,
}: {
  items: IItemPlaced[][];
  absolute?: boolean;
}) {
  const { itemActive, areaActive, placeItem, rackState } = useGameProvider();
  const { clickPlay } = useClickSound();

  const handleGridClick = (rowIndex: number, colIndex: number) => {
    clickPlay();
    if (itemActive && areaActive) {
      placeItem(rowIndex, colIndex);
    }
  };

  useEffect(() => {
    console.log("rackState: ", rackState);
  }, [rackState]);

  const view = (
    <div className="gra-area flex flex-col gap-5 items-center">
      {items.map((row, rowIndex) => (
        <div key={rowIndex} className="gra-top-middle-row">
          {row.map((item, colIndex) => (
            <div
              key={colIndex}
              className={`gra-grid-item w-full`}
              onClick={() => handleGridClick(rowIndex, colIndex)}
            >
              {item && (
                <div className="relative w-full h-auto">
                  {Array.from({ length: item.amount }).map((_, i) => (
                    <img
                      key={i}
                      src={item.image}
                      alt={item.name}
                      className={[i > 0 ? "-mt-1.5" : ""].join(" ")}
                      style={{
                        scale:
                          item.amount > 1 ? (i > 0 ? 0.9 + 0.05 * i : 0.9) : 1,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      <div className="bg-gray-100/10 h-10 w-full -mt-5 backdrop-blur-md" />
    </div>
  );
  if (absolute) return <div className="gra-top-middle">{view}</div>;
  return view;
}
