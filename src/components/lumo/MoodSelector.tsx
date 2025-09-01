"use client";

import { Feather, Frown, Smile } from "lucide-react";
import { StressedIcon, AnxiousIcon } from "./icons";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type Mood = {
  name: string;
  icon: ReactNode;
  color: string;
};

const moods: Mood[] = [
  { name: "Happy", icon: <Smile />, color: "bg-yellow-200/50 text-yellow-700" },
  { name: "Sad", icon: <Frown />, color: "bg-blue-200/50 text-blue-700" },
  { name: "Stressed", icon: <StressedIcon />, color: "bg-orange-200/50 text-orange-700" },
  { name: "Anxious", icon: <AnxiousIcon />, color: "bg-purple-200/50 text-purple-700" },
  { name: "Calm", icon: <Feather />, color: "bg-green-200/50 text-green-700" },
];

type MoodSelectorProps = {
  onSelectMood: (mood: Mood) => void;
};

export default function MoodSelector({ onSelectMood }: MoodSelectorProps) {
  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {moods.map((mood) => (
        <button
          key={mood.name}
          onClick={() => onSelectMood(mood)}
          className="group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
        >
          <Card className={cn(
            "flex flex-col items-center justify-center p-4 aspect-square transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg",
            mood.color
          )}>
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
              {mood.icon}
            </div>
            <p className="mt-3 text-sm md:text-base font-semibold text-center">{mood.name}</p>
          </Card>
        </button>
      ))}
    </div>
  );
}
