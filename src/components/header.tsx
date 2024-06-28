"use client";

import React from "react";

import { ChevronDown, EllipsisVertical, Plus } from "lucide-react";
import Image from "next/image";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";
import { useGlobalStore } from "~/store/use-global-store";
import { useModalStore } from "~/store/use-modal-store";
import { type Board } from "~/types";

interface Props {
  board: Board;
}

export default function Header({ board }: Props) {
  const { onOpen } = useModalStore();
  const { isNav } = useGlobalStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="flex h-16 items-center border-b md:h-20 xl:h-24">
        <div
          className={cn(
            "hidden h-full items-center border-r px-6 md:flex",
            !isNav ? "w-fit" : "w-[260px] xl:w-[300px]",
          )}
        >
          <Image
            src="/assets/logo-dark.svg"
            width={153}
            height={26}
            alt="Kanban Logo"
          />
        </div>

        <div className="flex flex-1 items-center justify-between px-4">
          <h1 className="flex items-center">
            {board.name}
            <ChevronDown className="size-4 text-primary sm:hidden" />
          </h1>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="icon"
              onClick={() => onOpen("TASK_FORM", { task: null })}
            >
              <Plus className="size-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="open-options-board-form">
                <EllipsisVertical color="gray" />
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={24}>
                <DropdownMenuItem
                  onClick={() =>
                    onOpen("BOARD_FORM", {
                      board,
                    })
                  }
                >
                  Edit Board
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() =>
                    onOpen("DELETE_BOARD", {
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
