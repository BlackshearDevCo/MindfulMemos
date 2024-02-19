"use client";

import { Todo } from "@/lib/types";
import { Disclosure, Transition } from "@headlessui/react";
import React from "react";

type Props = {
  todos: Todo[];
};

export default function TodoLists({ todos }: Props) {
  const categorizedTodos = sortTodosByCategory(todos);

  return (
    <>
      {categorizedTodos.map((categorizedTodo) => {
        const category = categorizedTodo[0]?.category;

        if (categorizedTodo.length === 0) return null;

        return (
          <CategoryDisclosure
            key={category?.id || "uncategorized"}
            name={category?.name}
          >
            {categorizedTodo.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </CategoryDisclosure>
        );
      })}
    </>
  );
}

function NewCategoryTodoButton(props: any) {
  const isOpen = props["data-headlessui-state"] === "open";

  // HACK: Disclosure component doesn't allow for programatically opening, so this is a hack to open the component when clicking the plus icon, but not to close it
  const modifiedProps = {
    ...props,
    onClick: isOpen ? () => {} : props.onClick,
    onKeyDown: isOpen ? () => {} : props.onKeyDown,
    onKeyUp: isOpen ? () => {} : props.onKeyUp,
  };

  return (
    <button className="px-2" {...modifiedProps}>
      +
    </button>
  );
}

type CategoryDisclosureProps = {
  name?: string;
  children: React.ReactNode;
};

function CategoryDisclosure({
  children,
  name = "Uncategorized",
}: CategoryDisclosureProps) {
  return (
    <div className="flex flex-col gap-1">
      <Disclosure defaultOpen>
        <div className="w-full flex">
          <Disclosure.Button className="flex-1 text-left">
            {name}
          </Disclosure.Button>
          <Disclosure.Button as={NewCategoryTodoButton}>+</Disclosure.Button>
        </div>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel className="">{children}</Disclosure.Panel>
        </Transition>
      </Disclosure>
    </div>
  );
}

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="flex justify-start items-center gap-2 relative">
      <input type="checkbox" id={`todo_${todo.id}`} className="hidden peer" />
      <label
        htmlFor={`todo_${todo.id}`}
        className="cursor-pointer z-10 w-5 h-5 rounded-full border-2 border-secondary peer-checked:bg-secondary"
      />
      <label htmlFor={`todo_${todo.id}`} className="cursor-pointer text-lg">
        {todo.title}
      </label>
    </div>
  );
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
