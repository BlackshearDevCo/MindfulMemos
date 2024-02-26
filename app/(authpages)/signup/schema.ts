import { z } from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "Must be 2 or more characters long")
    .max(50, "Must be 50 or fewer characters long"),
  lastName: z
    .string()
    .min(2, "Must be 2 or more characters long")
    .max(50, "Must be 50 or fewer characters long")
    .optional(),
  email: z.string().email(),
  // TODO: Improve client-side password validation
  password: z
    .string()
    .min(8, "Must be 8 or more characters long")
    .max(30, "Must be 30 or fewer characters long"),
});
