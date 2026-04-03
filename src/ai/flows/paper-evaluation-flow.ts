'use server';
/**
 * @fileOverview This file defines a Genkit flow for critically evaluating research papers.
 * It provides structured feedback on strengths, weaknesses, novelty, and publication readiness.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PaperEvaluationInputSchema = z.object({
  title: z.string().describe('The title of the research paper.'),
  abstract: z.string().describe('The abstract or full text of the research paper.'),
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
Your task is to critically evaluate the provided research paper metadata and provide structured, actionable feedback to improve its quality and publication readiness.

Paper Details:
Title: {{{title}}}
Abstract: {{{abstract}}}
{{#if authors}}Authors: {{#each authors}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}
{{#if publicationYear}}Year: {{{publicationYear}}}{{/if}}

STRICT GUIDELINES:
1. Be precise, critical, and constructive.
2. Do NOT give generic feedback (e.g., "The paper is good").
3. Do NOT hallucinate missing details. If a methodology or metric is missing, explicitly state "Methodology is not clearly defined" or "Evaluation metrics are missing".
4. Use a professional academic tone, suitable for students and researchers.
5. Focus on improving the paper for real-world publication.
6. If the paper lacks depth, state it clearly.
7. If methodology is weak or unclear, highlight it.
8. If results are missing or not convincing, mention it explicitly.
9. If references are mentioned but seem outdated or insufficient based on the topic context, mention it.

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
