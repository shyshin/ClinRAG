import { z } from "zod";

export const ragQuerySchema = z.object({
  question: z
    .string()
    .min(12, "Ask a slightly more specific retrieval question.")
    .max(500, "Keep the prompt under 500 characters."),
  collectionId: z.string().min(1, "Choose a collection."),
  topK: z.coerce.number().int().min(1).max(10),
  includeTimeline: z.boolean().default(true)
});

export type RagQueryFormValues = z.infer<typeof ragQuerySchema>;
