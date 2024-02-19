import { Todo } from "@/lib/types";
import React from "react";

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <TodoItemContainer>
      <input type="checkbox" id={`todo_${todo.id}`} className="hidden peer" />
      <label
        htmlFor={`todo_${todo.id}`}
        className="cursor-pointer z-10 w-5 h-5 rounded-full border-2 border-secondary peer-checked:bg-secondary"
      />
      <label htmlFor={`todo_${todo.id}`} className="cursor-pointer text-lg">
        {todo.title}
      </label>
    </TodoItemContainer>
  );
}

export function TodoItemContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-start items-center gap-2 relative">
      {children}
    </div>
  );
}
