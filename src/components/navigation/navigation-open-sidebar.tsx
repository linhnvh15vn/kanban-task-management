"use client";

import React from "react";

import { Eye } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "~/components/ui/button";

interface Props {
  // Add your component props here
}

export default function NavigationOpenSidebar(props: Props) {
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
    <Button
      type="button"
      onClick={handleClick}
      className="fixed bottom-8 left-0 h-12 w-14 rounded-l-none rounded-r-full p-0"
    >
      <Eye size={16} />
    </Button>
  );
}
