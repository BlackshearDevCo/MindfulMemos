"use client";

import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";
import { Category, Task } from "@/lib/types";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/Label";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase/client";

type Props = {
  categoryName: Category["name"];
  tasks: Task[];
};

export default function TaskCategory({ categoryName, tasks }: Props) {
  const [open, setOpen] = React.useState(true);

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
        {tasks?.map((task) => <TaskItem key={task.id} task={task} />)}
      </CollapsibleContent>
    </Collapsible>
  );
}

function TaskItem({ task }: { task: Task }) {
  const [taskCompleted, setTaskCompleted] = useState<Task["completed"]>(
    task.completed,
  );
  const supabase = createClient();

  return (
    <div className="flex items-center space-x-2 rounded bg-muted-foreground/10 p-2">
      <Checkbox
        id={`task_${task.id}`}
        className="h-5 w-5 rounded-full"
        checked={taskCompleted}
        onCheckedChange={async () => {
          const newValue = !taskCompleted;
          setTaskCompleted(newValue);
          const { error } = await supabase
            .from("tasks")
            .update({ completed: newValue })
            .eq("id", task.id)
            .select();
          if (error) setTaskCompleted(!newValue);
        }}
      />
      <Label htmlFor={`task_${task.id}`} className="text-base">
        {task.name}
      </Label>
    </div>
  );
}
