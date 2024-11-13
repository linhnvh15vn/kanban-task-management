'use client';

import React from 'react';

import ModeToggle from '~/components/mode-toggle';
import NavigationCreateButton from '~/components/navigation/navigation-create-button';
import NavigationItem from '~/components/navigation/navigation-item';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '~/components/ui/dropdown-menu';
import { api } from '~/trpc/react';

interface Props {
  children: React.ReactNode;
}

export default function NavigationMobile({ children }: Props) {
  const { data } = api.board.getAll.useQuery();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={24}
        className="w-64 bg-card px-0 py-4"
      >
        <h4 className="px-6 pb-5 text-muted-foreground">
          ALL BOARDS ({data?.length})
        </h4>
        <div className="max-h-72 overflow-y-auto pb-5 pr-6">
          {data?.map((board) => (
            <DropdownMenuItem asChild key={board.id}>
              <NavigationItem board={board} />
            </DropdownMenuItem>
          ))}
          <NavigationCreateButton />
        </div>
        <ModeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
