"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { inter } from "@/app/ui/fonts";
import { agencyLoginUser } from "@/app/actions/authentication";
import { LoginStates } from "@/types/auth-types";
const formSchema = z.object({
  email: z.string().min(3, { message: "Email too short" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});
export default function AgencyTab() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function handleLogin(formData: LoginStates) {
    try {
      setLoading(true);
      await agencyLoginUser({
        email: formData.email,
        password: formData.password,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Card className="bg-white min-w-full border-none p-3">
      <CardContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <div className="space-y-3">
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`${inter.className}`}>
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email "
                        className="border-[#E6E6E6] rounded-[.5rem]"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`${inter.className}`}>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        className="border-[#E6E6E6] rounded-[.5rem]"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                disabled={loading}
                type="submit"
                className="bg-[#0F172A] text-white rounded-[.5rem] p-5 hover:bg-[#0F172A]"
              >
                {loading ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
