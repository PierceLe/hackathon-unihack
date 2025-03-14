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
      
    </main>
  );
}