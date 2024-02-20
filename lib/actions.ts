"use server";

import { getSession } from "@auth0/nextjs-auth0";
import { createClient } from "./supabase";

export async function createTodo(
  categoryId: number | undefined,
  formData: FormData
) {
  const session = await getSession();
  const supabase = createClient(session?.user?.accessToken || "");
  const title = formData.get("title");

  // TODO: Handle error
  let { error } = await supabase
    .from("todos")
    .insert({ title, user_id: session?.user.sub, category_id: categoryId });
}
