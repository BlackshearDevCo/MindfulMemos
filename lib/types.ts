export enum Categories {
  Todos = "todos",
  Thoughts = "thoughts",
}

// TODO (lol): Update with DB structure
export type Todo = {
  id: string;
  title: string;
  description?: string;
  completeBy?: string; // (date?)
};
