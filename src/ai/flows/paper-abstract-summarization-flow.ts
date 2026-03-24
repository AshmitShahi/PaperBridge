'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing research paper abstracts.
 *
 * - summarizePaperAbstract - A function that handles the summarization of a paper abstract.
 * - PaperAbstractSummarizationInput - The input type for the summarizePaperAbstract function.
 * - PaperAbstractSummarizationOutput - The return type for the summarizePaperAbstract function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PaperAbstractSummarizationInputSchema = z.object({
  abstract: z.string().describe("The full abstract of the research paper to be summarized.")
});
export type PaperAbstractSummarizationInput = z.infer<typeof PaperAbstractSummarizationInputSchema>;

const PaperAbstractSummarizationOutputSchema = z.object({
  summary: z.string().describe("A concise, easy-to-understand summary of the paper's abstract.")
});
export type PaperAbstractSummarizationOutput = z.infer<typeof PaperAbstractSummarizationOutputSchema>;

export async function summarizePaperAbstract(
  input: PaperAbstractSummarizationInput
): Promise<PaperAbstractSummarizationOutput> {
  return paperAbstractSummarizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'paperAbstractSummarizationPrompt',
  input: {schema: PaperAbstractSummarizationInputSchema},
  output: {schema: PaperAbstractSummarizationOutputSchema},
  prompt: `You are an expert academic summarizer. Your task is to provide a concise, easy-to-understand summary of the following research paper abstract. Focus on the core problem, methodology, key findings, and main conclusions. The summary should be clear, brief, and accessible to a broad audience, avoiding jargon where possible.

Abstract:
{{{abstract}}}

Provide the summary in the specified JSON format.`,
});

const paperAbstractSummarizationFlow = ai.defineFlow(
  {
    name: 'paperAbstractSummarizationFlow',
    inputSchema: PaperAbstractSummarizationInputSchema,
    outputSchema: PaperAbstractSummarizationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
