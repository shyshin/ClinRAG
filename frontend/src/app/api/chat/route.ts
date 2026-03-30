import { NextRequest, NextResponse } from "next/server";

import { mockCollections, mockSources } from "@/lib/mock-data";
import { ragQuerySchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = ragQuerySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid request body",
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const { collectionId, question, topK, includeTimeline } = parsed.data;
  const collection = mockCollections.find((item) => item.id === collectionId) ?? null;
  const sources = mockSources.slice(0, topK);

  return NextResponse.json({
    collection,
    sources,
    answer: {
      id: crypto.randomUUID(),
      role: "assistant",
      content: `Using ${collection?.name ?? "the selected collection"}, I found ${sources.length} relevant documents. ${
        includeTimeline ? "I also blended recent thread context into the answer. " : ""
      }Top signal: ${sources[0]?.title ?? "no source available"}. Draft response for "${question}": urgent escalation is supported by guideline overlap, recent intake detail, and the lack of contradictory medication evidence.`,
      createdAt: new Date().toISOString(),
      citations: sources.map((source) => source.id)
    }
  });
}
