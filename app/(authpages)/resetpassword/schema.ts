import { z } from "zod";

export const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Must be 8 or more characters long")
      .max(30, "Must be 30 or fewer characters long"),
    confirmPassword: z
      .string()
      .min(8, "Must be 8 or more characters long")
      .max(30, "Must be 30 or fewer characters long"),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        message: "The passwords do not match",
        path: ["confirmPassword"],
        code: "custom",
      });
    }
  });
