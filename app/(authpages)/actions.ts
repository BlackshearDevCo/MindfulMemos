"use server";

import { getTasksRoute } from "@/lib/routes";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formSchema } from "./signin/schema";

export const handleSignIn = async (formData: FormData) => {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const validationResponse = formSchema.safeParse({ email, password });

  if (!validationResponse.success) {
    const { errors } = validationResponse.error;

    return {
      errors: errors.map((error) => [error.path.join("."), error.message]),
    };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { errors: [["root.serverError", error.message]] };

  revalidatePath(getTasksRoute());
  redirect(getTasksRoute());

  return { errors: [] };
};
