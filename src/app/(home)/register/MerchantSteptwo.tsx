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
import { getLocationFromLatLon, getLocations } from "@/app/actions/map";
import { LocationType } from "@/types/map-types";
import { LatLng, Map } from "leaflet";
import { PinMapRegister } from "@/componentUtils/RegiterMap";

type MerchantStepTwoProps = {
  handleNextStep: (
    formData: StageOneFormData | MerchantStageTwo | MerchantStageThree,
  ) => void;
};

export default function MerchantSteptwo({
  handleNextStep,
}: MerchantStepTwoProps) {
  const [locations, setLocations] = useState<LocationType[]>();
  const [selectedLocation, setSelectedLocation] = useState<LocationType>();
  const mapRef = useRef<Map>(null);

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
      //just added one as initial values since it will be changed through validating the client to have location inputted
      location: "",
      longitude: 1,
      latitude: 1

    },
  });

  const searchLocations = async (location: string) => {
    const locationsResult = await getLocations(location, 10);
    setLocations(locationsResult);
  };

  const setCoordinate = (coordinate: LocationType) => {
    form.setValue("latitude", Number(coordinate.lat))
    form.setValue("longitude", Number(coordinate.lon))
  }
  const reverseGeocoding = async (coordinates: LatLng) => {
    const codedLocation = await getLocationFromLatLon({
      lat: coordinates.lat,
      lon: coordinates.lng,
    });
    setSelectedLocation(codedLocation);

    setCoordinate(codedLocation)

    form.setValue("location", codedLocation.display_address);
  };

  const handleSubmit = (formData: z.infer<typeof merchantTwoSchema>) => {
    try {
      //handleNextStep from the parent component
      handleNextStep(formData);
    } catch (err) {
      console.log(err)
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
                      field.onChange(event);
                    }}
                    value={field.value}
                    className="bg-white border-[#CBD5E1] rounded-[.5rem]"
                    type="text"
                  />
                </FormControl>
                {locations && locations?.length !== 0 ? (
                  <Command className="rounded-lg shadow-md h-[100px]">
                    <CommandList>
                      <CommandGroup>
                        {locations.map((location, idx) => (
                          <CommandItem
                            key={idx}
                            onSelect={() => {
                              setSelectedLocation(location);
                              setCoordinate(location);
                              mapRef.current?.flyTo(
                                new LatLng(location.lat, location.lon),
                                mapRef.current.getZoom(),
                              );
                              form.setValue(
                                "location",
                                location.display_address,
                              );
                              setLocations([]);
                            }}
                          >
                            {location.display_address}
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
            <LazyMap className="w-full h-[300px]" mapRef={mapRef}>
              <PinMapRegister
                handleMapClick={reverseGeocoding}
                positionProp={
                  !selectedLocation
                    ? new LatLng(51.505, -0.09)
                    : new LatLng(selectedLocation.lat, selectedLocation.lon)
                }
              />
            </LazyMap>
          </div>
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
