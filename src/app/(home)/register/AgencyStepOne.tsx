import React, { ComponentType } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { StageComponentProps, StageOneFormData } from "@/types/auth-types";
import {
  Form,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "character must be atleast 1" }),
    lastName: z.string().min(1, { message: "character must be atleast 1" }),
    agency: z.string({ required_error: "Please select an agency" }),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;
    for (let i = 0; i < password.length; i++) {
      let ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }
    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1 ||
      confirmPassword !== password
    ) {
      ctx.addIssue({
        code: "custom",
        message: "The password does not match or does not meet complexity",
        path: ["password"],
      });
    }
  });
function AgencyStepOne({ handleNextStep }: StageComponentProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });
  function onSubmit(data: StageOneFormData) {
    handleNextStep(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="">
                <div className="space-y-2">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className=" text-[#64748B] border border-[#E6E6E6]"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="">
                <div className="space-y-2">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className=" text-[#64748B] border border-[#E6E6E6]"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="">
                <div className="space-y-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className=" text-[#64748B] border border-[#E6E6E6]"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="">
                <div className="space-y-2">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className=" text-[#64748B] border border-[#E6E6E6]"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-5 flex justify-end w-full">
          <Button
            type="submit"
            className="bg-[#0F172A] text-white rounded-[.5rem] p-5 hover:bg-[#0F172A]"
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AgencyStepOne;
