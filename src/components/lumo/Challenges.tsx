
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";

type Challenge = {
  title: string;
  description: string;
};

export const challenges: Record<string, Challenge[]> = {
  happy: [
    { title: "Share Your Joy", description: "Tell a friend or family member what's making you happy today." },
    { title: "Gratitude List", description: "Write down three things you're grateful for right now." },
    { title: "Plan a Fun Activity", description: "Schedule something you enjoy for later this week." },
  ],
  sad: [
    { title: "Mindful Listening", description: "Listen to a favorite comforting song without any distractions." },
    { title: "Gentle Movement", description: "Do a 10-minute gentle stretch or go for a short, slow walk." },
    { title: "Express Yourself", description: "Write down your feelings in a journal or draw how you feel." },
  ],
  stressed: [
    { title: "Box Breathing", description: "Inhale for 4s, hold for 4s, exhale for 4s, hold for 4s. Repeat 5 times." },
    { title: "Brain Dump", description: "Write down everything on your mind for 5 minutes to clear your head." },
    { title: "Digital Detox", description: "Put your phone away and stay off screens for at least 15 minutes." },
  ],
  anxious: [
    { title: "5-4-3-2-1 Grounding", description: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste." },
    { title: "Worry Time", description: "Set a 10-minute timer to allow yourself to worry, then let it go for now." },
    { title: "Cold Water Splash", description: "Splash your face with cold water to help reset your nervous system." },
  ],
  calm: [
    { title: "Savor the Moment", description: "Close your eyes and focus on the feeling of peace for two minutes." },
    { title: "Mindful Observation", description: "Look out a window and notice the small details of what you see." },
    { title: "Nourish Yourself", description: "Enjoy a warm, comforting drink like herbal tea or hot cocoa." },
  ],
};

type ChallengesProps = {
  challenge: Challenge | null;
  onNewChallenge: () => void;
};

export default function Challenges({ challenge, onNewChallenge }: ChallengesProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !challenge) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p>Loading challenge...</p>
      </div>
    );
  }

  return (
    <div className="h-[60vh] flex flex-col justify-center items-center space-y-4">
        <Card className="bg-card w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">{challenge.title}</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <p className="text-sm text-muted-foreground">{challenge.description}</p>
            </CardContent>
        </Card>
        <Button onClick={onNewChallenge} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            New Challenge
        </Button>
    </div>
  );
}
