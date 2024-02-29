"use client";

import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";
import { Category, Task } from "@/lib/types";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import {
  CheckCircleIcon as CheckCircleIconOutline,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  EllipsisHorizontalIcon,
  HeartIcon as HeartIconOutline,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
} from "@heroicons/react/24/solid";
import {
  deleteTask,
  updateTaskCompleted,
  updateTaskFavorite,
} from "@/lib/utils/tasks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIconWrapper,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { toast } from "@/lib/hooks/useToast";

type Props = {
  categoryName: Category["name"];
  tasks: Task[];
};

export default function TaskCategory({ categoryName, tasks }: Props) {
  const [open, setOpen] = useState(true);
  const [deletedTasks, setDeletedTasks] = useState<Task["id"][]>([]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between text-lg font-semibold">
          <span>{categoryName}</span>
          <span className="h-4 w-4">
            {open ? <ChevronDoubleDownIcon /> : <ChevronDoubleUpIcon />}
          </span>
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-1 flex flex-col gap-2">
        {tasks
          ?.filter((task) => !deletedTasks.includes(task.id))
          ?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={(id) => setDeletedTasks((prev) => [...prev, id])}
            />
          ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function TaskItem({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: (id: Task["id"]) => void;
}) {
  const [taskCompleted, setTaskCompleted] = useState<Task["completed"]>(
    task.completed,
  );
  const [favorite, setFavorite] = React.useState<Task["favorite"]>(
    task.favorite,
  );

  return (
    <div className="flex items-center justify-between rounded bg-muted-foreground/10 p-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`task_${task.id}`}
          className="h-5 w-5 rounded-full"
          checked={taskCompleted}
          onCheckedChange={handleCompleted}
        />
        <Label htmlFor={`task_${task.id}`} className="text-base">
          {task.name}
        </Label>
      </div>

      <div className="flex">
        <button className="px-2" onClick={handleFavorite}>
          {favorite ? (
            <HeartIconSolid className="h-4" />
          ) : (
            <HeartIconOutline className="h-4" />
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-2">
              <EllipsisHorizontalIcon className="h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={8} align="end">
            <DropdownMenuItem>
              <DropdownMenuItemIconWrapper className="h-4 w-4">
                <PencilIcon />
              </DropdownMenuItemIconWrapper>
              <p>Edit task</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCompleted}>
              <DropdownMenuItemIconWrapper className="h-4 w-4">
                {taskCompleted ? (
                  <CheckCircleIconSolid />
                ) : (
                  <CheckCircleIconOutline />
                )}
              </DropdownMenuItemIconWrapper>
              <p>Mark as completed</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleFavorite}>
              <DropdownMenuItemIconWrapper className="h-4 w-4">
                {favorite ? <HeartIconSolid /> : <HeartIconOutline />}
              </DropdownMenuItemIconWrapper>
              <p>Mark as favorite</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDelete}
            >
              <DropdownMenuItemIconWrapper className="h-4 w-4">
                <TrashIcon />
              </DropdownMenuItemIconWrapper>
              <p>Delete task</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  async function handleFavorite() {
    const newValue = !favorite;
    setFavorite(newValue);
    const { error } = await updateTaskFavorite(task, newValue);
    if (error) setFavorite(!newValue);
  }

  async function handleCompleted() {
    const newValue = !taskCompleted;
    setTaskCompleted(newValue);
    const { error } = await updateTaskCompleted(task, newValue);
    if (error) setTaskCompleted(!newValue);
  }

  async function handleDelete() {
    onDelete(task.id);
    const { error } = await deleteTask(task);
    if (error)
      toast({ title: "Couldn't delete task", description: error.message });
  }
}
