"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { merchantStepFourSchema } from "@/types/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { MerchantGlobalStates } from "@/types/auth-types";
import { registerMerchantUser } from "@/app/actions/authentication";
import { generateNewFormData } from "@/services/authService";
type StepFourProps = {
  globalFormValues: MerchantGlobalStates;
};
export default function MerchantStepFour({ globalFormValues }: StepFourProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const form = useForm<z.infer<typeof merchantStepFourSchema>>({
    resolver: zodResolver(merchantStepFourSchema),
    defaultValues: {
      accepts: false,
    },
  });
  async function handleFormSubmit(
    formData: z.infer<typeof merchantStepFourSchema>,
  ) {
    setLoading(true);
    if (!formData.accepts) {
      alert("Must accept terms and policy");
      return;
    }

    try {
      const modifiedFormValues: MerchantGlobalStates = {
        ...globalFormValues,
        dateOfBirth: new Date("2024-06-09").toISOString(),
        gender: "male",
        phoneNumber: "09918804161",
        category: "Testing",
      };
      const newFormData = generateNewFormData(modifiedFormValues);
      const result = await registerMerchantUser(newFormData);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setLoading(false);
        setError(err.message);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="space-y-5">
          <ScrollArea className="w-full h-[300px]">
            Jokester began sneaking into the castle in the middle of the night
            and leaving jokes all over the place: under the kings pillow, in his
            soup, even in the royal toilet. The king was furious, but he couldnt
            seem to stop Jokester. And then, one day, the people of the kingdom
            discovered that the jokes left by Jokester were so funny that they
            couldnt help but laugh. And once they started laughing, they couldnt
            stop.
          </ScrollArea>
          <FormField
            name="accepts"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="leading-6">
                    <FormLabel className="font-semi-bold text-md">
                      Accept terms and condition
                    </FormLabel>
                    <FormDescription className="text-[#64748B]">
                      You agree to our Terms of Service and Privacy Policy
                    </FormDescription>
                  </div>
                </div>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div className="mt-5 flex justify-end w-full">
            <Button
              disabled={loading}
              type="submit"
              className="bg-[#0F172A] text-white rounded-[.5rem] p-5 hover:bg-[#0F172A]"
            >
              {loading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Sign Up
            </Button>
          </div>
          {error ? (
            <FormDescription className="text-red-600">{error}</FormDescription>
          ) : null}
        </div>
      </form>
    </Form>
  );
}
