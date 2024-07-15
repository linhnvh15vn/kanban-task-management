import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "Can't not be empty!"),
  columns: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string(),
      }),
    )
    .optional(),
});
