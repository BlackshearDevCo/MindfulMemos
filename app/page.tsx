import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

enum Category {
  Todos = "todos",
  Thoughts = "thoughts",
}

// TODO (lol): Update with DB structure
type Todo = {
  id: string;
  title: string;
  description?: string;
  completeBy?: string; // (date?)
};

export default function Home() {
  return (
    <main className="flex-1 flex flex-col gap-4 p-4">
      <Tabs>
        <TabsList
          defaultValue={Category.Todos}
          className="border-b-0 flex gap-4"
        >
          <TabsTrigger value={Category.Todos}>Todos</TabsTrigger>
          <TabsTrigger value={Category.Thoughts}>Thoughts</TabsTrigger>
        </TabsList>
        <TabsContent value={Category.Todos}>
          <div className="grid gap-4 pt-4">
            <div className="grid gap-1">
              <Checkbox id="task1" />
              <Label className="ml-2 text-sm" htmlFor="task1">
                Call mom
              </Label>
              <Input
                className="w-full"
                id="task1-date"
                placeholder="Select a date"
                type="date"
              />
            </div>
            <div className="grid gap-1">
              <Checkbox id="task2" />
              <Label className="ml-2 text-sm" htmlFor="task2">
                Buy groceries
              </Label>
              <Input
                className="w-full"
                id="task2-date"
                placeholder="Select a date"
                type="date"
              />
            </div>
            <div className="grid gap-1">
              <Checkbox id="task3" />
              <Label className="ml-2 text-sm" htmlFor="task3">
                Walk the dog
              </Label>
              <Input
                className="w-full"
                id="task3-date"
                placeholder="Select a date"
                type="date"
              />
            </div>
            <div className="grid gap-1">
              <Checkbox defaultChecked id="task4" />
              <Label className="ml-2 text-sm" htmlFor="task4">
                Schedule meeting
              </Label>
              <Input
                className="w-full"
                id="task4-date"
                placeholder="Select a date"
                type="date"
              />
            </div>
            <div className="grid gap-1">
              <Checkbox defaultChecked id="task5" />
              <Label className="ml-2 text-sm" htmlFor="task5">
                Finish report
              </Label>
              <Input
                className="w-full"
                id="task5-date"
                placeholder="Select a date"
                type="date"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
