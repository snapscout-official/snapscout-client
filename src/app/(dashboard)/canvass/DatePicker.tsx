"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { FormItem, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
export default function DatePicker() {
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button variant="outline" type="button">
          <span>Pick a Date</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={new Date(Date.now())}
          onSelect={(date) => {
            console.log(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
