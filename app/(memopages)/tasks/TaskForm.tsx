import FormWrapper from "@/components/FormWrapper";
import {
  handleCreateTaskWithErrors,
  handleEditTaskWithErrors,
} from "@/components/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useUser } from "@/lib/hooks/client";
import { useToast } from "@/lib/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { taskFormSchema } from "@/app/(memopages)/tasks/schema";
import { Task } from "@/lib/types";
import { useFormStatus } from "react-dom";

type Props = {
  onSubmit?: () => void;
  task?: Task;
};

export default function TaskForm({ onSubmit, task }: Props) {
  const { toast } = useToast();
  const user = useUser();
  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      name: task?.name ?? "",
      description: task?.description ?? undefined,
      category_id: task?.category_id ?? undefined,
      completed: task?.completed ?? false,
      favorite: task?.favorite ?? false,
      complete_by: task?.complete_by ?? "",
    },
  });
  const {
    formState: { errors },
  } = form;

  const isEditing = !!task;
  const actionType = isEditing ? "edit" : "create";

  const taskAction = isEditing
    ? handleEditTaskWithErrors.bind(null, task.id)
    : handleCreateTaskWithErrors.bind(null, user);

  return (
    <Form {...form}>
      <FormWrapper
        action={async (formData) => {
          const { errors } = await taskAction(formData);
          if (errors.length > 0) {
            errors.forEach(([_, message]) => {
              toast({
                title: `Couldn't ${actionType} task`,
                description: message,
              });
            });
            return;
          }

          onSubmit?.();
        }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input
                  placeholder="What do you need to get done?"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="new_task_advanced" className="border-none">
            <AccordionTrigger>Want more detail?</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add more details for your task"
                        className="resize-none"
                        cols={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Category */}

              {/* Completed */}

              {/* Favorite */}

              {/* Complete By */}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {errors?.root?.serverError && (
          <p className="text-sm font-medium text-red-500">
            {errors?.root?.serverError?.message as string}
          </p>
        )}

        <SubmitButton actionType={actionType} />
      </FormWrapper>
    </Form>
  );
}

function SubmitButton({ actionType }: { actionType: "edit" | "create" }) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="default"
      type="submit"
      className="mt-10 w-full uppercase"
      disabled={pending}
    >
      {actionType} task
    </Button>
  );
}
