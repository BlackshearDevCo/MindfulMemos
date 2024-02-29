import { z } from "zod";

export const taskFormSchema = z.object({
  name: z.string().max(50, "Must be 50 or fewer characters long"),
  description: z.string().optional(),
  category_id: z.number().optional(),
  completed: z.boolean().optional(),
  favorite: z.boolean().optional(),
  complete_by: z
    .string()
    .refine(
      (value) => {
        // Regular expression to match timestamptz format (YYYY-MM-DDTHH:MM:SSZ)
        const timestamptzRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
        return timestamptzRegex.test(value);
      },
      {
        message: "Invalid timestamptz format",
      },
    )
    .optional(),
});
