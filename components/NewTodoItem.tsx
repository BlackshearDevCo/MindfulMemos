"use client";

import React, { useRef } from "react";
import { TodoItemContainer } from "@/components/TodoItem";
import Input from "./ui/Input";
import { createTodo } from "@/lib/actions";
import { useFormStatus } from "react-dom";

type Props = {
  removeItem: () => void;
  onAddTodo: () => void;
  categoryId?: number;
};

export default function NewTodoItem({
  categoryId,
  removeItem,
  onAddTodo,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const createTodoWithCategory = createTodo.bind(null, categoryId);

  return (
    <div className="flex gap-1">
      <form
        ref={formRef}
        action={async (formData) => {
          await createTodoWithCategory(formData);
          formRef.current?.reset();
          onAddTodo();
        }}
        className="flex-1"
      >
        <NewTodoInput />
      </form>
      <button className="px-2" onClick={removeItem}>
        -
      </button>
    </div>
  );
}

function NewTodoInput() {
  const { pending } = useFormStatus();

  return (
    <TodoItemContainer>
      <Input
        name="title"
        placeholder="New Todo"
        autoFocus
        required
        disabled={pending}
        aria-disabled={pending}
      />
    </TodoItemContainer>
  );
}
