import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const subtaskRouter = createTRPCRouter({
  changeStatus: publicProcedure
    .input(z.object({ id: z.string().min(1), isCompleted: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.subtask.update({
        data: {
          isCompleted: input.isCompleted,
        },
        where: {
          id: input.id,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.subtask.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
