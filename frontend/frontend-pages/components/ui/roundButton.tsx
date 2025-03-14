import { Button } from "@/components/ui/mainButton";
import React, { JSX } from "react";

interface PinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function PinkButton({ children, ...props }: PinkButtonProps): JSX.Element {
  return (
    <Button
      className="w-[135px] h-[136px] rounded-full bg-pink-200 hover:bg-pink-300 transition-colors shadow-md p-0"
      aria-label="Pink button"
      {...props}
    >
      {children}
    </Button>
  );
}
