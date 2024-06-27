import React from "react";

import Header from "~/components/header";
import Navigation from "~/components/navigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="grid flex-1 md:grid-cols-[auto_minmax(0,1fr)] xl:grid-cols-[auto_minmax(0,1fr)]">
        <Navigation />
        {children}
      </div>
    </div>
  );
}
