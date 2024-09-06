"use server";
import { LocationType } from "@/types/map-types";
export async function getLocations(
  search: string,
  limit: number,
): Promise<LocationType[]> {
  console.log("Getting locations");

  if (search.length === 0) {
    return [];
  }
  const result = await fetch(
    `https://api.locationiq.com/v1/autocomplete?key=${process.env.LOCATION_IQ_TOKEN}&q=${search}&limit=${limit}&dedupe=1&`,
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

export async function forwardGeolocation(
  search: string,
): Promise<LocationType> {
  const result = await fetch(
    `https://us1.locationiq.com/v1/search?key=${process.env.LOCATION_IQ_TOKEN}&q=${search}&format=json&`,
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
  //im assuming this si safe since the api returns only one element but in a form of array
  const [data] = await result.json();
  const location: LocationType = {
    display_address: data.display_name,
    lat: Number(data.lat),
    lon: Number(data.lon),
  };
  return location;
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
