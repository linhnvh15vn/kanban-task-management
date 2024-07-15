import { z } from "zod";

export const boardSchema = z.object({
  name: z.string().min(1, "Can't not be empty!"),
  columns: z
    .array(
      z.object({
        name: z.string(),
      }),
    )
    .optional(),
});

export type InferredBoardSchema = z.infer<typeof boardSchema>;

export const updateBoardSchema = boardSchema.partial().extend({
  id: z.number().min(1),
});
