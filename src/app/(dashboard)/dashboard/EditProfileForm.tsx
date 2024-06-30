"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { inter, interLight } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editProfile } from "@/app/actions/user";
const formSchema = z.object({
  firstName: z
    .string()
    .regex(
      new RegExp(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/),
      "first name should contain only alphabets",
    ),
  lastName: z
    .string()
    .regex(
      new RegExp(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/),
      "last name should contain only alphabets",
    ),
  email: z.string().email({ message: "must be a valid email" }),
});
type formProps = {
  firstName: string | undefined;
  email: string | undefined;
  lastName: string | undefined;
};
export default function EditProfileForm({
  firstName,
  lastName,
  email,
}: formProps) {
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
    },
  });
  async function handleFormSubmit(formData: z.infer<typeof formSchema>) {
    if (!canEdit) {
      setCanEdit(true);
      return;
    }
    //server action

    const data = await editProfile(formData);
    //should revalidate the session
    console.log("Result we got from server action:", data);
    setCanEdit(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className={`${inter.className} w-full`}
      >
        <h1 className="text-start text-md text-slate-900 font-bold md:text-lg xl:text-2xl">
          Edit Profile
        </h1>
        <p
          className={`${interLight.className} text-start text-xs text-lightText font-extralight lg:text-sm`}
        >
          Make changes to your profile. Click save when youre done
        </p>
        <div className="flex flex-col space-y-3 py-3">
          <FormField
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <div className=" flex items-center ">
                  <FormLabel className="text-start text-xs text-slate-900 w-[20%] md:text-md 2xl:text-xl">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={!canEdit}
                      type="text"
                      {...field}
                      className="rounded-[.5rem] border-[#CBD5E1] border-2 md:p-5"
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel className="text-start text-xs text-slate-900 w-[20%] md:text-md 2xl:text-xl">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={canEdit ? false : true}
                      type="text"
                      {...field}
                      className="rounded-[.5rem] border-[#CBD5E1] border-2 md:p-5"
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className=" flex items-center">
                  <FormLabel className="text-start text-xs text-slate-900 w-[20%] md:text-md 2xl:text-xl">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={!canEdit}
                      type="text"
                      {...field}
                      className="rounded-[.5rem] border-[#CBD5E1] border-2 p-5 "
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          {canEdit ? (
            <div className="flex justify-between gap-4">
              <Button
                type="button"
                onClick={() => {
                  setCanEdit(false);
                }}
                className="bg-red-500 text-white rounded-[.5rem] hover:bg-red-500"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-slate-900 text-white rounded-[.5rem] hover:bg-slate-900"
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <Button
              type="submit"
              className="bg-slate-900 text-white rounded-[.5rem] hover:bg-slate-900"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
