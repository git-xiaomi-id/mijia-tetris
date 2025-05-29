"use client";

import { forwardRef } from "react";
import { Button } from "../ui/button";
import { type ButtonHTMLAttributes, type MouseEvent } from "react";
import useClickSound from "../../hooks/use-click-sound";
import { Loader } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "ghost-red" | "ghost-blue";
  loading?: boolean;
}

const RegularButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, onClick, variant = "ghost-red", loading, className, ...props },
    ref
  ) => {
    const basedClassName = "active:scale-90 transition-all";
    const variantStyle = {
      "ghost-red": `bg-transparent text-[#E13737] hover:bg-[#E13737]/10 hover:text-[#E13737]`,
      "ghost-blue": `bg-transparent text-[#378CE1] hover:bg-[#378CE1]/10 hover:text-[#378CE1]`,
    };

    const { clickPlay } = useClickSound();

    function click(e: MouseEvent<HTMLButtonElement>) {
      clickPlay();
      if (typeof onClick === "function") onClick(e);
    }

    return (
      <Button
        {...props}
        ref={ref}
        className={`${basedClassName} ${variantStyle[variant]} ${className}`}
        onClick={click}
        disabled={loading || props.disabled}
      >
        {loading && <Loader className="!size-5 animate-spin" />}
        {children}
      </Button>
    );
  }
);

RegularButton.displayName = "RegularButton";

export default RegularButton;
