'use server';

/**
 * @fileOverview AI-powered chapter summary generator.
 *
 * - generateChapterSummary - A function that generates a concise summary of a given chapter.
 * - GenerateChapterSummaryInput - The input type for the generateChapterSummary function.
 * - GenerateChapterSummaryOutput - The return type for the generateChapterSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateChapterSummaryInputSchema = z.object({
  chapterContent: z
    .string()
    .describe('The complete text content of the chapter to be summarized.'),
});
export type GenerateChapterSummaryInput = z.infer<
  typeof GenerateChapterSummaryInputSchema
>;

const GenerateChapterSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the chapter content.'),
});
export type GenerateChapterSummaryOutput = z.infer<
  typeof GenerateChapterSummaryOutputSchema
>;

export async function generateChapterSummary(
  input: GenerateChapterSummaryInput
): Promise<GenerateChapterSummaryOutput> {
  return generateChapterSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateChapterSummaryPrompt',
  input: {schema: GenerateChapterSummaryInputSchema},
  output: {schema: GenerateChapterSummaryOutputSchema},
  prompt: `You are an expert literary summarizer. Please provide a concise and informative summary of the following chapter content:

{{{chapterContent}}}

Focus on the key plot points, characters, and themes.  The summary should be no more than 200 words.`,
});

const generateChapterSummaryFlow = ai.defineFlow(
  {
    name: 'generateChapterSummaryFlow',
    inputSchema: GenerateChapterSummaryInputSchema,
    outputSchema: GenerateChapterSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
