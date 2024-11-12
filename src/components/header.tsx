'use client';

import React from 'react';

import { ChevronDown, EllipsisVertical, Plus } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import NavigationMobile from '~/components/navigation/navigation-mobile';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '~/components/ui/dropdown-menu';
import { ModalType } from '~/enums';
import { cn } from '~/lib/utils';
import { useGlobalStore } from '~/store/use-global-store';
import { useModalStore } from '~/store/use-modal-store';
import { type Board } from '~/types';

interface Props {
  board: Board;
}

export default function Header({ board }: Props) {
  const { onOpen } = useModalStore();
  const { isNav } = useGlobalStore();
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-card">
      <div className="flex h-16 items-center border-b md:h-20 xl:h-24">
        <div
          className={cn(
            'hidden h-full items-center border-r px-6 md:flex',
            !isNav ? 'w-fit' : 'w-[260px] xl:w-[300px]',
          )}
        >
          {theme === 'light' ? (
            <Image
              src="/assets/logo-dark.svg"
              width={153}
              height={26}
              alt="Kanban Logo"
            />
          ) : (
            <Image
              src="/assets/logo-light.svg"
              width={153}
              height={26}
              alt="Kanban Logo"
            />
          )}
        </div>

        <div className="flex flex-1 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/logo-mobile.svg"
              width={24}
              height={25}
              alt="Logo Mobile"
              className="md:hidden"
            />
            <NavigationMobile>
              <h1 className="flex items-center gap-2 text-lg md:text-2xl">
                {board.name}
                <ChevronDown className="size-5 stroke-2 text-primary sm:hidden" />
              </h1>
            </NavigationMobile>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="icon"
              onClick={() => onOpen(ModalType.TASK)}
              className="md:hidden"
            >
              <Plus className="size-5" />
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={() => onOpen(ModalType.TASK)}
              className="hidden md:block"
            >
              + Add New Task
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="open-options-board-form">
                <EllipsisVertical color="gray" />
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={24}>
                <DropdownMenuItem
                  onClick={() =>
                    onOpen(ModalType.BOARD, {
                      board,
                    })
                  }
                >
                  Edit Board
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() =>
                    onOpen(ModalType.DEL_BOARD, {
                      board,
                    })
                  }
                >
                  Delete Board
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
