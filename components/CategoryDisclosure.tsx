"use client";

import { Disclosure, Transition } from "@headlessui/react";
import NewTodoItem from "@/components/NewTodoItem";
import { ButtonHTMLAttributes, useState } from "react";

type CategoryDisclosureProps = {
  name?: string;
  categoryId?: number;
  children: React.ReactNode;
};

export default function CategoryDisclosure({
  children,
  categoryId,
  name = "Uncategorized",
}: CategoryDisclosureProps) {
  const [addingNewTodo, setAddingNewTodo] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <Disclosure defaultOpen>
        <div className="w-full flex">
          <Disclosure.Button className="flex-1 text-left">
            {name}
          </Disclosure.Button>
          <Disclosure.Button
            as={NewCategoryTodoButton}
            onClick={() => setAddingNewTodo(true)}
            onAddNewTodo={() => setAddingNewTodo(true)}
          >
            +
          </Disclosure.Button>
        </div>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel className="flex flex-col gap-1">
            {addingNewTodo ? (
              <NewTodoItem
                categoryId={categoryId}
                removeItem={() => setAddingNewTodo(false)}
                onAddTodo={() => setAddingNewTodo(false)}
              />
            ) : null}
            {children}
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
    </div>
  );
}

type NewCategoryTodoButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onAddNewTodo: () => void;
  "data-headlessui-state"?: string;
};

function NewCategoryTodoButton(props: NewCategoryTodoButtonProps) {
  const isOpen = props?.["data-headlessui-state"] === "open";

  // HACK: Disclosure component doesn't allow for programatically opening, so this is a hack to open the component when clicking the plus icon, but not to close it
  const modifiedProps = {
    ...props,
    onClick: isOpen ? props.onAddNewTodo : props.onClick,
    onKeyDown: isOpen ? () => {} : props.onKeyDown,
    onKeyUp: isOpen ? () => {} : props.onKeyUp,
  };

  return (
    <button className="px-2" {...modifiedProps}>
      +
    </button>
  );
}
