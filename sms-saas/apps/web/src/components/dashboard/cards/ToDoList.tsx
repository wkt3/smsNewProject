"use client";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const ToDoList = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div>
        <h1 className="text-lg font-medium mb-6">ToDo List</h1>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button className="w-full">
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Pick a Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
        {/* List */}
        <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {/* list items */}
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <Checkbox id="item1" checked />
                <label
                  className="text-sm text-muted-foreground"
                  htmlFor="item1"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  molestias sequi debitis tempora, reiciendis sapiente rem
                  accusamus inventore voluptatem eos.
                </label>
              </div>
            </Card>
            {/* list items */}
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <Checkbox id="item1" checked />
                <label
                  className="text-sm text-muted-foreground"
                  htmlFor="item1"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  molestias sequi debitis tempora, reiciendis sapiente rem
                  accusamus inventore voluptatem eos.
                </label>
              </div>
            </Card>
            {/* list items */}
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <Checkbox id="item1" checked />
                <label
                  className="text-sm text-muted-foreground"
                  htmlFor="item1"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  molestias sequi debitis tempora, reiciendis sapiente rem
                  accusamus inventore voluptatem eos.
                </label>
              </div>
            </Card>
            {/* list items */}
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <Checkbox id="item1" checked />
                <label
                  className="text-sm text-muted-foreground"
                  htmlFor="item1"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  molestias sequi debitis tempora, reiciendis sapiente rem
                  accusamus inventore voluptatem eos.
                </label>
              </div>
            </Card>
            {/* list items */}
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <Checkbox id="item1" checked />
                <label
                  className="text-sm text-muted-foreground"
                  htmlFor="item1"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  molestias sequi debitis tempora, reiciendis sapiente rem
                  accusamus inventore voluptatem eos.
                </label>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default ToDoList;
