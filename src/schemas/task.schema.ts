import { z } from "zod";

export const schema = z.object({
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
