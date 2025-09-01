
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
    .describe('A data URI of the audio response from Lumo.'),
});
export type ChatWithLumoOutput = z.infer<typeof ChatWithLumoOutputSchema>;

export async function chatWithLumo(
  input: ChatWithLumoInput
): Promise<ChatWithLumoOutput> {
  return chatWithLumoFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
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

    const {text, media} = await ai.generate({
      prompt,
      config: {
        responseModalities: ['TEXT', 'AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Leda'},
          },
        },
      },
    });

    if (!text) {
      throw new Error('No text response from Lumo');
    }
    if (!media) {
      throw new Error('no media returned');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const audioWav = await toWav(audioBuffer);

    return {
      response: text,
      audio: 'data:audio/wav;base64,' + audioWav,
    };
  }
);
