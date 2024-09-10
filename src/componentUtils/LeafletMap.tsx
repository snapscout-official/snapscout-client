"use client";

import { type ReactElement } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression, Map } from "leaflet";
import { LegacyRef } from "react";
type LeafletMapProps = {
  className: string;
  children: React.ReactNode;
  mapRef?: LegacyRef<Map>;
};
export default function LeafletMap({
  className,
  mapRef,
  children,
}: LeafletMapProps): ReactElement {
  //change the default position to  current users location
  const position: LatLngExpression = [8.951549, 125.527725];
  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={true}
      className={className}
      ref={mapRef}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {children}
    </MapContainer>
  );
}
