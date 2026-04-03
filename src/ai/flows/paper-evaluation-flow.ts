'use server';
/**
 * @fileOverview This file defines a Genkit flow for critically evaluating research papers.
 * It provides structured feedback on strengths, weaknesses, novelty, and publication readiness.
 * Supports text-based input and PDF document uploads.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PaperEvaluationInputSchema = z.object({
  title: z.string().describe('The title of the research paper.'),
  abstract: z.string().optional().describe('The abstract or extracted text of the research paper.'),
  pdfDataUri: z.string().optional().describe("The research paper as a PDF, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."),
  authors: z.array(z.string()).optional().describe('List of authors.'),
  publicationYear: z.number().optional().describe('Year of publication.'),
});
export type PaperEvaluationInput = z.infer<typeof PaperEvaluationInputSchema>;

const PaperEvaluationOutputSchema = z.object({
  summary: z.string().describe('2-3 line summary of what the paper is about.'),
  strengths: z.array(z.string()).describe('Clear bullet points of what is good.'),
  weaknesses: z.array(z.string()).describe('Specific problems in the paper.'),
  missingElements: z.array(z.string()).describe('Important academic components that are missing (e.g., evaluation metrics, baseline comparison).'),
  suggestions: z.array(z.string()).describe('Actionable, specific steps to improve the paper.'),
  novelty: z.object({
    assessment: z.string().describe('Is the idea novel or common?'),
    justification: z.string().describe('Brief justification for the novelty assessment.'),
  }),
  readiness: z.object({
    score: z.number().min(0).max(10).describe('Publication readiness score out of 10.'),
    reason: z.string().describe('Brief reason for the assigned score.'),
  }),
  enhancements: z.array(z.string()).describe('What can be added to make it stronger (e.g., experiments, datasets).'),
});
export type PaperEvaluationOutput = z.infer<typeof PaperEvaluationOutputSchema>;

export async function evaluateResearchPaper(
  input: PaperEvaluationInput
): Promise<PaperEvaluationOutput> {
  return paperEvaluationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'paperEvaluationPrompt',
  input: { schema: PaperEvaluationInputSchema },
  output: { schema: PaperEvaluationOutputSchema },
  prompt: `You are an elite academic peer reviewer for high-impact journals (e.g., Nature, NEJM, CVPR, NeurIPS).
Your task is to critically evaluate the provided research paper and provide structured, actionable feedback to improve its quality and publication readiness.

Paper Details:
Title: {{{title}}}
{{#if abstract}}Abstract/Text: {{{abstract}}}{{/if}}
{{#if pdfDataUri}}A full PDF document has been provided for your review: {{media url=pdfDataUri}}{{/if}}
{{#if authors}}Authors: {{#each authors}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}
{{#if publicationYear}}Year: {{{publicationYear}}}{{/if}}

STRICT CRITICAL REVIEW GUIDELINES:
1. **Persona**: Be an uncompromising but constructive elite reviewer.
2. **No Generative Fluff**: Do NOT use phrases like "The paper is interesting" or "Good work". Get straight to the technical critique.
3. **Specific Weaknesses**: Identify specific flaws in methodology, statistical significance, lack of baselines, or clarity.
4. **Missing Elements**: Be precise. If they didn't use a specific metric (e.g., F1-score for imbalanced data) or a specific baseline, name it.
5. **Novelty Check**: Is this a derivative of existing work (e.g., "just another transformer application") or a genuine step forward? Be blunt.
6. **Publication Readiness**: A score of 8+ should only be given to papers that look ready for a top-tier venue.
7. **Source Material**: Use the provided text and PDF content as the absolute source of truth. If a methodology or result is missing from the input, state "Methodology is absent in provided text" rather than guessing.
8. **Actionable Suggestions**: Every suggestion must be a clear task (e.g., "Conduct a sensitivity analysis on parameter X" rather than "Improve the analysis").
9. **References**: If citations are missing or outdated for the current year context (2024-2025), highlight it as a weakness.

Structure your response strictly according to the output schema.`,
});

const paperEvaluationFlow = ai.defineFlow(
  {
    name: 'paperEvaluationFlow',
    inputSchema: PaperEvaluationInputSchema,
    outputSchema: PaperEvaluationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Evaluation failed to generate.');
    }
    return output;
  }
);
