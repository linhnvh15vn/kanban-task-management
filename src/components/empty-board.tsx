import React from "react";

import { Button } from "~/components/ui/button";

interface Props {
  // Add your component props here
}

export default function EmptyBoard(props: Props) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="space-y-8 text-center text-muted-foreground">
        <h2>This board is empty. Create a new column to get started.</h2>
        <Button type="button">+ Add New Column</Button>
      </div>
    </div>
  );
}
