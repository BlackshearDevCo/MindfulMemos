"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import FormWrapper from "./FormWrapper";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Textarea } from "@/components/ui/Textarea";
import { newTaskFormSchema } from "@/components/formschemas";
import { handleCreateTaskWithErrors } from "@/components/actions";
import { useUser } from "@/lib/hooks/client";

export default function NewTaskButton() {
  const [open, setOpen] = React.useState(false);
  const user = useUser();
  const form = useForm<z.infer<typeof newTaskFormSchema>>({
    resolver: zodResolver(newTaskFormSchema),
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">ADD NEW TASK</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Create task</DialogTitle>
          <DialogDescription>
            Enter the details of your new task below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <FormWrapper
            action={async (formData) => {
              await createTask(formData);
              setOpen(false);
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
      </DialogContent>
    </Dialog>
  );
}
