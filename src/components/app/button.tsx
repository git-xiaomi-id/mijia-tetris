"use client";

import { forwardRef } from "react";
import { Button } from "../ui/button";
import { type ButtonHTMLAttributes, type MouseEvent } from "react";
import "./button.css";
import useClickSound from "../../hooks/use-click-sound";
import { Loader } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "orange" | "blue" | "ghost-red" | "red" | "white";
  loading?: boolean;
<<<<<<< Updated upstream
  size?: "sm" | "md";
=======
  size?: "md" | "sm";
>>>>>>> Stashed changes
}

const AppButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
<<<<<<< Updated upstream
    { children, onClick, variant = "orange", loading, size = "md", ...props },
=======
    { children, onClick, variant = "orange", size = "md", loading, ...props },
>>>>>>> Stashed changes
    ref
  ) => {
    const { clickPlay } = useClickSound();

    function click(e: MouseEvent<HTMLButtonElement>) {
      clickPlay();
      if (typeof onClick === "function") onClick(e);
    }

    return (
      <Button
        {...props}
        ref={ref}
        className={`app-styled-button ${variant} ${size}`}
        onClick={click}
        disabled={loading || props.disabled}
      >
        {loading && <Loader className="!size-5 animate-spin" />}
        {children}
      </Button>
    );
  }
);

AppButton.displayName = "AppButton";

export default AppButton;
