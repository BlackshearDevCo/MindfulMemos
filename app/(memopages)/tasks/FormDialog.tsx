"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import TaskForm from "@/app/(memopages)/tasks/TaskForm";
import { Task, Thought } from "@/lib/types";

export type FormItemType = "task" | "thought";

type Props = {
  itemType: FormItemType;
  children: React.ReactNode;
  title: string;
  description: string;
  item?: Task | Thought;
  onSubmit?: () => void;
};

export default function FormDialog({
  itemType,
  children,
  title,
  description,
  item,
  onSubmit,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const isTask = itemType === "task";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {isTask ? (
          <TaskForm
            onSubmit={() => {
              onSubmit?.();
              setOpen(false);
            }}
            task={item as Task}
          />
        ) : (
          <p>Thoughts form</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
