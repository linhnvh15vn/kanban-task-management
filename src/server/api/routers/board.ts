import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createBoardSchema, updateBoardSchema } from '~/schemas/board.schema';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const boardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.board.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const board = await ctx.db.board.findUnique({
        where: {
          id: input.id,
        },
        include: {
          columns: {
            include: {
              tasks: {
                select: {
                  id: true,
                  title: true,
                  subtasks: {
                    select: {
                      isCompleted: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!board) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No board found with this id.',
        });
      }

      return board;
    }),

  getFirst: publicProcedure.query(({ ctx }) => {
    return ctx.db.board.findFirst();
  }),

  getBoardColumns: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
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

  create: publicProcedure
    .input(createBoardSchema)
    .mutation(({ ctx, input }) => {
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

  update: publicProcedure
    .input(updateBoardSchema)
    .mutation(async ({ ctx, input }) => {
      const newColumns = input.columns?.filter((column) => !column.id);
      const updateColumns = input.columns?.filter((column) => column.id);

      return ctx.db.board.update({
        data: {
          name: input.name,
          columns: {
            createMany: {
              data: newColumns ?? [],
            },
            update: updateColumns?.map((column) => ({
              data: {
                name: column.name,
              },
              where: {
                id: column.id,
              },
            })),
          },
        },
        where: {
          id: input.id,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.board.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
