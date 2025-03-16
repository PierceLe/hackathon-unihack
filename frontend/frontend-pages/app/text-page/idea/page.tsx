"use client";

import React, { JSX } from "react";
import Box from "@/components/ui/textfield"; // Adjust the import path for your Box component
import { Background } from "@/components/backgroundkb"; // Import Background component
import { Button } from "@/components/ui/mainButton";
import { useSearchParams } from "next/navigation";

export default function Page(): JSX.Element {
  const searchParams = useSearchParams();
  const selected = searchParams.get("selected");
  const nextPath = `/chat?selected=${selected}`;
  const textContent =
    "You have two project options: a TODO LIST APP and a STUDENT MANAGEMENT APP. Your goal is to convince your teammate to choose one based on their responses in the chat. Pay attention to their preferences and adapt your argument to guide them toward the best choice.";

  return (
    <div className="relative min-h-screen">
      {/* Background as the lowest layer */}
      <Background imagePath="/bg.jpg" />

      {/* Box component on top of the background, with proper centering */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <Box text={textContent} />
        <Button className="mt-8" navigateTo={nextPath}>
          <div className="text-secondary text-[40px]">Let's chat!</div>
        </Button>
      </div>
    </div>
  );
}
