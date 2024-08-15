"use server";

export async function getLocations(search: string): Promise<string[]> {
  console.log("Getting locations");
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

  //any for now
  const locations = data.map(
    (locationData: any) => locationData.display_address,
  );
  return locations;
}
