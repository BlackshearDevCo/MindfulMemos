"use client";

import { Menu, Transition } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";

export default function HeaderDropdown() {
  return (
    <Menu as={MenuContainer}>
      <Menu.Button>
        <PlusCircleIcon className="h-7 w-7" />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 block w-min min-w-[200px] rounded-xl bg-background-50 py-3 shadow-lg ring-1 ring-gray-900/5">
          <Menu.Item>
            {({ active }) => <MenuItem active={active}>Add new task</MenuItem>}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <MenuItem active={active}>Add new thought</MenuItem>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <MenuItem active={active}>Add new category</MenuItem>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function MenuContainer({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

type MenuItemProps = {
  children: React.ReactNode;
  active: boolean;
};

function MenuItem({ children, active }: MenuItemProps) {
  return (
    <button
      className={clsx(
        "w-full whitespace-nowrap px-3 py-1.5 text-left font-semibold transition-colors hover:bg-background-100 active:bg-background-100",
        active ? "bg-background-100" : "",
      )}
    >
      {children}
    </button>
  );
}