"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { inter } from "@/app/ui/fonts";
import { loginMerchantUser } from "@/app/actions/authentication";
const formSchema = z.object({
  email: z.string().min(3, { message: "Email too short" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function MerchantTab() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(formData: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const result = await loginMerchantUser(formData);
      if (result?.error) {
        setError(result.error);
      }
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setLoading(false);
      }
    }
  }
  return (
    <Card className="bg-[#F1F5F9] min-w-full border-none p-5 ">
      <CardContent className={`${inter.className} w-full p-10`}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="border-[#E6E6E6] rounded-[.5rem] bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="border-[#E6E6E6] rounded-[.5rem] bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              {error ? (
                <FormDescription className="text-red-600 text-md">
                  {error}
                </FormDescription>
              ) : null}
              <div className="mt-5 flex justify-end w-full">
                <Button
                  disabled={loading}
                  type="submit"
                  className="bg-[#0F172A]  text-white rounded-[.5rem] p-5 hover:bg-[#0F172A]"
                >
                  {loading ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Login
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
