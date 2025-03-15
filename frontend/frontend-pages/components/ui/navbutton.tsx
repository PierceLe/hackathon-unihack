import React from "react";
import { Button } from "@/components/ui/mainButton";
import { ArrowLeft, LogOut } from "lucide-react";

interface NavigationButtonsProps {
  onBackClick?: () => void;
  onExitClick?: () => void;
}

const NavigationButtons = ({
  onBackClick = () => console.log("Back button clicked"),
  onExitClick = () => console.log("Exit button clicked"),
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-center gap-16 p-6 w-full bg-transparent">
      <div className="flex flex-col items-center">
        <Button
          className="h-16 w-16 rounded-full bg-white/80 hover:bg-white/90 shadow-md"
          onClick={onBackClick}
        >
          <ArrowLeft className="h-8 w-8 text-purple-600" />
        </Button>
        <span className="mt-2 text-sm font-medium text-purple-800">Back</span>
      </div>

      <div className="flex flex-col items-center">
        <Button
          className="h-16 w-16 rounded-full bg-white/80 hover:bg-white/90 shadow-md"
          onClick={onExitClick}
        >
          <LogOut className="h-8 w-8 text-purple-600" />
        </Button>
        <span className="mt-2 text-sm font-medium text-purple-800">Exit</span>
      </div>
    </div>
  );
};

export default NavigationButtons;
