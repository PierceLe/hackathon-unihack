'use client';
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation"; // Import useRouter

import { cn } from "@/lib/utils";

// Define button variants
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[94px] text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none relative cursor-pointer active:translate-y-1 active:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.25)]",
  {
    variants: {
      variant: {
        default: "bg-[#f5b3e1]/40 text-white shadow-[0px_4px_0px_0px_rgba(0,0,0,0.25)] hover:bg-[#dc60ca]/50",
      },
      size: {
        sm: "w-[200px] h-[50px]",
        md: "w-[300px] h-[80px]",
        lg: "w-[400px] h-[120px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Box component (decorative element)
function Box(): React.JSX.Element {
  return (
    <div className="absolute left-4 top-4 w-[41px] h-[43px]">
      {/* Gradient overlay */}
      <div
        className="absolute w-9 h-[23px] top-0 left-0 rounded-[18.11px/11.67px] rotate-[-49.83deg]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 25%, rgba(153,153,153,0) 100%)",
        }}
      />
    </div>
  );
}

// Define ButtonProps interface to handle props, including the navigateTo prop
interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  navigateTo?: string; // Optional navigateTo prop
}

// Button component with the Box inside
function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  navigateTo,
  ...props
}: ButtonProps) {
  const router = useRouter(); // Initialize useRouter
  
  // Handle button click to navigate if navigateTo is provided
  const handleClick = () => {
    if (navigateTo) {
      router.push(navigateTo); // Navigate to the provided route
    }
  };

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      onClick={handleClick} // Add onClick to handle navigation
      className={cn("relative overflow-hidden rounded-full", buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      <Box /> {/* Include the Box inside the button */}
    </Comp>
  );
}

export { Button, buttonVariants };
