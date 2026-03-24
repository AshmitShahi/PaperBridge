'use server';
/**
 * @fileOverview A Genkit flow for performing semantic searches for research papers.
 *
 * - semanticPaperSearch - A function that handles the semantic paper search process.
 * - SemanticPaperSearchInput - The input type for the semanticPaperSearch function.
 * - SemanticPaperSearchOutput - The return type for the semanticPaperSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import * as process from 'process';

// Determine the backend URL from environment variables
const PAPERBRIDGE_BACKEND_URL = process.env.PAPERBRIDGE_BACKEND_URL || 'http://localhost:8000';

const SemanticPaperSearchInputSchema = z.object({
  query: z.string().describe('The natural language query for research papers.'),
});
export type SemanticPaperSearchInput = z.infer<typeof SemanticPaperSearchInputSchema>;

const PaperSchema = z.object({
  title: z.string().describe('The title of the research paper.'),
  authors: z.array(z.string()).describe('The authors of the research paper.'),
  abstract: z.string().describe('A short summary or abstract of the paper.'),
  publicationYear: z.number().int().describe('The publication year of the paper.'),
  citationCount: z.number().int().optional().describe('The number of times the paper has been cited, if available.'),
  directLink: z.string().url().describe('A direct URL to the research paper.'),
  pdfPreviewLink: z.string().url().optional().describe('A direct URL to a PDF preview or download, if available.'),
  aiSummary: z.string().describe('An AI-generated, easy-to-understand summary of the paper.'),
});

// Define a schema for papers *without* the AI summary, as this will be added by the Genkit flow.
const RawPaperSchema = PaperSchema.omit({aiSummary: true});

const SemanticPaperSearchOutputSchema = z.array(PaperSchema);
export type SemanticPaperSearchOutput = z.infer<typeof SemanticPaperSearchOutputSchema>;

/**
 * Genkit tool for calling the PaperBridge backend's search endpoint to retrieve raw paper data.
 * This tool is responsible for interacting with the external FastAPI backend that performs
 * embedding-based retrieval and fetches initial metadata from various sources.
 */
const searchRawPapersBackend = ai.defineTool(
  {
    name: 'searchRawPapersBackend',
    description: 'Searches for research papers semantically related to a given query using the PaperBridge backend, returning raw paper data without AI summaries.',
    inputSchema: z.object({
      query: z.string().describe('The natural language query for research papers.'),
    }),
    outputSchema: z.array(RawPaperSchema),
  },
  async (input) => {
    const response = await fetch(`${PAPERBRIDGE_BACKEND_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({query: input.query}),
    });

    if (!response.ok) {
      throw new Error(`Backend search failed: ${response.statusText}`);
    }

    const data = await response.json();
    return z.array(RawPaperSchema).parse(data); // Validate the incoming data against the schema
  }
);

/**
 * Genkit prompt for generating a concise, easy-to-understand summary of a research paper abstract.
 * This prompt leverages an LLM to simplify complex scientific language for a broader audience.
 */
const summarizeAbstractPrompt = ai.definePrompt({
  name: 'summarizeAbstractPrompt',
  input: {schema: z.object({abstract: z.string()})},
  output: {schema: z.string().describe('A concise, easy-to-understand summary of the abstract.')},
  prompt: `Summarize the following research paper abstract in a concise, easy-to-understand manner for a general audience. The summary should be no more than 3-4 sentences.

Abstract:
{{{abstract}}}`, // Use Handlebars for abstract injection
});

/**
 * Genkit flow for semantic paper search.
 * This flow orchestrates the semantic search by calling the backend tool for initial retrieval
 * and then uses an LLM (via a prompt) to generate an AI summary for each retrieved paper.
 */
const semanticPaperSearchFlow = ai.defineFlow(
  {
    name: 'semanticPaperSearchFlow',
    inputSchema: SemanticPaperSearchInputSchema,
    outputSchema: SemanticPaperSearchOutputSchema,
  },
  async (input) => {
    // Step 1: Retrieve raw paper data from the backend using the defined tool.
    const rawPapers = await searchRawPapersBackend(input);

    // Step 2: Iterate through each raw paper and generate an AI summary for its abstract.
    const papersWithSummaries = await Promise.all(
      rawPapers.map(async (paper) => {
        const {output: aiSummary} = await summarizeAbstractPrompt({abstract: paper.abstract});
        return {
          ...paper,
          aiSummary: aiSummary!,
        };
      })
    );

    return papersWithSummaries;
  }
);

/**
 * Performs a semantic search for research papers based on a natural language query.
 * This function wraps the Genkit flow, providing a type-safe interface for consumption
 * by the Next.js frontend.
 *
 * @param input - The search query.
 * @returns A promise that resolves to an array of research papers with AI-generated summaries.
 */
export async function semanticPaperSearch(
  input: SemanticPaperSearchInput
): Promise<SemanticPaperSearchOutput> {
  return semanticPaperSearchFlow(input);
}
