import React, { useMemo, useRef, useState } from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import {
  MerchantStageThree,
  MerchantStageTwo,
  StageOneFormData,
} from "@/types/auth-types";
import dynamic from "next/dynamic";
import { getLocations } from "@/app/actions/map";

type MerchantStepTwoProps = {
  children: React.ReactNode;
  handleNextStep: (
    formData: StageOneFormData | MerchantStageTwo | MerchantStageThree,
  ) => void;
};

export default function MerchantSteptwo({
  children,
  handleNextStep,
}: MerchantStepTwoProps) {
  const [locations, setLocations] = useState<string[]>();
  const [selectedLocation, setSelectedLocation] = useState<string>();
  const searchLocationRef = useRef<HTMLInputElement>(null);
  const LazyMap = useMemo(
    () =>
      dynamic(() => import("@/componentUtils/LeafletMap"), {
        ssr: false,
      }),
    [],
  );

  const form = useForm<z.infer<typeof merchantTwoSchema>>({
    resolver: zodResolver(merchantTwoSchema),
    defaultValues: {
      buildingName: "",
    },
  });

  const searchLocations = async (location: string) => {
    const searchedLocations = await getLocations(location);
    setLocations(searchedLocations);
  };

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
      //just console initially should be changed to proper error handling console.log(err);
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${inter.className} font-bold`}>
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    onChange={(event) => {
                      searchLocations(event.target.value);
                    }}
                    ref={searchLocationRef}
                    value={field.value}
                    className="bg-white border-[#CBD5E1] rounded-[.5rem]"
                    type="text"
                  />
                </FormControl>
                {locations ? (
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {locations.map((location, idx) => (
                          <CommandItem
                            key={idx}
                            onSelect={() => {
                              setSelectedLocation(location);
                            }}
                          >
                            {location}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                ) : null}
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div className="w-full">
            <LazyMap className="w-full h-[200px]" />
          </div>
          {/* <div className="w-full bg-[#0F172A] h-[200px]"></div> */}
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
