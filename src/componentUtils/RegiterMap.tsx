import { useEffect, type ReactElement } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { LatLng } from "leaflet";
import { useState } from "react";
type PinMapProps = {
  positionProp: LatLng;
  handleMapClick: (coordinates: LatLng) => Promise<void>;
};
export const PinMapRegister = ({
  positionProp,
  handleMapClick,
}: PinMapProps): ReactElement | null => {
  const [position, setPosition] = useState<LatLng>(positionProp);
  const map = useMapEvents({
    click: (mouseEvent) => {
      handleMapClick(mouseEvent.latlng);
      setPosition(mouseEvent.latlng);
    },
  });
  useEffect(() => {
    setPosition(positionProp);
  }, [positionProp]);

  return position ? (
    <Marker position={position}>
      <Popup>
        This Marker icon is displayed correctly with{" "}
        <i>leaflet-defaulticon-compatibility</i>.
      </Popup>
    </Marker>
  ) : null;
};

export function RegisterMap(): ReactElement {
  return (
    <MapContainer>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <PinMap parentPosition={new LatLng(51.505, -0.09)} /> */}
    </MapContainer>
  );
}
