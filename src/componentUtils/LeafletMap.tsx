"use client";

import { type ReactElement } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { LatLng, LatLngExpression, Map } from "leaflet";
import { useState } from "react";
import { LegacyRef } from "react";
type LeafletMapProps = {
  className: string;
  children: React.ReactNode;
  mapRef: LegacyRef<Map>;
};
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
  return position ? (
    <>
      <Marker position={position}>
        <Popup>
          This Marker icon is displayed correctly with{" "}
          <i>leaflet-defaulticon-compatibility</i>.
        </Popup>
      </Marker>
    </>
  ) : null;
}
export default function LeafletMap({
  className,
  mapRef,
  children,
}: LeafletMapProps): ReactElement {
  //change the default position to Butuan's coordinates
  const position: LatLngExpression = [51.505, -0.09];
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
