import React from "react";

import { SquareKanban } from "lucide-react";

import ModeToggle from "~/components/mode-toggle";
import NavigationHideSidebar from "~/components/navigation/navigation-hide-sidebar";
import NavigationItem from "~/components/navigation/navigation-item";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/server";

interface Props {
  // Add your component props here
}

export default async function Navigation(props: Props) {
  const boards = await api.board.getAll();

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-80px)] w-full bg-white md:block xl:h-[calc(100vh-96px)]">
      <div className="flex h-full flex-col space-y-4 border-r py-8">
        <ScrollArea className="flex-1 pr-6">
          <h4 className="px-6 pb-5 text-muted-foreground">
            ALL BOARDS ({boards.length})
          </h4>
          {boards.map((board) => (
            <NavigationItem key={board.id} board={board} />
          ))}

          <div className="flex h-12 w-60 items-center gap-3 rounded-e-full px-6">
            <SquareKanban />
            <h3>+ Create a board</h3>
          </div>
        </ScrollArea>

        <ModeToggle />
        <NavigationHideSidebar />
      </div>
    </aside>
  );
}
