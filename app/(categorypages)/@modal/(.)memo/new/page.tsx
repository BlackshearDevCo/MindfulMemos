"use client";

import TodoForm from "@/components/TodoForm";
import React from "react";
import { ModalRoute } from "@/components/ui/Modal";

export default function page() {
  return (
    <ModalRoute title="New todo">
      <TodoForm />
    </ModalRoute>
  );
}
