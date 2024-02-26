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
import { handleSignUp } from "@/app/(authpages)/actions";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/app/(authpages)/signup/schema";
import { getLoginRoute } from "@/lib/routes";
import FormWrapper from "@/components/FormWrapper";

export default function SignUpPage() {
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

  const handleSignUpWithErrors = async (formData: FormData) => {
    form.clearErrors();
    const { errors } = await handleSignUp(formData);
    if (errors)
      errors.map(([key, value]) => {
        form.setError(key as any, {
          message: value,
        });
      });
  };

  return (
    <Form {...form}>
      <FormWrapper action={handleSignUpWithErrors}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>First name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your chosen name"
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
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your family name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email *</FormLabel>
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
              <FormLabel>Password *</FormLabel>
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

        <Button variant="default" type="submit" className="mt-10 w-full">
          Sign In
        </Button>

        <p className="w-full text-center">
          Already have an account?{" "}
          <Link href={getLoginRoute()} className="font-bold underline">
            Login
          </Link>
        </p>
      </FormWrapper>
    </Form>
  );
}
