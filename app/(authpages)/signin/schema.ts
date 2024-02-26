import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email(),
  // TODO: Improve client-side password validation
  password: z
    .string()
    .min(8, "Must be 8 or more characters long")
    .max(30, "Must be 30 or fewer characters long"),
});
