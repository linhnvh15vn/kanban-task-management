'use client';

import React from 'react';

import ModeToggle from '~/components/mode-toggle';
import NavigationCreateButton from '~/components/navigation/navigation-create-button';
import NavigationHideSidebar from '~/components/navigation/navigation-hide-sidebar';
import NavigationItem from '~/components/navigation/navigation-item';
import NavigationOpenSidebar from '~/components/navigation/navigation-open-sidebar';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Skeleton } from '~/components/ui/skeleton';
import { useGlobalStore } from '~/store/use-global-store';
import { api } from '~/trpc/react';

export default function Navigation() {
  const { isNav } = useGlobalStore();
  const { data, isLoading } = api.board.getAll.useQuery();

  return isNav ? (
    <aside className="sticky top-24 hidden border-r bg-card md:block md:h-[calc(100vh-var(--header-md))] md:w-nav-md xl:h-[calc(100vh-var(--header-xl))] xl:w-nav-xl">
      <div className="flex h-full flex-col space-y-4 py-8">
        <ScrollArea className="flex-1 pr-6">
          {isLoading ? (
            <>
              <h4 className="px-6 pb-5 text-muted-foreground">ALL BOARDS</h4>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-6 w-full" />
                ))}
              </div>
            </>
          ) : (
            <>
              <h4 className="px-6 pb-5 text-muted-foreground">
                ALL BOARDS ({data?.length})
              </h4>
              <div>
                {data?.map((board) => (
                  <NavigationItem key={board.id} board={board} />
                ))}

                <NavigationCreateButton />
              </div>
            </>
          )}
        </ScrollArea>

        <ModeToggle />
        <NavigationHideSidebar />
      </div>
    </aside>
  ) : (
    <NavigationOpenSidebar />
  );
}
