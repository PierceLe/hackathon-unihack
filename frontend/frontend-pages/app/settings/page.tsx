import { Background } from "@/components/ui/background"
import PButton from "@/components/ui/navbutton";

export default function Settings() {
  return (
    <main className="relative min-h-screen w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <Background imagePath="/bg.jpg" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-32">
        <h1 className="text-[86px] text-weight-[2000] leading-[145px] text-center font-impact font-bold bg-gradient-to-r from-[#213D9B] to-[#6F40A7] text-transparent bg-clip-text text-shadow-custom">
          SETTINGS
        </h1>

      </div>

      
    </main>
  );
}