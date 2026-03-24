'use server';
/**
 * @fileOverview This file defines a Genkit flow for retrieving semantically similar research papers.
 *
 * - getRelatedPaperRecommendations - An asynchronous function that executes the flow to find related papers.
 * - RelatedPaperRecommendationsInput - The input type for the getRelatedPaperRecommendations function.
 * - RelatedPaperRecommendationsOutput - The return type for the getRelatedPaperRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the schema for a single research paper, based on requirements.
const PaperSchema = z.object({
  title: z.string().describe('The title of the research paper.'),
  authors: z.array(z.string()).describe('A list of authors of the paper.'),
  abstract: z.string().describe('A short summary or abstract of the paper.'),
  publicationYear: z.number().describe('The year the paper was published.'),
  citationCount: z.number().optional().describe('The number of times the paper has been cited, if available.'),
  paperLink: z.string().url().describe('A direct URL link to the paper.'),
  pdfLink: z.string().url().optional().describe('A direct URL link to the PDF version of the paper, if available.'),
});

export type Paper = z.infer<typeof PaperSchema>;

const RelatedPaperRecommendationsInputSchema = z.object({
  paperAbstract: z.string().describe('The abstract or full text of the paper for which to find similar recommendations.'),
});
export type RelatedPaperRecommendationsInput = z.infer<typeof RelatedPaperRecommendationsInputSchema>;

const RelatedPaperRecommendationsOutputSchema = z.array(PaperSchema).describe('A list of semantically similar research papers.');
export type RelatedPaperRecommendationsOutput = z.infer<typeof RelatedPaperRecommendationsOutputSchema>;

// Define a Genkit tool that simulates calling a backend service for semantic search.
// In a real application, this would make an actual API call to the FastAPI backend.
const getSemanticallySimilarPapersTool = ai.defineTool(
  {
    name: 'getSemanticallySimilarPapers',
    description: 'Retrieves a list of research papers semantically similar to a given query text by leveraging embeddings.',
    inputSchema: z.object({
      query: z.string().describe('The text content (e.g., abstract) to find semantically similar papers for.'),
    }),
    outputSchema: RelatedPaperRecommendationsOutputSchema,
  },
  async (input) => {
    // This is a mock implementation. In a real application, this would call
    // the FastAPI backend\'s /search endpoint with the query and retrieve
    // actual semantically similar papers from the vector database (FAISS) and PostgreSQL.

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return mock data for demonstration
    const mockPapers: RelatedPaperRecommendationsOutput = [
      {
        title: 'Advances in Deep Learning for Natural Language Processing',
        authors: ['Jane Doe', 'John Smith'],
        abstract: 'This paper explores recent advancements in deep learning techniques applied to natural language processing tasks, including new architectures and training methodologies.',
        publicationYear: 2023,
        citationCount: 120,
        paperLink: 'https://example.com/paper1',
        pdfLink: 'https://example.com/pdf1.pdf',
      },
      {
        title: 'The Impact of Large Language Models on Scientific Research',
        authors: ['Alice Brown'],
        abstract: 'An analysis of how large language models are transforming various fields of scientific research, from hypothesis generation to data analysis and publication.',
        publicationYear: 2024,
        citationCount: 50,
        paperLink: 'https://example.com/paper2',
        pdfLink: 'https://example.com/pdf2.pdf',
      },
      {
        title: 'Optimizing Neural Networks for Low-Resource Languages',
        authors: ['Bob White', 'Charlie Green'],
        abstract: 'Investigates methods for efficiently training and deploying neural networks for natural language processing in contexts with limited linguistic resources.',
        publicationYear: 2022,
        citationCount: 85,
        paperLink: 'https://example.com/paper3',
        pdfLink: 'https://example.com/pdf3.pdf',
      },
    ];
    return mockPapers;
  }
);

// Define the Genkit flow
const relatedPaperRecommendationsFlow = ai.defineFlow(
  {
    name: 'relatedPaperRecommendationsFlow',
    inputSchema: RelatedPaperRecommendationsInputSchema,
    outputSchema: RelatedPaperRecommendationsOutputSchema,
  },
  async (input) => {
    // Directly call the tool to get semantically similar papers
    const recommendedPapers = await getSemanticallySimilarPapersTool({
      query: input.paperAbstract,
    });
    return recommendedPapers;
  }
);

/**
 * Executes the Genkit flow to find semantically similar research paper recommendations.
 *
 * @param input - The input object containing the abstract of the paper to find recommendations for.
 * @returns A promise that resolves to an array of recommended research papers.
 */
export async function getRelatedPaperRecommendations(
  input: RelatedPaperRecommendationsInput
): Promise<RelatedPaperRecommendationsOutput> {
  return relatedPaperRecommendationsFlow(input);
}
