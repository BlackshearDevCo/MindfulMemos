"use server";

import { getPasswordResetRoute, getTasksRoute } from "@/lib/routes";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formSchema as signInFormSchema } from "@/app/(authpages)/signin/schema";
import { formSchema as signUpFormSchema } from "@/app/(authpages)/signup/schema";
import { formSchema as forgotPasswordFormSchema } from "@/app/(authpages)/forgotpassword/schema";
import { formSchema as resetPasswordFormSchema } from "@/app/(authpages)/resetpassword/schema";

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

export const handleForgotPassword = async (
  pathname: string,
  formData: FormData,
) => {
  const email = String(formData.get("email"));

  const validationResponse = forgotPasswordFormSchema.safeParse({
    email,
  });

  if (!validationResponse.success) {
    const { errors } = validationResponse.error;

    return {
      errors: errors.map((error) => [error.path.join("."), error.message]),
    };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${pathname}${getPasswordResetRoute()}`,
  });

  if (error) return { errors: [["root.serverError", error.message]] };
  return { errors: [] };
};

export const handlePasswordReset = async (code: string, formData: FormData) => {
  const newPassword = String(formData.get("newPassword"));
  const confirmPassword = String(formData.get("confirmPassword"));

  const validationResponse = resetPasswordFormSchema.safeParse({
    newPassword,
    confirmPassword,
  });

  if (!validationResponse.success) {
    const { errors } = validationResponse.error;

    return {
      errors: errors.map((error) => [error.path.join("."), error.message]),
    };
  }

  const supabase = createClient();

  const { error: sessionError } =
    await supabase.auth.exchangeCodeForSession(code);
  if (sessionError)
    return { errors: [["root.serverError", sessionError.message]] };

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (updateError)
    return { errors: [["root.serverError", updateError.message]] };

  redirect(getTasksRoute());
};
