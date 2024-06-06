"use client";
import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
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
import { toArrayBuffer } from "@/services/authService";
type StepFourProps = {
  globalFormValues: MerchantGlobalStates;
};
export default function MerchantStepFour({ globalFormValues }: StepFourProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof merchantStepFourSchema>>({
    resolver: zodResolver(merchantStepFourSchema),
    defaultValues: {
      accepts: false,
    },
  });
  async function handleFormSubmit(
    formData: z.infer<typeof merchantStepFourSchema>,
  ) {
    if (!formData.accepts) {
      alert("Must accept terms and policy");
      return;
    }
    //create an buffer array with mapped name and the buffer content then pass to globalFormValues
    const bufferResult = await toArrayBuffer([
      globalFormValues.bussinessPermit[0],
      globalFormValues.philgeps[0],
    ]);
    const newFormData = new FormData();
    Object.keys(globalFormValues).forEach((keys: string) => {
      if (!(globalFormValues[keys] instanceof FileList)) {
        newFormData.append(keys, globalFormValues[keys]);
        return;
      }
      newFormData.append(keys, globalFormValues[keys][0]);
    });

    const result = await registerMerchantUser(newFormData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="space-y-5">
          <ScrollArea className="w-full h-[300px]">
            Jokester began sneaking into the castle in the middle of the night
            and leaving jokes all over the place: under the king's pillow, in
            his soup, even in the royal toilet. The king was furious, but he
            couldn't seem to stop Jokester. And then, one day, the people of the
            kingdom discovered that the jokes left by Jokester were so funny
            that they couldn't help but laugh. And once they started laughing,
            they couldn't stop. Jokester began sneaking into the castle in the
            middle of the night and leaving jokes all over the place: under the
            king's pillow, in his soup, even in the royal toilet. The king was
            furious, but he couldn't seem to stop Jokester. And then, one day,
            the people of the kingdom discovered that the jokes left by Jokester
            were so funny that they couldn't help but laugh. And once they
            started laughing, they couldn't stop.Jokester began sneaking into
            the castle in the middle of the night and leaving jokes all over the
            place: under the king's pillow, in his soup, even in the royal
            toilet. The king was furious, but he couldn't seem to stop Jokester.
            And then, one day, the people of the kingdom discovered that the
            jokes left by Jokester were so funny that they couldn't help but
            laugh. And once they started laughing, they couldn't stop.
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
        </div>
      </form>
    </Form>
  );
}
