import EmptyList from "@/components/EmptyList";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export default async function TasksPage() {
  const supabase = createClient();
  // const { data } = await supabase.from("todos").select();
  const { data } = await supabase.auth.getUser();

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
