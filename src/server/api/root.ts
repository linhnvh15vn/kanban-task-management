import { boardRouter } from "~/server/api/routers/board";
import { columnRouter } from "~/server/api/routers/column";
import { subtaskRouter } from "~/server/api/routers/subtask";
import { taskRouter } from "~/server/api/routers/task";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  board: boardRouter,
  task: taskRouter,
  column: columnRouter,
  subtask: subtaskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
