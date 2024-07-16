import { z } from "zod";

export const subtaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
});
