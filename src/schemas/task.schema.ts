import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, "Can't be empty!"),
  description: z.string().nullable(),
  subtasks: z
    .array(
      z.object({
        id: z.string().optional(),
        title: z.string().min(1, "Can't be empty!"),
      }),
    )
    .optional(),
  columnId: z.string().min(1, "Can't be empty!"),
});

export type InferredTaskSchema = z.infer<typeof taskSchema>;

export const updateTaskSchema = taskSchema.partial().extend({
  id: z.string().min(1),
});
