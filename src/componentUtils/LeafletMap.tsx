"use client";

import { type ReactElement } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import { LatLng, LatLngExpression } from "leaflet";
import { useState } from "react";

function LocationMarker(): ReactElement | null {
  const [position, setPosition] = useState<LatLng>();
  const map = useMapEvents({
    click: () => {
      map.locate();
    },
    locationfound: (location) => {
      setPosition(location.latlng);
      map.flyTo(location.latlng, map.getZoom());
    },
  });
  return null;
}
export default function LeafletMap(): ReactElement {
  const position: LatLngExpression = [51.505, -0.09];
  return (
    <MapContainer
      center={position}
      zoom={11}
      scrollWheelZoom={true}
      className="h-[250px] w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <Marker position={position}>
        <Popup>
          This Marker icon is displayed correctly with{" "}
          <i>leaflet-defaulticon-compatibility</i>.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
