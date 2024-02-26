"use server";

import { getTasksRoute } from "@/lib/routes";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formSchema as signInFormSchema } from "@/app/(authpages)/signin/schema";
import { formSchema as signUpFormSchema } from "@/app/(authpages)/signup/schema";

export const handleSignIn = async (formData: FormData) => {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const validationResponse = signInFormSchema.safeParse({ email, password });

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
};

export const handleSignUp = async (formData: FormData) => {
  const firstName = String(formData.get("firstName"));
  const lastName = String(formData.get("lastName"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const validationResponse = signUpFormSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
  });

  if (!validationResponse.success) {
    const { errors } = validationResponse.error;

    return {
      errors: errors.map((error) => [error.path.join("."), error.message]),
    };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName || "",
      },
    },
  });

  if (error) return { errors: [["root.serverError", error.message]] };

  revalidatePath(getTasksRoute());
  redirect(getTasksRoute());
};
