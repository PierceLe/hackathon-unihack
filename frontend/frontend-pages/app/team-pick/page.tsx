import { Background } from "@/components/ui/background";
import PinkButton from "@/components/ui/setting";
import TeamSelector from "@/components/team-selected";

export default function Team() {
  return (
    <main className="relative min-h-screen w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <Background imagePath="/bg.jpg" />
      </div>

      <div className="absolute top-4 left-4 z-20">
        <PinkButton
          imageSrc="/settings.png"
          navigateTo="/settings"
        ></PinkButton>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-4">
        <h1 className="text-[64px] text-weight-[2000] leading-[145px] text-center font-impact font-bold bg-gradient-to-r from-[#213D9B] to-[#6F40A7] text-transparent bg-clip-text text-shadow-custom">
          CHOOSING THE TEAM
        </h1>

        {/* Team Selector Component */}
        <div className="w-full flex-1 flex flex-col">
          <TeamSelector />
        </div>
      </div>
    </main>
  );
}
