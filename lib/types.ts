import { Tables } from "@/lib/database.types";

export type Task = Tables<"tasks">;

export type Category = Tables<"categories">;

export type Thought = Tables<"thoughts">;
