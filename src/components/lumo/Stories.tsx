'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const motivationalStories = [
  { id: 1, text: "I was feeling incredibly overwhelmed with work. Taking just five minutes to step outside and focus on my breath made a world of difference. It didn't solve my problems, but it gave me the clarity to tackle them one by one." },
  { id: 2, text: "After a tough breakup, I felt so alone. I started writing down one good thing that happened each day, no matter how small. Slowly, it helped me see that there was still light in my life, even during the darkness." },
  { id: 3, text: "Anxiety used to rule my days. Learning the 5-4-3-2-1 grounding technique was a game-changer. It pulls me out of my head and back into the present moment. It's a simple tool, but it's been so powerful for me." },
  { id: 4, text: "I used to think being happy meant never being sad. I've learned that it's okay to have down days. Allowing myself to feel sad without judgment has ironically helped me find more consistent happiness." },
  { id: 5, text: "I started a 'smile file' on my phone - a collection of funny memes, cute animal pictures, and happy memories. Whenever I'm feeling low, I scroll through it. It's a quick and easy way to get a little mood boost." },
];

export default function Stories() {
  const [favorited, setFavorited] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number) => {
    setFavorited(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <ScrollArea className="h-[60vh]">
      <div className="space-y-4 pr-4">
        {motivationalStories.map((story) => (
          <Card key={story.id} className="bg-card flex flex-col">
            <CardContent className="p-4 flex-1">
              <p className="text-sm text-foreground italic">"{story.text}"</p>
            </CardContent>
            <CardFooter className="p-2 pt-0 self-end">
              <Button 
                variant="ghost" 
                size="icon"
                aria-label={favorited.has(story.id) ? 'Unfavorite story' : 'Favorite story'}
                onClick={() => toggleFavorite(story.id)}
                className="group"
                >
                <Heart className={cn('h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-destructive', 
                    favorited.has(story.id) && 'fill-destructive text-destructive')} 
                />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
