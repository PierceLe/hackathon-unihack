import React, { JSX } from "react";
import { Background } from "@/components/backgroundkb"; // Import Background component
import { Button } from "@/components/ui/mainButton";
import Vote from "@/components/ui/buttonfield";

export default function Page(): JSX.Element {

  return (
    <div className="relative min-h-screen">
      {/* Background as the lowest layer */}
      <Background imagePath="/bg.jpg" />

      {/* Box component on top of the background, with proper centering */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <Vote />
      </div>
    </div>
  );
}