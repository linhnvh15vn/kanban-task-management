import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const boardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.board.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.board.findUnique({
        where: {
          id: input.id,
        },
        include: {
          columns: {
            include: {
              tasks: true,
            },
          },
        },
      });
    }),

  getFirst: publicProcedure.query(({ ctx }) => {
    return ctx.db.board.findFirst();
  }),

  getBoardColumns: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.board.findUnique({
        where: {
          id: input.id,
        },
        select: {
          columns: true,
        },
      });
    }),
});
