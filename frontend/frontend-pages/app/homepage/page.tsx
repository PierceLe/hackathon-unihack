import { Background } from "@/components/ui/background";
import { Button } from "@/components/ui/mainButton";
import PinkButton from "@/components/ui/setting";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <Background imagePath="/bg.jpg" />
      </div>

      {/* Settings Button */}
      <div className="absolute top-4 left-4">
        <PinkButton imageSrc="/settings.png" />
      </div>

      {/* Content with three buttons in the center */}
      <div className="flex w-full max-w-[1500px] justify-between px-12 gap-16">
        <Button navigateTo="/homepage/github">
            <p className="text-secondary text-[24px]">
                Click here for Github
            </p>
            
        </Button>
        <Button navigateTo="/homepage/chatbox">
            <p className="text-secondary text-[24px]">
                Click here for Chatbox
            </p>
        </Button>
        <Button navigateTo="/homepage/kanban">
            <p className="text-secondary text-[24px]">
                Click here for Timeline Board
            </p>
        </Button>
      </div>
    </main>
  );
}
