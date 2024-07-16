import { z } from "zod";

export const columnSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});
