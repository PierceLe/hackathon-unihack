import React from "react";


interface AvatarProps {
    className?: string;
    children: React.ReactNode;
  }
const Avatar: React.FC<AvatarProps> = ({ className, children }) => {
  return (
    <div className="w-[116px] h-[109px] relative shadow-[0px_6px_10px_0px_rgba(230,179,212,0.50)] rounded-[94px]">
      <div className="w-[116px] h-[109px] left-0 top-0 absolute bg-[#dfcff2] rounded-[94px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
};

export default Avatar;
