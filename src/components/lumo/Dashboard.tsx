import LumoMascot from "@/components/lumo/LumoMascot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Mood } from "./MoodSelector";
import Chat from "./Chat";
import Challenges from "./Challenges";
import Stories from "./Stories";

type DashboardProps = {
  mood: Mood;
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
  return (
    <div className="w-full">
      <div className="flex flex-col items-center text-center">
        <LumoMascot className="h-20 w-20" />
        <h2 className="mt-4 text-2xl font-bold font-headline">
          Hello there,
        </h2>
        <p className="text-muted-foreground">{getGreeting(mood.name)}</p>
      </div>

      <Tabs defaultValue="chat" className="mt-6 w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">Chat with Lumo</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="mt-4">
          <Chat mood={mood} />
        </TabsContent>
        <TabsContent value="challenges" className="mt-4" forceMount>
         <Challenges mood={mood} />
        </TabsContent>
        <TabsContent value="stories" className="mt-4" forceMount>
          <Stories />
        </TabsContent>
      </Tabs>
    </div>
  );
}
