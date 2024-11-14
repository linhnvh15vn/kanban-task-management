'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { ModalType } from '~/enums';
import { cn } from '~/lib/utils';
import { boardSchema, type InferredBoardSchema } from '~/schemas/board.schema';
import { useModalStore } from '~/store/use-modal-store';
import { api } from '~/trpc/react';

const defaultValues: InferredBoardSchema = {
  name: '',
  columns: [{ name: 'Todo' }, { name: 'Doing' }, { name: 'Done' }],
};

export default function BoardForm() {
  const router = useRouter();
  const [deleteColumnIds, setDeleteColumnIds] = useState<string[]>([]);

  const utils = api.useUtils();
  const { data, onClose } = useModalStore();

  const form = useForm<InferredBoardSchema>({
    defaultValues: data.board ?? defaultValues,
    resolver: zodResolver(boardSchema),
  });

  const { fields, append, remove } = useFieldArray<InferredBoardSchema>({
    keyName: 'fieldId' as 'id',
    name: 'columns',
    control: form.control,
  });

  const { mutate: createBoard } = api.board.create.useMutation({
    onSuccess: () => {
      onClose();
      void utils.board.getAll.invalidate();
    },
  });

  const { mutate: updateBoard } = api.board.update.useMutation({
    onSuccess: () => {
      onClose();
      router.refresh();
    },
  });

  const { mutate: deleteColumn } = api.column.delete.useMutation();

  const onSubmit = async (formData: InferredBoardSchema) => {
    data.board
      ? updateBoard({ id: data.board.id, ...formData })
      : createBoard(formData);

    // Delete columns
    if (!!deleteColumnIds) {
      await Promise.all(deleteColumnIds.map((id) => deleteColumn({ id })));
    }
  };

  const handleRemoveColumn = (columnId: string, index: number) => {
    remove(index);
    setDeleteColumnIds((prev) => [...prev, columnId]);
  };

  return (
    <Form {...form}>
      <form
        id={ModalType.BOARD}
        name={ModalType.BOARD}
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
              // @ts-expect-error fix fieldId
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              key={field.fieldId}
              control={form.control}
              name={`columns.${index}.name`}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
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
                        <X className="text-muted-foreground" />
                      </button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            className="w-full"
            variant="secondary"
            onClick={() => append({ name: '' })}
          >
            + Add New Column
          </Button>
        </div>
      </form>
    </Form>
  );
}
