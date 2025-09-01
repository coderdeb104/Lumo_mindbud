'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatWithLumo } from '@/ai/flows/chat-with-lumo';
import type { Mood } from './MoodSelector';
import { cn } from '@/lib/utils';
import LumoMascot from './LumoMascot';
import { Mic, SendHorizonal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'lumo';
  content: string;
  audio?: string;
};

type ChatProps = {
  mood: Mood;
};

export default function Chat({ mood }: ChatProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'lumo',
      content: `I see you're feeling ${mood.name.toLowerCase()} today. What's on your mind?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatWithLumo({ mood: mood.name, message: input });
      const lumoMessage: Message = { role: 'lumo', content: result.response, audio: result.audio };
      setMessages((prev) => [...prev, lumoMessage]);
    } catch (error) {
      console.error('Error chatting with Lumo:', error);
      toast({
        variant: "destructive",
        title: "Oh no!",
        description: "I'm having a little trouble connecting. Please try again in a moment.",
      });
      setMessages((prev) => prev.slice(0, prev.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (audioSrc: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
  };

  return (
    <div className="flex flex-col h-[60vh] rounded-lg border bg-card">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              {message.role === 'lumo' && (
                <div className="w-8 h-8 flex-shrink-0">
                  <LumoMascot />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[80%] rounded-lg p-3 text-sm flex items-center gap-2',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <span>{message.content}</span>
                {message.role === 'lumo' && message.audio && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={() => playAudio(message.audio as string)}
                  >
                    <Mic className="h-4 w-4" />
                    <span className="sr-only">Play audio</span>
                  </Button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3 flex-row">
                <div className="w-8 h-8 flex-shrink-0">
                  <LumoMascot />
                </div>
                <div className="max-w-[80%] rounded-lg p-3 text-sm bg-muted">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-foreground/50 animate-pulse delay-0"></span>
                        <span className="h-2 w-2 rounded-full bg-foreground/50 animate-pulse delay-150"></span>
                        <span className="h-2 w-2 rounded-full bg-foreground/50 animate-pulse delay-300"></span>
                    </div>
                </div>
             </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            autoComplete="off"
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <SendHorizonal className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
