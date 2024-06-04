import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { inter } from "@/app/ui/fonts";
import {
  MerchantStageComponentProps,
  MerchantStageThree,
} from "@/types/auth-types";
import { merchantThreeSchema } from "@/types/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import BusinessAccordion from "./BusinessAccordion";
import PhilgepAccordion from "./PhilgepAccordion";
type FileObject = {
  file: File;
  designation: string;
};
export default function MerchantStepThree({
  handleNextStep,
}: MerchantStageComponentProps) {
  const [images, setImages] = useState<FileObject[] | null>();
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const form = useForm<z.infer<typeof merchantThreeSchema>>({
    resolver: zodResolver(merchantThreeSchema),
  });
  const businessPermitRef = form.register("bussinessPermit", {
    required: true,
  });

  const philgepsRef = form.register("philgeps", { required: true });
  function handleSubmit(formData: MerchantStageThree) {
    try {
      //idk wtf i am doing if this is correct
      if (!confirmed) {
        setImages([
          { file: formData.bussinessPermit[0], designation: "businessPermit" },
          { file: formData.philgeps[0], designation: "philgeps" },
        ]);
        setConfirmed(true);
        return;
      }
      handleNextStep(formData);
    } catch (err) {
      //just console initially should be changed to proper error handling
      console.log(err);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-4">
          <FormField
            name="businessPermit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${inter.className} font-bold`}>
                  Business Permit
                </FormLabel>
                <FormControl>
                  <Input
                    {...businessPermitRef}
                    className="bg-white border-[#CBD5E1] rounded-[.5rem]"
                    type="file"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            name="philgeps"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${inter.className} font-bold`}>
                  Philgeps Image
                </FormLabel>
                <FormControl>
                  <Input
                    {...philgepsRef}
                    className="bg-white border-[#CBD5E1] rounded-[.5rem]"
                    type="file"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <Accordion type="single" collapsible>
            <BusinessAccordion image={images ? images[0] : null} />
            <PhilgepAccordion image={images ? images[1] : null} />
          </Accordion>
          <FormField
            name="accepts"
            render={({ field }) => (
              <div className="flex items-center gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-[#CBD5E1]"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-md">
                    I am sure that my documents are correct
                  </FormLabel>
                  <FormDescription className="text-[#64748B]">
                    You agree to our Terms of Service and Privacy Policy
                  </FormDescription>
                </div>
                <FormMessage className="text-red-600" />
              </div>
            )}
          />
        </div>
        <div className="mt-5 flex justify-end w-full">
          <Button
            type="submit"
            className="bg-[#0F172A] text-white rounded-[.5rem] p-5 hover:bg-[#0F172A]"
          >
            {confirmed ? "Continue" : "Confirm"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
