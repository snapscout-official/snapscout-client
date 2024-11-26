"use client";
import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { LatLng, LatLngExpression } from "leaflet";

type MapRoutingType = {
  myCurrentLocation: LatLng;
};
//get the agency's current latlng as the start and get the position of the clicked marker
export default function MapRouting({ myCurrentLocation }: MapRoutingType) {
  const [currentSelectedPositon, setCurrentSelectedPosition] =
    useState<LatLng>();
  async function getDirections() {
    if (!currentSelectedPositon) {
      throw new Error("cannot get direction on undefined positions");
    }
    const directionResult = await fetch(
      `${process.env.NEXT_PUBLIC_OPEN_ROUTE}/v2/directions/driving-car?${process.env.NEXT_PUBLIC_OPEN_ROUTE_TOKEN}&start=${myCurrentLocation.lat},${myCurrentLocation.lng}&end=${currentSelectedPositon.lat},${currentSelectedPositon.lng}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!directionResult.ok) {
      throw new Error("Something went wrong fetching external api");
    }
    const successDirectionData = await directionResult.json();
    console.log(successDirectionData);
  }
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setCurrentSelectedPosition(e.latlng);
      getDirections();
    },
  });
  return null;
}
