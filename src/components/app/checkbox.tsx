import useClickSound from "@/hooks/use-click-sound";
import { Checkbox } from "../ui/checkbox";
import { type ComponentProps } from "react";

export default function AppCheckbox({
  label,
  children,
  ...props
}: {
  label?: string;
} & ComponentProps<typeof Checkbox>) {
  const { clickPlay } = useClickSound();
  return (
    <label
      className="flex items-center gap-1 cursor-pointer select-none group"
      onClick={clickPlay}
    >
      <Checkbox
        className="data-[state=checked]:bg-[#378CE1] data-[state=checked]:border-[#378CE1] transition-all group-active:scale-95"
        {...props}
      />
      {children || label}
    </label>
  );
}
