import EmptyList from "@/components/EmptyList";
import TaskCategory from "@/components/TaskCategory";
import { createClient } from "@/lib/supabase/server";
import { Category, Task } from "@/lib/types";
import React from "react";

export default async function TasksPage() {
  const supabase = createClient();
  const { data: tasks } = await supabase
    .from("tasks")
    .select()
    .order("completed", { ascending: true }) // temp until custom sorting implementation
    .returns<Task[]>();
  const { data: categories } = await supabase
    .from("categories")
    .select()
    .order("id", { ascending: true }) // temp until custom sorting implementation
    .returns<Category[]>();

  if (tasks?.length === 0) return <EmptyList />;

  const uncategorizedTasks = getUncategorizedTasks();

  return (
    <div className="flex flex-col gap-4">
      {categories
        ?.filter((category) => filterTasksByCategory(category.id).length > 0)
        ?.map((category) => {
          const filteredTasks = filterTasksByCategory(category.id);
          return (
            <TaskCategory
              key={category.id}
              categoryName={category.name}
              tasks={filteredTasks ?? []}
            />
          );
        })}
      {!!uncategorizedTasks?.length && (
        <TaskCategory
          categoryName="Uncategorized"
          tasks={uncategorizedTasks ?? []}
        />
      )}
    </div>
  );

  function filterTasksByCategory(categoryId: Category["id"]): Task[] {
    return tasks?.filter((task) => task.category_id === categoryId) ?? [];
  }

  function getUncategorizedTasks(): Task[] {
    return tasks?.filter((task) => !task.category_id) ?? [];
  }
}
