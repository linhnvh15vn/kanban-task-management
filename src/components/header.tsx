"use client";

import React from "react";

import { ChevronDown, EllipsisVertical, Plus } from "lucide-react";
import Image from "next/image";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useGlobalStore } from "~/store/use-global-store";
import { useModalStore } from "~/store/use-modal-store";

export default function Header() {
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
            Platform Launch
            <ChevronDown className="size-4 text-primary" />
          </h1>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="icon"
              onClick={() => onOpen("TASK_FORM", { task: null })}
            >
              <Plus className="size-5" />
            </Button>
            <button type="button">
              <EllipsisVertical className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
