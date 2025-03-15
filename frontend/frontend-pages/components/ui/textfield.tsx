// components/Box.tsx
import { Card } from "@/components/ui/card";
import React, { JSX} from "react";

interface BoxProps {
  text: string;
}

export default function Box({ text }: BoxProps): JSX.Element {
  return (
    <div className="w-full max-w-[1201px] h-[668px] bg-[#f3cae7] rounded-[50px] shadow-[inset_0px_6px_10px_#d89ec280,10px_10px_4px_#b18fa580,-10px_-10px_4px_#b28fa680] flex items-center justify-center">
      <div className="p-8 border-4 border-solid border-[#d89ec2] rounded-lg">
        <p className="text-center text-lg font-semibold text-[#333]">
          {text}
        </p>
      </div>
    </div>
  );
}
