import { Background } from "@/components/ui/background"
import { Button } from "@/components/ui/mainButton"
import PinkButton from "@/components/ui/setting"

export default function Team() {
  return (
    <main className="relative min-h-screen w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <Background imagePath="/bg.jpg" />
      </div>

      <div>
        <PinkButton imageSrc="/settings.png" navigateTo="/settings"></PinkButton>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-0">
        <h1 className="text-[64px] text-weight-[2000] leading-[145px] text-center font-impact font-bold bg-gradient-to-r from-[#213D9B] to-[#6F40A7] text-transparent bg-clip-text text-shadow-custom">
          CHOOSING THE TEAM
        </h1>
      </div>

      
    </main>
  );
}