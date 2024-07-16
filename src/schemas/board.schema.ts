import { z } from "zod";

export const boardSchema = z.object({
  name: z.string().min(1, "Can't not be empty!"),
  columns: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().min(1, "Can't not be empty!"),
      }),
    )
    .optional(),
});

export type InferredBoardSchema = z.infer<typeof boardSchema>;

export const createBoardSchema = boardSchema;

export const updateBoardSchema = boardSchema.partial().extend({
  id: z.string().min(1),
});
