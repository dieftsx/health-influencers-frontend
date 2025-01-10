// lib/api/external.ts
import axios from 'axios';

export async function fetchFromPerplexity(query: string) {
  const response = await axios.post(
    'https://api.perplexity.ai/analyze',
    { query },
    {
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      },
    }
  );
  return response.data;
}

export async function fetchFromConsensus(query: string) {
  const response = await axios.post(
    'https://api.consensus.app/v1/analyze',
    { query },
    {
      headers: {
        Authorization: `Bearer ${process.env.CONSENSUS_API_KEY}`,
      },
    }
  );
  return response.data;
}

export function analyzeCombinedResults(openAI: any, perplexity: any, consensus: any) {
  // Implement your logic to combine and analyze results from different APIs
  return {
    status: calculateOverallStatus(openAI, perplexity, consensus),
    confidence: calculateConfidenceScore(openAI, perplexity, consensus),
    sources: gatherSources(openAI, perplexity, consensus),
  };
}
