
'use client';

import LumoMascot from "@/components/lumo/LumoMascot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Mood } from "./MoodSelector";
import Chat from "./Chat";
import Challenges, { challenges } from "./Challenges";
import Stories, { motivationalStories } from "./Stories";
import { useState, useCallback, useEffect } from "react";

type DashboardProps = {
  mood: Mood;
};

type Challenge = {
  title: string;
  description: string;
};

type Story = {
  id: number;
  text: string;
};

const getGreeting = (moodName: string) => {
  switch (moodName.toLowerCase()) {
    case 'happy':
      return "It's great to see you shining!";
    case 'sad':
      return "It's okay to not be okay. I'm here for you.";
    case 'stressed':
      return "Let's find a moment of calm together.";
    case 'anxious':
      return "Take a deep breath. We'll get through this.";
    case 'calm':
      return "Feeling serene. Let's cherish this peace.";
    default:
      return "I'm here to listen.";
  }
};

export default function Dashboard({ mood }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('chat');
  const [isClient, setIsClient] = useState(false);

  // Story state
  const [story, setStory] = useState<Story | null>(null);
  const pickRandomStory = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * motivationalStories.length);
    setStory(motivationalStories[randomIndex]);
  }, []);

  // Challenge state
  const moodChallenges = challenges[mood.name.toLowerCase()] || [];
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const pickRandomChallenge = useCallback(() => {
    if (moodChallenges.length > 0) {
      const randomIndex = Math.floor(Math.random() * moodChallenges.length);
      setChallenge(moodChallenges[randomIndex]);
    }
  }, [moodChallenges]);

  // Set initial story and challenge on client mount to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    pickRandomStory();
    pickRandomChallenge();
  }, [pickRandomStory, pickRandomChallenge]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'stories') {
      pickRandomStory();
    }
    if (value === 'challenges') {
      pickRandomChallenge();
    }
  }

  const challengeContent = isClient ? <Challenges challenge={challenge} onNewChallenge={pickRandomChallenge} /> : <Challenges challenge={null} onNewChallenge={() => {}} />;
  const storiesContent = isClient ? <Stories story={story} onNewStory={pickRandomStory} /> : <Stories story={null} onNewStory={() => {}} />;

  return (
    <div className="w-full">
      <div className="flex flex-col items-center text-center">
        <LumoMascot className="h-20 w-20" />
        <h2 className="mt-4 text-2xl font-bold font-headline">
          Hello there,
        </h2>
        <p className="text-muted-foreground">{getGreeting(mood.name)}</p>
      </div>

      <Tabs defaultValue="chat" className="mt-6 w-full" onValueChange={handleTabChange} value={activeTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">Chat with Lumo</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="mt-4">
          <Chat mood={mood} />
        </TabsContent>
        <TabsContent value="challenges" className="mt-4">
          {challengeContent}
        </TabsContent>
        <TabsContent value="stories" className="mt-4">
          {storiesContent}
        </TabsContent>
      </Tabs>
    </div>
  );
}
