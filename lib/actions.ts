"use server";

// import auth0 from "@/lib/auth0";
import { createClient } from "@/lib/supabase";
import { auth } from "@/lib/auth";

export async function createTodo(
  categoryId: number | undefined,
  formData: FormData,
) {
  const session = await auth();
  // const session = await auth0.getSession();
  // const supabase = createClient(session?.user?.accessToken || "");
  const title = formData.get("title");

  // TODO: Handle error
  // let { error } = await supabase
  //   .from("todos")
  //   .insert({ title, user_id: session?.user.sub, category_id: categoryId });
}
