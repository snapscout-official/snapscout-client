"use client";
import MainContainer from "@/componentUtils/MainContainer";
import React from "react";
import { inter700, inter, interLight } from "../ui/fonts";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
const formSchema = z.object({
  email: z
    .string()
    .min(5, { message: "Email must be 5 characters above" })
    .email("Not a valid email"),
});
function Landing() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data: { email: string }) => {
    console.log(data);
  };
  return (
    <MainContainer>
      <div className="grid grid-cols-1">
        <h2
          className={`${inter.className} text-[#18C873] font-bold text-lg text-center`}
        >
          Your go-to marketplace
        </h2>
        <h1
          className={`${inter700.className} font-bold text-[3rem] text-white text-center mt-1 md:text-[3.5rem] lg:text-[4.5rem]`}
        >
          Canvassing Made Easy
        </h1>
        <p
          className={`${interLight.className} text-md text-[#FFF5E0] font-semibold mx-auto text-center lg:w-[45%] lg:mx-auto`}
        >
          Forget scrolling through endless online reviews or sifting through
          online posts - SnapScout puts the power of convenience at your
          fingertips, letting you find the best product or service quickly and
          effortlessly.
        </p>
        <div
          className={` ${inter.className} bg-white p-2 rounded-[.5rem] mt-[3rem] items-center  mx-auto`}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex items-center gap-3">
                      <FormControl>
                        <Input
                          className=" text-[#64748B] border border-[#E6E6E6]"
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        className="bg-[#18C873] text-white p-5 rounded-[.3rem] font-bold"
                        type="submit"
                      >
                        Get Notified
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </MainContainer>
  );
}

export default Landing;
