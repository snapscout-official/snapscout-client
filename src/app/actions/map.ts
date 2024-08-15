"use server";
import { LocationType } from "@/types/map-types";
export async function getLocations(search: string): Promise<LocationType[]> {
  console.log("Getting locations");

  if (search.length === 0) {
    return [];
  }
  const result = await fetch(
    `https://api.locationiq.com/v1/autocomplete?key=${process.env.LOCATION_IQ_TOKEN}&q=${search}&limit=5&dedupe=1&`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );
  if (!result.ok) {
    console.log("We have an error");
    throw new Error("We have an error fetching the locations");
  }
  const data = await result.json();
  console.log(data);
  //any for now
  const locations: LocationType[] = data.map((locationData: any) => ({
    display_address: locationData.display_address,
    lat: locationData.lat,
    lon: locationData.lon,
  }));
  return locations;
}

export async function getLocationFromLatLon(coordinates: {
  lat: number;
  lon: number;
}): Promise<LocationType> {
  console.log("Getting locations by numbers");
  const result = await fetch(
    `https://us1.locationiq.com/v1/reverse?key=${process.env.LOCATION_IQ_TOKEN}&lat=${coordinates.lat}&lon=${coordinates.lon}&format=json&`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );
  if (!result.ok) {
    console.log("We have an error");
    throw new Error("We have an error fetching the locations");
  }
  const data = await result.json();
  return { display_address: data.display_name, lon: data.lon, lat: data.lat };
}
