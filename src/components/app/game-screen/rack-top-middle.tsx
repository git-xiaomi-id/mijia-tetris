import type { IItemPlaced } from "@/lib/refrigerator-items";
import { useGameProvider } from "@/hooks/use-game";
import useClickSound from "@/hooks/use-click-sound";

export default function RackTopMiddle({
  items,
  absolute = true,
}: {
  items: IItemPlaced[][];
  absolute?: boolean;
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
    <div className="gra-area flex flex-col gap-3.5 items-center">
      {items.map((row, rowIndex) => (
        <div key={rowIndex} className="gra-top-middle-row">
          {row.map((item, colIndex) => (
            <div
              key={colIndex}
              className={`gra-grid-item w-full `}
              onClick={() => handleGridClick(rowIndex, colIndex)}
            >
              {item && (
                <div className="relative w-full h-auto pointer-events-none">
                  {Array.from({ length: item.amount }).map((_, i) => (
                    <img
                      key={i}
                      src={item.image}
                      alt={item.name}
                      className="pointer-events-none"
                      style={{
                        scale:
                          item.amount > 1 ? (i > 0 ? 0.9 + 0.1 * i : 0.9) : 1,
                        transform: `translateY(${(item.amount - 1 - i) * 55}%)`,
                        pointerEvents: item.amount - 1 === i ? "auto" : "none",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      <div className="bg-gray-100/5 h-10 w-full backdrop-blur-0" />
    </div>
  );
  if (absolute) return <div className="gra-top-middle">{view}</div>;
  return view;
}
