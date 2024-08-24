"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { taskSchema, type InferredTaskSchema } from "~/schemas/task.schema";
import { useModalStore } from "~/store/use-modal-store";
import { api } from "~/trpc/react";

const defaultValues: InferredTaskSchema = {
  title: "",
  description: null,
  subtasks: [{ title: "" }, { title: "" }],
  columnId: "",
};

export default function TaskForm() {
  const [deleteSubtaskIds, setDeleteSubtaskIds] = useState<string[]>([]);

  const router = useRouter();
  const params = useParams();

  const { data, onOpen, onClose } = useModalStore();

  const form = useForm({
    defaultValues: data.task ?? defaultValues,
    resolver: zodResolver(taskSchema),
  });

  const { fields, append, remove } = useFieldArray({
    keyName: "fieldId" as "id",
    name: "subtasks",
    control: form.control,
  });

  const { data: columnData } = api.board.getBoardColumns.useQuery({
    id: params.boardId as string,
  });

  const { mutate: createTask } = api.task.create.useMutation({
    onSuccess: () => {
      onClose();
      router.refresh();
    },
  });

  const { mutate: updateTask } = api.task.update.useMutation({
    onSuccess: () => {
      onClose();
      router.refresh();
    },
    onSettled: (data) => {
      onOpen("TASK_DETAIL", { task: data });
    },
  });

  const { mutate: deleteSubtask } = api.subtask.delete.useMutation();

  const onSubmit = async (formData: InferredTaskSchema) => {
    data.task
      ? updateTask({ id: data.task.id, ...formData })
      : createTask(formData);

    // Delete subtasks
    if (!!deleteSubtaskIds.length) {
      await Promise.all(deleteSubtaskIds.map((id) => deleteSubtask({ id })));
    }
  };

  const handleRemoveSubtask = (subtaskId: string, index: number) => {
    remove(index);
    setDeleteSubtaskIds((prev) => [...prev, subtaskId]);
  };

  return (
    <Form {...form}>
      <form
        id="task-form"
        name="task-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Take coffee break" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                />
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
              name={`subtasks.${index}.title`}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Subtasks
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Input {...formField} />
                      <button
                        type="button"
                        aria-label="remove"
                        onClick={() => handleRemoveSubtask(field.id, index)}
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
            disabled={fields.length >= 5}
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => append({ title: "" })}
          >
            + Add New Subtask
          </Button>
        </div>
        <FormField
          control={form.control}
          name="columnId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={field.value || "Select status"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {columnData?.columns.map((column) => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
