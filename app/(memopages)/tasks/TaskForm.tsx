import FormWrapper from "@/components/FormWrapper";
import { handleCreateTaskWithErrors } from "@/components/actions";
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

type Props = {
  onSubmit?: () => void;
};

export default function TaskForm({ onSubmit }: Props) {
  const { toast } = useToast();
  const user = useUser();
  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      name: "",
      description: undefined,
      category_id: undefined,
      completed: false,
      complete_by: "",
    },
  });
  const {
    formState: { errors },
  } = form;

  const createTask = handleCreateTaskWithErrors.bind(null, user);

  return (
    <Form {...form}>
      <FormWrapper
        action={async (formData) => {
          const { errors } = await createTask(formData);
          if (errors.length > 0) {
            errors.forEach(([_, message]) => {
              toast({
                title: "Couldn't create task",
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {errors?.root?.serverError && (
          <p className="text-sm font-medium text-red-500">
            {errors?.root?.serverError?.message as string}
          </p>
        )}

        <Button variant="default" type="submit" className="mt-10 w-full">
          Create task
        </Button>
      </FormWrapper>
    </Form>
  );
}
