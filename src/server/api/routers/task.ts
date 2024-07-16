import { z } from "zod";

import { taskSchema } from "~/schemas/task.schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.task.findUnique({
        where: {
          id: input.id,
        },
        include: {
          subtasks: true,
          column: {
            select: {
              name: true,
            },
          },
        },
      });
    }),

  create: publicProcedure.input(taskSchema).mutation(({ ctx, input }) => {
    return ctx.db.task.create({
      data: {
        title: input.title,
        description: input.description,
        subtasks: {
          createMany: {
            data: input.subtasks ?? [],
          },
        },
        columnId: input.columnId,
      },
    });
  }),

  // update:

  delete: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.task.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
