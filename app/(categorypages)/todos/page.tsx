import { Todo } from "@/lib/types";
import { createClient } from "@/lib/supabase";
import React from "react";
import { getSession } from "@auth0/nextjs-auth0";

export default async function TodosPage() {
  const session = await getSession();
  const supabase = createClient(session?.user?.accessToken || "");
  let { data: todos } = await supabase.from("todos").select("*");

  console.log(todos);

  return (
    <div className="grid gap-4 pt-4">
      {(todos || []).map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="flex justify-start gap-2 relative">
      <input type="checkbox" id={`todo_${todo.id}`} className="hidden peer" />
      <label
        htmlFor={`todo_${todo.id}`}
        className="cursor-pointer z-10 w-6 h-6 rounded-md border-2 border-slate-700 peer-checked:bg-slate-800"
      />
      <label htmlFor={`todo_${todo.id}`} className="cursor-pointer">
        {todo.title}
      </label>
    </div>
  );
}
