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
    .input(
      z.object({
        id: z.number(),
      }),
    )
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

  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //       },
  //     });
  //   }),
});
