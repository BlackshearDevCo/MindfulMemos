import EmptyList from "@/components/EmptyList";
import { Tables } from "@/lib/database.types";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export default async function TasksPage() {
  const supabase = createClient();
  const { data: tasks } = await supabase.from("tasks").select();

  // return <EmptyList />;

  return (
    <ul className="flex flex-col gap-2">
      {tasks?.map((task: Tables<"tasks">) => (
        <li key={task.id}>
          <p className="text-lg">{task.name}</p>
          {task.description && <p className="text-sm">{task.description}</p>}
        </li>
      ))}
    </ul>
  );
}
