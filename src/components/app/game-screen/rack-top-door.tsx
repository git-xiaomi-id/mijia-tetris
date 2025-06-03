import type { IItemPlaced } from "@/lib/refrigerator-items";

export default function RackTopDoor({
  items,
  absolute = true,
}: {
  items: IItemPlaced[][];
  absolute?: boolean;
}) {
  const view = (
    <div className="gra-area">
      {/* <div className="size-full flex flex-col gap-20"> */}
      {items.map((row, rowIndex) => (
        <div key={rowIndex} className="gra-top-door-row">
          {row.map((_, colIndex) => (
            <div key={colIndex} className="gra-grid-item" />
          ))}
        </div>
      ))}
      {/* </div> */}
    </div>
  );
  if (absolute) return <div className="gra-top-door">{view}</div>;
  return view;
}
