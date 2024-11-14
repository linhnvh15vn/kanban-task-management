import { z } from 'zod';

import { columnSchema } from '~/schemas/column.schema';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const columnRouter = createTRPCRouter({
  update: publicProcedure.input(columnSchema).mutation(({ ctx, input }) => {
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
    .input(z.object({ id: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.column.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
