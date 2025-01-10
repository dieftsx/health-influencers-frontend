// app/api/verification/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import { fetchFromPerplexity, fetchFromConsensus } from '@/lib/api/external';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export async function POST(req: NextRequest) {
  try {
    const { claim } = await req.json();

    // Verify with OpenAI
    const openAIResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Verify this health claim: "${claim}"`,
      max_tokens: 200,
    });

    // Verify with Perplexity
    const perplexityResult = await fetchFromPerplexity(claim);

    // Verify with Consensus
    const consensusResult = await fetchFromConsensus(claim);

    // Combine and analyze results
    const combinedResult = analyzeCombinedResults(
      openAIResponse.data,
      perplexityResult,
      consensusResult
    );

    return NextResponse.json(combinedResult);
  } catch (error) {
    console.error('Error in verification:', error);
    return NextResponse.json(
      { error: 'Failed to verify claim' },
      { status: 500 }
    );
  }
}
