'use server';

/**
 * @fileOverview An empathetic AI chatbot flow named Lumo that provides support and coping suggestions based on the user's selected mood.
 *
 * - chatWithLumo - A function that handles the chat with Lumo process.
 * - ChatWithLumoInput - The input type for the chatWithLumo function.
 * - ChatWithLumoOutput - The return type for the chatWithLumo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithLumoInputSchema = z.object({
  mood: z
    .string()
    .describe('The user selected mood (e.g., happy, sad, stressed).'),
  message: z.string().describe('The user message to Lumo.'),
});
export type ChatWithLumoInput = z.infer<typeof ChatWithLumoInputSchema>;

const ChatWithLumoOutputSchema = z.object({
  response: z.string().describe('Lumo\'s response to the user message.'),
});
export type ChatWithLumoOutput = z.infer<typeof ChatWithLumoOutputSchema>;

export async function chatWithLumo(input: ChatWithLumoInput): Promise<ChatWithLumoOutput> {
  return chatWithLumoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithLumoPrompt',
  input: {schema: ChatWithLumoInputSchema},
  output: {schema: ChatWithLumoOutputSchema},
  prompt: `You are Lumo, an empathetic AI chatbot designed to provide support and coping suggestions based on the user\'s selected mood.

  The user is feeling {{{mood}}} and has sent the following message:
  {{{message}}}

  Respond with empathy and offer relevant coping suggestions.
  `,
});

const chatWithLumoFlow = ai.defineFlow(
  {
    name: 'chatWithLumoFlow',
    inputSchema: ChatWithLumoInputSchema,
    outputSchema: ChatWithLumoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
