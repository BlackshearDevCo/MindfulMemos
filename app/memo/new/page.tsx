"use client";

import TodoForm from "@/components/TodoForm";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import React from "react";

export default function page() {
  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="border-b-0 flex gap-4 relative">
          {({ selectedIndex }) => (
            <>
              <Tab className="flex-1 text-lg font-semibold text-center rounded-lg px-2 py-1.5">
                Todo
              </Tab>
              <Tab className="flex-1 text-lg font-semibold text-center rounded-lg px-2 py-1.5">
                Thought
              </Tab>
              <div
                className={clsx(
                  "w-1/2 h-full bg-slate-900 rounded-lg px-2 py-1.5",
                  "absolute left-0 top-0 -z-10 transition-transform",
                  selectedIndex === 1 ? "translate-x-full" : ""
                )}
              />
            </>
          )}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <TodoForm />
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
