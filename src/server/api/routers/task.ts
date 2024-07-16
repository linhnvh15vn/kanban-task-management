import { z } from "zod";

import { taskSchema, updateTaskSchema } from "~/schemas/task.schema";
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

  update: publicProcedure.input(updateTaskSchema).mutation(({ ctx, input }) => {
    const newSubtasks = input.subtasks?.filter((subtask) => !subtask.id);
    const updateSubtask = input.subtasks?.filter((subtask) => subtask.id);

    return ctx.db.task.update({
      data: {
        title: input.title,
        description: input.description,
        columnId: input.columnId,
        subtasks: {
          createMany: {
            data: newSubtasks ?? [],
          },
          update: updateSubtask?.map((subtask) => ({
            data: {
              title: subtask.title,
            },
            where: {
              id: subtask.id,
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
      return ctx.db.task.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
