"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
type FormData = {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  secondName: string;
  agency: string;
};
const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "character must be atleast 1" }),
    secondName: z.string().min(1, { message: "character must be atleast 1" }),
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

function AgencyTab() {
  const [step, setStep] = useState<number>(1);
  const maxStep = 3;
  const agencies = ["Navigatu", "Minegears", "Marvel"];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      firstName: "",
      agency: "",
      lastName: "",
    },
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
    if (step !== maxStep) {
      setStep(step + 1);
    }
  };
  return (
    <Card className="bg-white border-none rounded-[.2rem] p-5">
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step == 1 ? (
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
                      </div>{" "}
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
            ) : null}
            {step == 2 ? (
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="secondName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>Second Name</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border border-[#CBD5E1]">
                              <SelectValue placeholder="Select an agency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
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
              </div>
            ) : null}
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
      </CardContent>
    </Card>
  );
}

export default AgencyTab;
