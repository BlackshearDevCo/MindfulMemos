import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export function ListView() {
  return (
    <div className="h-screen flex flex-col">
      <header className="flex h-14 items-center border-b px-4">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <CheckCircleIcon className="h-6 w-6" />
          <span className="">MindfulMemos</span>
        </Link>
        <Button className="ml-auto h-8 w-8" size="icon" variant="ghost">
          <SearchIcon className="h-4 w-4" />
          <span className="sr-only">Toggle search</span>
        </Button>
      </header>
      <main className="flex-1 flex flex-col gap-4 p-4">
        <Tabs>
          <TabsList className="flex gap-4">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="thoughts">Thoughts</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks">
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <form>
                  <div className="grid gap-1">
                    <Label className="text-sm" htmlFor="title">
                      Title
                    </Label>
                    <Input className="w-full" id="title" placeholder="Enter a title" required />
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-sm" htmlFor="description">
                      Description
                    </Label>
                    <Textarea
                      className="w-full min-h-[100px]"
                      id="description"
                      placeholder="Enter a description"
                      required
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-sm" htmlFor="type">
                      Type
                    </Label>
                    <RadioGroup className="flex items-center gap-2" defaultValue="task" id="type">
                      <Label
                        className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        htmlFor="type-task"
                      >
                        <RadioGroupItem id="type-task" value="task" />
                        Task
                      </Label>
                      <Label
                        className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        htmlFor="type-thought"
                      >
                        <RadioGroupItem id="type-thought" value="thought" />
                        Thought
                      </Label>
                    </RadioGroup>
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-sm" htmlFor="complete-by">
                      Complete by
                    </Label>
                    <Input className="w-full" id="complete-by" placeholder="Select a date" type="date" />
                  </div>
                  <Button type="submit">Add</Button>
                </form>
              </div>
              <div className="border-t">
                <Tabs>
                  <TabsList className="border-b-0 flex gap-4">
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  <TabsContent value="open">
                    <div className="grid gap-4 pt-4">
                      <div className="grid gap-1">
                        <Checkbox id="task1" />
                        <Label className="ml-2 text-sm" htmlFor="task1">
                          Call mom
                        </Label>
                        <Input className="w-full" id="task1-date" placeholder="Select a date" type="date" />
                      </div>
                      <div className="grid gap-1">
                        <Checkbox id="task2" />
                        <Label className="ml-2 text-sm" htmlFor="task2">
                          Buy groceries
                        </Label>
                        <Input className="w-full" id="task2-date" placeholder="Select a date" type="date" />
                      </div>
                      <div className="grid gap-1">
                        <Checkbox id="task3" />
                        <Label className="ml-2 text-sm" htmlFor="task3">
                          Walk the dog
                        </Label>
                        <Input className="w-full" id="task3-date" placeholder="Select a date" type="date" />
                      </div>
                    </div>
                    <div className="grid gap-4 pt-4">
                      <div className="grid gap-1">
                        <Checkbox defaultChecked id="task4" />
                        <Label className="ml-2 text-sm" htmlFor="task4">
                          Schedule meeting
                        </Label>
                        <Input className="w-full" id="task4-date" placeholder="Select a date" type="date" />
                      </div>
                      <div className="grid gap-1">
                        <Checkbox defaultChecked id="task5" />
                        <Label className="ml-2 text-sm" htmlFor="task5">
                          Finish report
                        </Label>
                        <Input className="w-full" id="task5-date" placeholder="Select a date" type="date" />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <form>
                <div className="grid gap-1">
                  <Label className="text-sm" htmlFor="thought">
                    New thought
                  </Label>
                  <Textarea className="min-h-[100px]" id="thought" placeholder="Enter your thought" required />
                </div>
                <Button type="submit">Add</Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}


function CheckCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}


function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
