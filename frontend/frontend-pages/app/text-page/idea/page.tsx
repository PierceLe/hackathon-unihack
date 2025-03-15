import React, { JSX } from "react";
import Box from "@/components/ui/textfield"; // Adjust the import path for your Box component
import { Background } from "@/components/ui/background"; // Import Background component

export default function Page(): JSX.Element {
  const textContent = "This is dynamic text passed from the page.";

  return (
    <div className="relative min-h-screen">
      {/* Background as the lowest layer */}
      <Background imagePath="/bg.jpg" />

      {/* Box component on top of the background, with proper centering */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <Box text={textContent} />
      </div>
    </div>
  );
}
