'use client';

import { useState } from 'react';
import type { Mood } from '@/components/lumo/MoodSelector';
import MoodSelector from '@/components/lumo/MoodSelector';
import Dashboard from '@/components/lumo/Dashboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LumoMascot from '@/components/lumo/LumoMascot';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [mood, setMood] = useState<Mood | null>(null);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8 overflow-hidden">
      <div className="w-full max-w-2xl relative">
        <AnimatePresence mode="wait">
          {mood ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="relative w-full"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMood(null)}
                className="absolute -top-12 left-0 flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Change Mood
              </Button>
              <Dashboard mood={mood} />
            </motion.div>
          ) : (
            <motion.div
              key="mood-selector"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="text-center"
            >
              <LumoMascot className="mx-auto h-24 w-24 md:h-32 md:w-32" />
              <h1 className="mt-6 font-headline text-3xl font-bold text-foreground md:text-4xl">
                Welcome to Lumo
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                How are you feeling today?
              </p>
              <MoodSelector onSelectMood={setMood} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
