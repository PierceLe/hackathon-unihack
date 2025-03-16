// components/Box.tsx
import React, { JSX} from "react";

interface BoxProps {
  text: string;

}

export default function Box({ text }: BoxProps): JSX.Element {
  return (
    <div className="w-full max-w-[800px] h-[400px] bg-[#f3cae7] rounded-[50px] flex items-center justify-center">
      <div className="p-8  border-[#d89ec2] rounded-lg">
        <p className="text-center text-[32px] font-semibold text-[#333]">
          {text}
        </p>
      </div>
    </div>
  );
}

