import React from "react";

import Navigation from "~/components/navigation";
import NavigationOpenSidebar from "~/components/navigation/navigation-open-sidebar";

interface Props {
  params: {
    boardId: number;
  };
  searchParams: {
    nav?: boolean;
  };
}

export default function Page({ params, searchParams }: Props) {
  return (
    <div className="grid flex-1 md:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
      {searchParams.nav && <Navigation />}
      {!searchParams.nav && <NavigationOpenSidebar />}
      <main></main>
    </div>
  );
}
