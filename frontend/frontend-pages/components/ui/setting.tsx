'use client';
import { Button } from "@/components/ui/mainButton";
import React, { JSX } from "react";

interface PinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

export default function PinkButton({ children, imageSrc, imageAlt = "Button Image", ...props }: PinkButtonProps): JSX.Element {
  return (
    <Button
      className="rounded-full w-[80px] h-[80px] bg-pink-200 hover:bg-pink-300 transition-colors shadow-md p-0 ml-2 mt-2"
      aria-label="Pink button"
      {...props}
    >
      {imageSrc && <img src={imageSrc} alt={imageAlt} className="w-[50%] h-[50%] object-contain" />}
      {children}
    </Button>
  );
}
