import type { IItemPlaced } from "@/lib/refrigerator-items";

export default function RackTopMiddle({
  items,
  absolute = true,
}: {
  items: IItemPlaced[][];
  absolute?: boolean;
}) {
  const view = (
    <div className="gra-area  flex gap-2">
      {items.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="absolute left-[50%] -translate-x-[50%] top-[19%]  flex gap-2 h-20 w-fit"
        >
          {row.map((_, colIndex) => (
            <div
              key={colIndex}
              className="gra-grid-item  w-10"
              style={{
                transform: "rotateX(0deg) rotateY(10deg)",
                transformStyle: "preserve-3d",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
  if (absolute)
    return (
      <>
        <div className="gra-top-middle"></div>
        {view}
      </>
    );
  return view;
}
