import React from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function TodoForm() {
  return (
    <div>
      <form className="flex flex-col gap-2">
        <Input
          name="title"
          label="Title"
          placeholder="What do you need to do?"
          required
        />
        <Textarea
          name="description"
          label="Description"
          placeholder="What other info is helpful?"
        />
        <Input name="completeBy" label="Complete By" type="date" />
      </form>
    </div>
  );
}

// Title
// Description
// Complete By
// Completed
// User ID (Implicit)
