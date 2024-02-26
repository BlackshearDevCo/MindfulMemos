"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { handleSignIn } from "@/app/(authpages)/actions";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/app/(authpages)/signin/schema";
import { getSignupRoute } from "@/lib/routes";

export default function SignInPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { errors },
  } = form;

  const handleSignInWithErrors = async (formData: FormData) => {
    form.clearErrors();
    const { errors } = await handleSignIn(formData);
    if (errors)
      errors.map(([key, value]) => {
        form.setError(key as any, {
          message: value,
        });
      });
  };

  return (
    <Form {...form}>
      <form
        action={handleSignInWithErrors}
        method="post"
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
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

        {errors?.root?.serverError && (
          <p className="text-sm font-medium text-red-500">
            {errors?.root?.serverError?.message as string}
          </p>
        )}

        <Link href="/" className="text-text-900/70 underline">
          Forgot password?
        </Link>

        <Button variant="default" type="submit" className="mt-10 w-full">
          Sign In
        </Button>

        <p className="w-full text-center">
          Don&apos;t have an account?{" "}
          <Link href={getSignupRoute()} className="font-bold underline">
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
}
