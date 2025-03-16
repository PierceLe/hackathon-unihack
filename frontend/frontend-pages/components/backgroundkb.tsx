import Image from "next/image";

interface BackgroundProps {
  imagePath: string;
  className?: string;
}

export function Background({ imagePath, className }: BackgroundProps) {
  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      <Image
        src={imagePath}
        alt="Background"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
