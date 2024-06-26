"use client";

import React from "react";

import { EyeOff } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  // Add your component props here
}

export default function NavigationHideSidebar(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isNav = searchParams.get("nav");

  const handleClick = () => {
    isNav
      ? router.push(pathname ?? "")
      : router.push(`${pathname}?nav=${isNav ? undefined : true}`);
  };

  return (
    <button
      className="mr-6 flex h-12 items-center gap-2.5 rounded-e-full px-6 text-muted-foreground hover:bg-primary hover:text-white"
      onClick={handleClick}
    >
      <EyeOff className="size-4" />
      <h3>Hide Sidebar</h3>
    </button>
  );
}
