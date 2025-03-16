// components/Box.tsx
import React, { JSX } from "react";
import { Button } from "./mainButton";

export default function Vote(): JSX.Element {
  return (
    <div className="w-full max-w-[800px] h-[400px] bg-[#f3cae7] rounded-[50px] flex items-center justify-center">
      <div className="p-8 border-[#d89ec2] rounded-lg flex flex-col gap-4">
        <p className="text-center text-[24px] font-semibold text-[#333]">
          You have two project options:
        </p>
        <Button navigateTo="/poker">TODO LIST</Button>
        <Button navigateTo="/poker">STUDENT MANAGEMENT</Button>
      </div>
    </div>
  );
}
