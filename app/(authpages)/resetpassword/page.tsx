"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "@/app/(authpages)/resetpassword/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handlePasswordReset } from "../actions";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const params = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    const refreshSession = async (code: string) => {
      await supabase.auth.exchangeCodeForSession(code);
    };

    const queryCode = params.get("code");
    if (queryCode) refreshSession(queryCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...form}>
      <form
        action={async (formData: FormData) => {
          form.clearErrors();
          const handlePasswordResetErrors = handlePasswordReset.bind(
            null,
            formData,
          );

          const { errors } = await handlePasswordResetErrors();

          if (errors.length > 0)
            errors.map(([key, value]) => {
              form.setError(key as any, {
                message: value,
              });
            });
        }}
        className="flex flex-col items-start gap-3"
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Verify password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Verify your password"
                  type="password"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errors?.root?.serverError && (
          <p className="text-sm font-medium text-red-500">
            {errors?.root?.serverError?.message as string}
          </p>
        )}

        <Button variant="default" type="submit" className="mt-10 w-full">
          Reset password
        </Button>
      </form>
    </Form>
  );
}
