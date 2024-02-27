"use server";

import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { newTaskFormSchema } from "@/components/formschemas";
import { revalidatePath } from "next/cache";
import { getTasksRoute } from "@/lib/routes";

export const handleCreateTaskWithErrors = async (
  user: User | undefined,
  formData: FormData,
) => {
  if (!user) throw new Error("Missing user");

  const name = String(formData.get("name"));
  const description = formData.get("description");

  const validationResponse = newTaskFormSchema.safeParse({
    name,
    description: description ?? undefined,
  });

  if (!validationResponse.success) {
    const { errors } = validationResponse.error;

    return {
      errors: errors.map((error) => [error.path.join("."), error.message]),
    };
  }

  const supabase = createClient();
  const { error } = await supabase.from("tasks").insert({
    name,
    description,
    completed: false,
    user_id: user?.id,
  });

  // TODO: add toast error message
  if (error) return { errors: [["root.serverError", error.message]] };

  revalidatePath(getTasksRoute());
};
