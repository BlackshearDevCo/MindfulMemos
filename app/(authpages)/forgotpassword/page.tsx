"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "@/app/(authpages)/forgotpassword/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleForgotPassword } from "@/app/(authpages)/actions";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { getLoginRoute } from "@/lib/routes";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [linkSent, setLinkSent] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const {
    formState: { errors },
  } = form;

  return (
    <Form {...form}>
      <form
        action={async (formData: FormData) => {
          setLinkSent(true);

          const handleSignInWithErrors = handleForgotPassword.bind(
            null,
            window.location.origin,
            formData,
          );

          const { errors } = await handleSignInWithErrors();

          if (errors.length > 0) setLinkSent(false);
          errors.forEach(([key, value]) => {
            form.setError(key as any, {
              message: value,
            });
          });
        }}
        className="flex flex-col items-start gap-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {linkSent && (
          <p className="text-text-900/60 text-sm font-medium">
            Please check your email for a password reset link. Ensure that you
            open the link from the same device or browser that made the request.
          </p>
        )}

        {errors?.root?.serverError && (
          <p className="text-sm font-medium text-red-500">
            {errors?.root?.serverError?.message as string}
          </p>
        )}

        <Link href={getLoginRoute()} className="text-text-900/70 underline">
          Sign in
        </Link>

        <Button
          variant="default"
          type="submit"
          className="mt-10 w-full"
          disabled={linkSent}
        >
          Send link
        </Button>
      </form>
    </Form>
  );
}
