"use client";

import { createClient } from "@/lib/supabase/client";
import { Task } from "@/lib/types";

export async function updateTaskRow(
  task: Task,
  updatedRow: { [key: string]: any },
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("tasks")
    .update(updatedRow)
    .eq("id", task.id)
    .select();

  return { error };
}

export async function updateTaskCompleted(
  task: Task,
  completed: Task["completed"],
) {
  return updateTaskRow(task, { completed });
}

export async function updateTaskFavorite(
  task: Task,
  favorite: Task["favorite"],
) {
  return updateTaskRow(task, { favorite });
}

export async function deleteTask(task: Task) {
  const supabase = createClient();
  const { error } = await supabase.from("tasks").delete().eq("id", task.id);

  return { error };
}
