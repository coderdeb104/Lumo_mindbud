
'use server';

/**
 * @fileOverview An empathetic AI chatbot flow named Lumo that provides support and coping suggestions based on the user\'s selected mood.
 *
 * - chatWithLumo - A function that handles the chat with Lumo process.
 * - ChatWithLumoInput - The input type for the chatWithLumo function.
 * - ChatWithLumoOutput - The return type for the chatWithLumo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/googleai';

const ChatWithLumoInputSchema = z.object({
  mood: z
    .string()
    .describe('The user selected mood (e.g., happy, sad, stressed).'),
  message: z.string().describe('The user message to Lumo.'),
});
export type ChatWithLumoInput = z.infer<typeof ChatWithLumoInputSchema>;

const ChatWithLumoOutputSchema = z.object({
  response: z.string().describe("Lumo's response to the user message."),
  audio: z
    .string()
    .optional()
    .describe('A data URI of the audio response from Lumo.'),
});
export type ChatWithLumoOutput = z.infer<typeof ChatWithLumoOutputSchema>;

export async function chatWithLumo(
  input: ChatWithLumoInput
): Promise<ChatWithLumoOutput> {
  return chatWithLumoFlow(input);
}

const chatWithLumoFlow = ai.defineFlow(
  {
    name: 'chatWithLumoFlow',
    inputSchema: ChatWithLumoInputSchema,
    outputSchema: ChatWithLumoOutputSchema,
  },
  async ({mood, message}) => {
    const prompt = `You are Lumo, an empathetic AI chatbot. Your tone should be friendly and conversational, like a real human friend. Keep your responses short and supportive.

    The user is feeling ${mood} and has sent the following message:
    ${message}

    Respond with empathy and offer a brief, relevant coping suggestion.`;

    const {text} = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt,
    });

    if (!text) {
      throw new Error('No text response from Lumo');
    }

    return {
      response: text,
    };
  }
);
