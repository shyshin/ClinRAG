"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { ragQuerySchema, type RagQueryFormValues } from "@/lib/validators";
import type { RagCollection, RagMessage, RagSource, RagWorkspace } from "@/types/rag";

async function readJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export function useWorkspaceQuery() {
  return useQuery({
    queryKey: ["workspace"],
    queryFn: () => readJson<RagWorkspace>("/api/collections")
  });
}

export function useCollectionsQuery() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const workspace = await readJson<RagWorkspace>("/api/collections");
      return workspace.collections;
    }
  });
}

export function useChatMutation() {
  return useMutation({
    mutationFn: async (values: RagQueryFormValues) => {
      const parsed = ragQuerySchema.parse(values);

      return readJson<{ answer: RagMessage; sources: RagSource[]; collection: RagCollection | null }>(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(parsed)
        }
      );
    }
  });
}
