import Image from "next/image";

interface BackgroundProps {
  imagePath: string;
  className?: string;
}

export function Background({ imagePath, className }: BackgroundProps) {
  return (
    <div className={`relative w-screen h-screen bg-white overflow-hidden ${className}`}>
      <Image 
        src={imagePath} 
        alt="Background" 
        fill // New way to make the image cover the parent div
        className="object-cover" // Ensures the image fills the entire screen properly
        priority // Improves loading speed
      />
    </div>
  );
}
