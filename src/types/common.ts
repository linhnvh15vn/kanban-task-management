import {
  type Board as _Board,
  type Column as _Column,
  type Task as _Task,
  type Subtask as _Subtask,
} from "@prisma/client";

export type Subtask = _Subtask;

export type Task = _Task & {
  column?: Pick<Column, "id" | "name">;
  subtasks?: Subtask[];
};

export type Column = _Column & {
  tasks?: Task[];
};

export type Board = _Board & {
  columns?: Column[];
};
