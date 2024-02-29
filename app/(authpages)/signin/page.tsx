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
import {
  handleSignIn,
  handleSignInWithGoogle,
} from "@/app/(authpages)/actions";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/app/(authpages)/signin/schema";
import { getForgotPasswordRoute, getSignupRoute } from "@/lib/routes";

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

  const signInWithGoogle = async () => {
    const { errors } = await handleSignInWithGoogle();
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

        <Link
          href={getForgotPasswordRoute()}
          className="text-text-900/70 underline"
        >
          Forgot password?
        </Link>

        <Button variant="default" type="submit" className="mt-10 w-full">
          Sign in
        </Button>

        <Button
          variant="secondary"
          type="button"
          onClick={signInWithGoogle}
          className="flex w-full gap-2"
        >
          <GoogleIcon /> <span>Sign in with Google</span>
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

function GoogleIcon() {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.75 10C0.75 4.61554 5.11554 0.25 10.5 0.25C13.0699 0.25 15.4004 1.25246 17.1394 2.87324C17.2883 3.01197 17.3744 3.20524 17.378 3.4087C17.3816 3.61216 17.3023 3.80834 17.1584 3.95223L14.6128 6.49788C14.3319 6.77876 13.8807 6.79193 13.584 6.52792C12.7608 5.79565 11.6837 5.35 10.5 5.35C7.93206 5.35 5.85 7.43206 5.85 10C5.85 12.5679 7.93206 14.65 10.5 14.65C12.1238 14.65 13.5521 13.8153 14.3828 12.55H10.5C10.0858 12.55 9.75 12.2142 9.75 11.8V8.2C9.75 7.78579 10.0858 7.45 10.5 7.45H19.3249C19.683 7.45 19.9911 7.70305 20.0607 8.0543C20.1832 8.6728 20.25 9.348 20.25 10C20.25 15.3845 15.8845 19.75 10.5 19.75C5.11554 19.75 0.75 15.3845 0.75 10ZM10.5 1.75C5.94396 1.75 2.25 5.44396 2.25 10C2.25 14.556 5.94396 18.25 10.5 18.25C15.056 18.25 18.75 14.556 18.75 10C18.75 9.6525 18.7275 9.2961 18.6853 8.95H11.25V11.05H15.5864C15.8299 11.05 16.0583 11.1683 16.1988 11.3671C16.3394 11.566 16.3746 11.8208 16.2933 12.0503C15.4491 14.4346 13.1795 16.15 10.5 16.15C7.10364 16.15 4.35 13.3964 4.35 10C4.35 6.60364 7.10364 3.85 10.5 3.85C11.8133 3.85 13.0272 4.26519 14.0236 4.96571L15.5229 3.46644C14.1306 2.39163 12.3918 1.75 10.5 1.75Z"
        fill="black"
      />
    </svg>
  );
}
