import { createClient } from "@/lib/supabase";
import React from "react";
import { getSession } from "@auth0/nextjs-auth0";
import EmptyList from "@/app/(categorypages)/EmptyList";
import TodoLists from "@/app/(categorypages)/todos/TodoLists";

export default async function TodosPage() {
  const session = await getSession();
  const supabase = createClient(session?.user?.accessToken || "");
  let { data: todos, error } = await supabase.from("todos").select("*");
  // console.log({ todos, error });

  if (!todos || todos.length === 0) return <EmptyList />;

  return (
    <div className="grid gap-4 pt-4">
      <TodoLists todos={todos} />
    </div>
  );
}
