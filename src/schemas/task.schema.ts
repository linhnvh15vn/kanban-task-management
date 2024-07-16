import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Can't be empty!"),
  description: z.string().nullable(),
  subtasks: z
    .array(
      z.object({
        title: z.string(),
      }),
    )
    .max(3)
    .optional(),
  columnId: z.string().min(1, "Can't be empty!"),
});

export type InferredTaskSchema = z.infer<typeof taskSchema>;
