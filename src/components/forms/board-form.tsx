"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { schema } from "~/schemas/board.schema";
import { useModalStore } from "~/store/use-modal-store";
import { api } from "~/trpc/react";

interface Props {
  // Add your component props here
}

const defaultValues: z.infer<typeof schema> = {
  name: "",
  columns: [{ name: "Todo" }, { name: "Doing" }, { name: "Done" }],
};

export default function BoardForm(props: Props) {
  const [deleteColumnIds, setDeleteColumnIds] = useState<number[]>([]);

  const { data, onClose } = useModalStore();

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: data.board ?? defaultValues,
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray<z.infer<typeof schema>>({
    keyName: "fieldId" as "id",
    name: "columns",
    control: form.control,
  });

  const { mutate: createBoard } = api.board.create.useMutation({
    onSuccess: () => {},
  });

  const { mutate: updateBoard } = api.board.update.useMutation({
    onSuccess: () => {},
  });

  const { mutate: deleteColumn } = api.column.delete.useMutation({
    onSuccess: () => {},
  });

  const onSubmit = async (d: z.infer<typeof schema>) => {
    // data.board ? updateBoard({ id: data.board.id, ...d }) : createBoard(d);
    const results = await Promise.all(
      deleteColumnIds.map((id) => deleteColumn({ id })),
    );
  };

  const handleRemoveColumn = (columnId: number, index: number) => {
    remove(index);
    setDeleteColumnIds((prev) => [...prev, columnId]);
  };

  return (
    <Form {...form}>
      <form
        id="board-form"
        name="board-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Todo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-3">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`columns.${index}.name`}
              render={({ field: formField }) => {
                console.log(field);

                return (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Columns
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input {...formField} />
                        <button
                          type="button"
                          aria-label="remove"
                          onClick={() => handleRemoveColumn(field.id, index)}
                        >
                          <X />
                        </button>
                      </div>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          ))}
          <Button
            type="button"
            className="w-full"
            onClick={() => append({ name: "" })}
          >
            + Add New Column
          </Button>
        </div>
      </form>
    </Form>
  );
}
