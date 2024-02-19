// TODO (lol): Update with DB structure
export type Todo = {
  id: number;
  created_at: string;
  title: string;
  description?: string;
  complete_by?: string;
  completed: boolean;
  user_id: string;
  category_id: string;
  category?: Category;
};

// TODO: Update with DB structure
export type Category = {
  id: number;
  created_at: string;
  name: string;
  order: number;
  user_id: string;
};
