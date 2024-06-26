import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import {
  AgencyStageComponentProps,
  StageTwoFormData,
} from "@/types/auth-types";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import SubmitButton from "@/componentUtils/SubmitButton";

const stageTwoSchema = z.object({
  agency: z.string({ required_error: "Must select an agency" }),
  dateOfBirth: z.string({ required_error: "Must select date of birth" }),
  gender: z.string({ required_error: "Must select gender" }),
  contactNumber: z.string().min(11, {
    message: "Contact number must be atleast 11 characters long",
  }),
});
function AgencyStepTwo({ handleNextStep }: AgencyStageComponentProps) {
  const form = useForm<z.infer<typeof stageTwoSchema>>({
    resolver: zodResolver(stageTwoSchema),
  });

  function onSubmit(data: StageTwoFormData) {
    handleNextStep(data);
  }
  const agencies = ["Navigatu", "Minegears", "Marvel"];
  const genders = ["male", "female"];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="agency"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-2">
                  <FormLabel>Agency Name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border border-[#CBD5E1] bg-white">
                        <SelectValue placeholder="Select an agency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#18C873] text-white">
                      {agencies.map((agency, index) => (
                        <SelectItem value={agency} key={index}>
                          {agency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full bg-[#0F172A] h-[200px]"></div>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-2">
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border border-[#CBD5E1] bg-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#18C873] text-white">
                      {genders.map((gender, index) => (
                        <SelectItem value={gender} key={index}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-2 flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={cn(
                            "w-[250px] pl-3 text-left font-normal bg-white border-[#CBD5E1] border-[1px]",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-[#0F172A] text-white"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        className="rounded-[.5rem]"
                        selected={new Date(field.value)}
                        onSelect={(date) => {
                          if (date) {
                            const dateString = date?.toISOString();
                            field.onChange(dateString);
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-2">
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Contact Number"
                      className="border border-[#CBD5E1] bg-white"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-5 flex justify-end w-full">
            <SubmitButton>Continue</SubmitButton>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default AgencyStepTwo;
