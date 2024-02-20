import { createClient } from "@/lib/supabase";
import React from "react";
import { getSession } from "@auth0/nextjs-auth0";
import EmptyList from "@/app/(categorypages)/EmptyList";
import TodoLists from "@/app/(categorypages)/todos/TodoLists";

export default async function TodosPage() {
  const session = await getSession();
  const supabase = createClient(session?.user?.accessToken || "");
  let { data: todos } = await supabase
    .from("todos")
    .select("*, category:categories ( * )");

  if (!todos || todos.length === 0) return <EmptyList />;

  // TODO: Add error boundary
  return (
    <div className="grid gap-4 pt-4">
      <TodoLists todos={todos} />
    </div>
  );
}
