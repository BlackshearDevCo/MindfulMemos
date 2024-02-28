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
import { Button } from "@/components/ui/Button";
import TaskForm from "@/app/(memopages)/tasks/TaskForm";

type Props = {
  itemType: "task" | "thought";
};

export function NewItemButton({ itemType }: Props) {
  const [open, setOpen] = React.useState(false);

  const isTask = itemType === "task";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          {isTask ? "ADD NEW TASK" : "ADD NEW THOUGHT"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Create {isTask ? "task" : "thought"}</DialogTitle>
          <DialogDescription>
            Enter the details of your new {isTask ? "task" : "thought"} below.
          </DialogDescription>
        </DialogHeader>

        {isTask ? (
          <TaskForm onSubmit={() => setOpen(false)} />
        ) : (
          // TODO: Replace with thoughts form
          <TaskForm onSubmit={() => setOpen(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
