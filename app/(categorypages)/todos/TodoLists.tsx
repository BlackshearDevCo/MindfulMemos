import CategoryDisclosure from "@/components/CategoryDisclosure";
import TodoItem from "@/components/TodoItem";
import { Todo } from "@/lib/types";
import React from "react";

type Props = {
  todos: Todo[];
};

export default function TodoLists({ todos }: Props) {
  const categorizedTodos = sortTodosByCategory(todos);

  return categorizedTodos.map((categorizedTodo) => {
    const category = categorizedTodo[0]?.category;

    if (categorizedTodo.length === 0) return null;

    return (
      <CategoryDisclosure
        key={category?.id || "uncategorized"}
        name={category?.name}
        categoryId={category?.id}
      >
        {categorizedTodo.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </CategoryDisclosure>
    );
  });
}

type SortedTodos = Todo[][];

function sortTodosByCategory(todos: Todo[]) {
  const sortedTodos: SortedTodos = [];
  const uncategorizedTodos: Todo[] = [];

  todos.forEach((todo) => {
    const { category } = todo;
    if (category?.id) {
      const categoryArr = sortedTodos[category.order];
      !categoryArr
        ? (sortedTodos[category.order] = [todo])
        : sortedTodos[category.order].push(todo);
      return;
    }

    uncategorizedTodos.push(todo);
  });

  sortedTodos.push(uncategorizedTodos);

  return sortedTodos;
}
