"use client";

import React from "react";

import ModeToggle from "~/components/mode-toggle";
import NavigationCreateButton from "~/components/navigation/navigation-create-button";
import NavigationHideSidebar from "~/components/navigation/navigation-hide-sidebar";
import NavigationItem from "~/components/navigation/navigation-item";
import NavigationOpenSidebar from "~/components/navigation/navigation-open-sidebar";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useGlobalStore } from "~/store/use-global-store";
import { api } from "~/trpc/react";

export default function Navigation() {
  const { isNav } = useGlobalStore();

  const { data: boardData, isLoading } = api.board.getAll.useQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return isNav ? (
    <aside className="sticky top-24 hidden h-[calc(100vh-80px)] w-[260px] border-r bg-white md:block xl:h-[calc(100vh-96px)] xl:w-[300px]">
      <div className="flex h-full flex-col space-y-4 py-8">
        <ScrollArea className="flex-1 pr-6">
          <h4 className="px-6 pb-5 text-muted-foreground">
            ALL BOARDS ({boardData?.length})
          </h4>
          <div className="space-y-0.5">
            {boardData?.map((board) => (
              <NavigationItem key={board.id} board={board} />
            ))}

            <NavigationCreateButton />
          </div>
        </ScrollArea>

        <ModeToggle />
        <NavigationHideSidebar />
      </div>
    </aside>
  ) : (
    <NavigationOpenSidebar />
  );
}
