import { db } from '~/server/db';

import data from './data.json';

async function main() {
  for (const boardData of data.boards) {
    await db.board.create({
      data: {
        name: boardData.name,
        columns: {
          create: boardData.columns.map((column) => ({
            name: column.name,
            tasks: {
              create: column.tasks.map((task) => ({
                title: task.title,
                description: task.description,
                subtasks: {
                  create: task.subtasks.map((subtask) => ({
                    title: subtask.title,
                    isCompleted: subtask.isCompleted,
                  })),
                },
              })),
            },
          })),
        },
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
