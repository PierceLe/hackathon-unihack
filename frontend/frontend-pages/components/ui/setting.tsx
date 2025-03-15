'use client';
import { Button } from "@/components/ui/mainButton";
import React, { JSX } from "react";
import { useRouter } from "next/navigation";

interface PinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  navigateTo?: string; // Make it optional
}

export default function PinkButton({ 
  children, 
  imageSrc, 
  imageAlt = "Button Image", 
  navigateTo, 
  ...props 
}: PinkButtonProps): JSX.Element {
  const router = useRouter();

  const handleClick = () => {
      router.push("/settings");
  };

  return (
    <Button
      className="rounded-full w-[80px] h-[80px] bg-pink-200 hover:bg-pink-300 transition-colors shadow-md p-0 ml-2 mt-2"
      aria-label="Pink button"
      onClick={handleClick} // Attach the navigation function
      {...props}
    >
      {imageSrc && <img src={imageSrc} alt={imageAlt} className="w-[50%] h-[50%] object-contain" />}
      {children}
    </Button>
  );
}
