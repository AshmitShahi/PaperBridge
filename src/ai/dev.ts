import { config } from 'dotenv';
config();

import '@/ai/flows/paper-abstract-summarization-flow.ts';
import '@/ai/flows/related-paper-recommendations-flow.ts';
import '@/ai/flows/semantic-paper-search-flow.ts';