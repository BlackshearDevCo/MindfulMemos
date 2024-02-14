import { Todo } from "@/lib/types";
import React from "react";

const DUMMY_TODOS: Todo[] = [
  { id: "1", title: "Todo 1" },
  { id: "2", title: "Todo 2" },
  { id: "3", title: "Todo 3" },
  { id: "4", title: "Todo 4" },
  { id: "5", title: "Todo 5" },
];

export default function TodosPage() {
  return (
    <div className="grid gap-4 pt-4">
      {DUMMY_TODOS.map((todo) => (
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
