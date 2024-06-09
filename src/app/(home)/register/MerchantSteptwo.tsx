import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { inter } from "@/app/ui/fonts";
import { merchantTwoSchema } from "@/types/schema";
import { Input } from "@/components/ui/input";
import { MerchantStageComponentProps } from "@/types/auth-types";
export default function MerchantSteptwo({
  handleNextStep,
}: MerchantStageComponentProps) {
  const form = useForm<z.infer<typeof merchantTwoSchema>>({
    resolver: zodResolver(merchantTwoSchema),
    defaultValues: {
      buildingName: "",
    },
  });
  function handleSubmit(formData: z.infer<typeof merchantTwoSchema>) {
    try {
      //handleNextStep from the parent component
      handleNextStep({
        ...formData,
        barangay: "San Vicente",
        city: "Butuan City",
        province: "Agusan Del Norte",
        country: "Philippines",
      });
    } catch (err) {
      //just console initially should be changed to proper error handling
      console.log(err);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-3">
          <FormField
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${inter.className} font-bold`}>
                  Business Name
                </FormLabel>
                <FormControl>
                  <Input
                    onChange={field.onChange}
                    value={field.value}
                    className="bg-white border-[#CBD5E1] rounded-[.5rem]"
                    type="text"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            name="buildingName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${inter.className} font-bold`}>
                  Building Name
                </FormLabel>
                <FormControl>
                  <Input
                    onChange={field.onChange}
                    value={field.value}
                    className="bg-white border-[#CBD5E1] rounded-[.5rem]"
                    type="text"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${inter.className} font-bold`}>
                  Street
                </FormLabel>
                <FormControl>
                  <Input
                    onChange={field.onChange}
                    value={field.value}
                    className="bg-white border-[#CBD5E1] rounded-[.5rem]"
                    type="text"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div className="w-full bg-[#0F172A] h-[200px]"></div>
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
