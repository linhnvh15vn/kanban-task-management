import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const columnRouter = createTRPCRouter({
  update: publicProcedure
    .input(
      z.object({
        id: z.number().min(1),
        name: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.column.update({
        data: {
          name: input.name,
        },
        where: {
          id: input.id,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.column.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
