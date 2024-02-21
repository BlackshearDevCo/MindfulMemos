import EmptyList from "@/components/EmptyList";
import React from "react";

export default async function TasksPage() {
  return <EmptyList />;
}

// CREATE TASK
// const formRef = useRef<HTMLFormElement>(null);
// const createTodoWithCategory = createTodo.bind(null, categoryId);
// action={async (formData) => {
//   await createTodoWithCategory(formData);
//   formRef.current?.reset();
//   onAddTodo();
// }}
