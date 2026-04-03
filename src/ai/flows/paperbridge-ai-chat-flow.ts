'use server';
/**
 * @fileOverview This file defines a Genkit flow for the PaperBridge AI chat feature.
 * It provides context-aware explanations based strictly on provided research papers.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PaperContextSchema = z.object({
  title: z.string(),
  abstract: z.string(),
  aiSummary: z.string(),
});

const PaperBridgeAiInputSchema = z.object({
  query: z.string().describe('The user\'s search query.'),
  papers: z.array(PaperContextSchema).describe('The list of research papers retrieved for the query.'),
});
export type PaperBridgeAiInput = z.infer<typeof PaperBridgeAiInputSchema>;

const PaperBridgeAiOutputSchema = z.object({
  explanation: z.string().describe('The structured AI explanation of the topic.'),
});
export type PaperBridgeAiOutput = z.infer<typeof PaperBridgeAiOutputSchema>;

export async function getPaperBridgeAiInsight(
  input: PaperBridgeAiInput
): Promise<PaperBridgeAiOutput> {
  return paperbridgeAiChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'paperbridgeAiChatPrompt',
  input: { schema: PaperBridgeAiInputSchema },
  output: { schema: PaperBridgeAiOutputSchema },
  prompt: `You are PaperBridge AI, a sophisticated research assistant for students. 
Your goal is to explain the user's query based ONLY on the provided research papers.

Guidelines:
1. Explain user queries in a clear, simple, and structured way.
2. Use ONLY the provided research paper context to generate answers.
3. Do NOT hallucinate or invent facts.
4. If the provided papers are insufficient to answer the query effectively, say: "I could not find strong research-backed information on this topic."
5. Start with a simple explanation (easy to understand for students).
6. Then optionally add a slightly deeper explanation if the context permits.
7. Keep the tone academic but simple. Avoid unnecessary jargon.
8. Do NOT mention that the answer comes from "context" or "the papers".
9. Do NOT include citations inside the paragraph.
10. DO NOT list papers inside the explanation.
11. At the very end of your answer, you MUST add exactly this line: "Relevant research papers are listed below."

Context (Research Papers):
{{#each papers}}
Title: {{{title}}}
Abstract: {{{abstract}}}
Summary: {{{aiSummary}}}
---
{{/each}}

User Query: {{{query}}}`,
});

const paperbridgeAiChatFlow = ai.defineFlow(
  {
    name: 'paperbridgeAiChatFlow',
    inputSchema: PaperBridgeAiInputSchema,
    outputSchema: PaperBridgeAiOutputSchema,
  },
  async (input) => {
    if (!input.papers || input.papers.length === 0) {
      return { explanation: "I could not find strong research-backed information on this topic." };
    }
    const { output } = await prompt(input);
    return output!;
  }
);