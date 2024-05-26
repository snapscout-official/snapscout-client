import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
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
import { StageComponentProps, StageTwoFormData } from "@/types/auth-types";

const stageTwoSchema = z.object({
  agency: string({ required_error: "Must select an agency" }),
  contactNumber: string().min(11, {
    message: "Contact number must be atleast 11 characters long",
  }),
});
function AgencyStepTwo({ handleNextStep }: StageComponentProps) {
  const form = useForm<z.infer<typeof stageTwoSchema>>({
    resolver: zodResolver(stageTwoSchema),
  });
  function onSubmit(data: StageTwoFormData) {
    handleNextStep(data);
  }
  const agencies = ["Navigatu", "Minegears", "Marvel"];
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
                      <SelectTrigger className="border border-[#CBD5E1]">
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
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-2">
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Contact Number"
                      className="border border-[#CBD5E1]"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-5 flex justify-end w-full">
            <Button
              type="submit"
              className="bg-[#0F172A] text-white rounded-[.5rem] p-5 hover:bg-[#0F172A]"
            >
              Continue
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default AgencyStepTwo;
