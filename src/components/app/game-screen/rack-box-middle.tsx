import type { IItemPlaced } from "@/lib/refrigerator-items";
import { useGameProvider } from "@/hooks/use-game";
import useClickSound from "@/hooks/use-click-sound";

export default function RackBoxMiddle({
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
    <div className="gra-area flex items-center justify-center gap-1 max-w-[70%] max-h-[90%] mx-auto px-2">
      {items.map((row, rowIndex) =>
        row.map((item, itemIndex) => {
          return (
            <div
              key={itemIndex}
              className="border border-dashed border-transparent hover:border-[#ff813e] hover:bg-slate-300/60   w-full h-full  flex flex-col justify-end"
              onClick={() => handleGridClick(rowIndex, itemIndex)}
            >
              {item &&
                Array.from({ length: item.amount }).map((_, i) => (
                  <img
                    key={i}
                    src={item.image}
                    alt={item.name}
                    className="w-full h-auto object-contain"
                    style={{
                      transform:
                        itemIndex === 0
                          ? `translateY(${
                              (item.amount - 1 - i) * (item.offsetY || 20)
                            }%) translateX(${(item.amount - 1 - i) * 6}%)`
                          : itemIndex === 1
                          ? `translateY(${
                              (item.amount - 1 - i) * (item.offsetY || 20)
                            }%) translateX(${(item.amount - 1 - i) * 0}%)`
                          : itemIndex === 2
                          ? `translateY(${
                              (item.amount - 1 - i) * (item.offsetY || 20)
                            }%) translateX(${(item.amount - 1 - i) * -6}%)`
                          : "",
                    }}
                  />
                ))}
            </div>
          );
        })
      )}

      {/*  */}
    </div>
  );
  if (absolute)
    return (
      <div className="gra-middle-rack  flex items-end !pb-10 scale-125">
        {view}
      </div>
    );
  return view;
}
