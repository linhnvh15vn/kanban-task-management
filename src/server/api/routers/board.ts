import { z } from "zod";

import { schema } from "~/schemas/board.schema";
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
              tasks: {
                include: {
                  subtasks: true,
                },
              },
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

  create: publicProcedure.input(schema).mutation(({ ctx, input }) => {
    return ctx.db.board.create({
      data: {
        name: input.name,
        columns: {
          createMany: {
            data: input.columns ?? [],
          },
        },
      },
    });
  }),

  // fix later
  update: publicProcedure
    .input(
      schema.partial().extend({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const oldBoardColumns = await ctx.db.board.findUnique({
        where: {
          id: input.id,
        },
        select: {
          columns: true,
        },
      });

      const newBoardColumns = input.columns;

      console.log({
        old: oldBoardColumns,
        new: newBoardColumns,
      });

      return ctx.db.board.update({
        data: {
          name: input.name,
          columns: {},
        },
        where: {
          id: input.id,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.board.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
