import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AgencyStageComponentProps,
  MerchantStageComponentProps,
  StageOneFormData,
} from "@/types/auth-types";
import {
  Form,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import SubmitButton from "@/componentUtils/SubmitButton";

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "character must be atleast 1" }),
    email: z.string().email({ message: "must be a valid email" }),
    lastName: z.string().min(1, { message: "character must be atleast 1" }),
    tinNumber: z
      .string()
      .min(6, { message: "character must be atleast 6 characters long" }),
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
export default function StepOne({
  handleNextStep,
}: AgencyStageComponentProps | MerchantStageComponentProps) {
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
                      className=" text-[#64748B] border border-[#E6E6E6] bg-white"
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
                      className=" text-[#64748B] border border-[#E6E6E6] bg-white"
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
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <div className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className=" text-[#64748B] border border-[#E6E6E6] bg-white"
                      type="email"
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
            name="tinNumber"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-2">
                  <FormLabel>Tin Number</FormLabel>
                  <FormControl>
                    <Input
                      className=" text-[#64748B] border border-[#E6E6E6] bg-white"
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
                      className=" text-[#64748B] border border-[#E6E6E6] bg-white"
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
                      className=" text-[#64748B] border border-[#E6E6E6] bg-white"
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
          <SubmitButton>Continue</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
