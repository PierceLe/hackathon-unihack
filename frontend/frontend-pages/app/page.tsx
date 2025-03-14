import { Background } from "@/components/ui/background"
import { Button } from "@/components/ui/mainButton"
import PinkButton from "@/components/ui/setting"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <Background imagePath="/bg.jpg" />
      </div>

      <div>
        <PinkButton imageSrc="/settings.png"></PinkButton>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-4">
        {/* Title */}
        <h1 className="text-[84px] text-weight-[2000] leading-[145px] text-center font-anton font-bold bg-gradient-to-r from-[#213D9B] to-[#6F40A7] text-transparent bg-clip-text text-shadow-custom">
          HACKATHON SIMULATOR
        </h1>

        {/* Buttons Container - Using margin instead of flex gap */}
        <div className="flex flex-col items-center style-y-8" >
          <div className="pb-8">
            <Button size="lg" variant="default" navigateTo="/team-pick">
            <div className="text-primary">
              START
            </div>
            </Button>
          </div>
          <div className="pb-8">
            <Button size="lg">
            <div className="text-primary">
              CONTINUE
            </div>
            </Button>
          </div>
          <div>
            <Button size="lg">
            <div className="text-primary">
              INFO
            </div>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

