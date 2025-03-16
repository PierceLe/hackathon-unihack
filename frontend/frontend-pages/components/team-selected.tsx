"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/mainButton";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SelectedMember } from "../types.ts";
import { teamMembers } from "../data/team-member";
import { cn } from "@/lib/utils";

export default function TeamSelector() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMembers, setSelectedMembers] = useState<SelectedMember[]>([]);
  const currentMember = teamMembers[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  const handleInvite = () => {
    if (
      selectedMembers.length < 5 &&
      !selectedMembers.find((m) => m.id === currentMember.id)
    ) {
      setSelectedMembers([
        ...selectedMembers,
        {
          id: currentMember.id,
          name: currentMember.name,
          avatarUrl: currentMember.avatarUrl,
          position: currentMember.position,
          modelId: currentMember.modelId,
        },
      ]);
    }
  };

  const handleLockIn = () => {
    if (selectedMembers.length === 5) {
      const memberIds = selectedMembers.map((m) => m.id).join(",");
      // router.push(`/chat?selected=${memberIds}`);
      router.push(`/text-page/idea?selected=${memberIds}`);
    }
  };

  const handleBack = () => {
    // Remove the last selected member
    setSelectedMembers((prevSelectedMembers) =>
      prevSelectedMembers.slice(0, -1)
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      {/* Main Card Section */}
      <div className="flex items-center justify-center gap-8 mt-8">
        <button
          className="rounded-full bg-pink-100/80 w-16 h-16 flex items-center justify-center"
          onClick={handlePrevious}
        >
          <ChevronLeft className="w-8 h-8 text-purple-800" />
        </button>

        <Card className="w-[400px] h-[250px] relative overflow-hidden">
          <div
            className="absolute inset-0 left-0 w-full h-[94px]"
            style={{ backgroundColor: currentMember.color }}
          />
          <div
            className={cn(
              "absolute top-0 w-full h-24",
              currentMember.accentColor
            )}
          />
          <div className="relative h-full flex flex-col items-center pt-2">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage src={currentMember.avatarUrl} />
              <AvatarFallback>{currentMember.name[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-3xl font-bold mt-4">{currentMember.name}</h2>
            <p className="text-lg text-gray-600">
              Position: {currentMember.position}
            </p>
            <p className="text-lg text-gray-600">
              Advantage: {currentMember.advantage}
            </p>
          </div>
        </Card>

        <button
          className="rounded-full bg-pink-100/80 w-16 h-16 flex items-center justify-center"
          onClick={handleNext}
        >
          <ChevronRight className="w-8 h-8 text-purple-800" />
        </button>
      </div>

      {/* Invite Button */}
      <div className="flex justify-center">
        <Button
          className="rounded-full px-12 py-6 text-xl bg-pink-200 hover:bg-pink-300 text-purple-800"
          onClick={handleInvite}
          disabled={
            selectedMembers.length >= 5 ||
            selectedMembers.some((m) => m.id === currentMember.id)
          }
        >
          Invite
        </Button>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex justify-between items-center px-8 mt-8">
        <div className="flex gap-4">
          {[...Array(5)].map((_, index) => (
            <Avatar
              key={index}
              className={cn(
                "w-12 h-12",
                selectedMembers[index] ? "bg-yellow-200" : "bg-yellow-100"
              )}
            >
              {selectedMembers[index] && (
                <AvatarImage src={selectedMembers[index].avatarUrl} />
              )}
            </Avatar>
          ))}
        </div>

        <Button
          className="rounded-full px-12 py-6 text-xl bg-pink-200 hover:bg-pink-300 text-purple-800"
          onClick={handleBack}
          disabled={selectedMembers.length === 0}
        >
          Back
        </Button>
        <Button
          className="rounded-full px-12 py-6 text-xl bg-pink-200 hover:bg-pink-300 text-purple-800"
          onClick={handleLockIn}
          disabled={selectedMembers.length < 5}
        >
          Lock in
        </Button>
      </div>
    </div>
  );
}
