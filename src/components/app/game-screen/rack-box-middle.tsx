import type { IItemPlaced } from "@/lib/refrigerator-items";

export default function RackBoxMiddle({
  items,
  absolute = true,
}: {
  items: IItemPlaced[][];
  absolute?: boolean;
}) {
  const view = (
    <div className="gra-area  flex items-center justify-center gap-2  border border-red-500">
      {items.map((row, rowIndex) => (
        <div key={rowIndex} className=" flex gap-2 h-full w-[70%] ">
          {row.map((_, colIndex) => (
            <div key={colIndex} className="gra-grid-item w-full !h-full" />
          ))}
        </div>
      ))}
    </div>
  );
  if (absolute) return <div className="gra-middle-rack">{view}</div>;
  return view;
}
