import { forwardRef, type ComponentProps } from "react";
import { Input } from "../ui/input";
import "./input.css";
import useClickSound from "../../hooks/use-click-sound";

const AppInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  (props, ref) => {
    const { clickPlay } = useClickSound();
    return (
      <Input
        {...props}
        className={[props.className, "app-styled-input"].join(" ")}
        onClick={(e) => {
          clickPlay();
          if (props.onClick) props.onClick(e);
        }}
        ref={ref}
      />
    );
  }
);

AppInput.displayName = "AppInput";

export default AppInput;
