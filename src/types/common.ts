import {
  type Board as PrismaBoard,
  type Column as PrismaColumn,
  type Task as PrismaTask,
  type Subtask as PrismaSubtask,
} from '@prisma/client';

import { type api } from '~/trpc/server';

export type Board = PrismaBoard & {
  columns?: Column[];
};

export type Column = PrismaColumn & {
  tasks?: Task[];
};

export type Task = PrismaTask & {
  column?: Column;
  subtasks?: Subtask[];
};

export type Subtask = PrismaSubtask;

export type GetBoardById = Awaited<ReturnType<typeof api.board.getById>>;

export type GetTaskById = Awaited<ReturnType<typeof api.task.getById>>;

export type Params = {
  boardId: string;
  taskId?: string;
};
