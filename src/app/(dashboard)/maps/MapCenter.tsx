import { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

type MapCenterType = {
  position: LatLngExpression;
};
export default function MapCenter({ position }: MapCenterType) {
  const map = useMap();

  useEffect(() => {
    if (position) map.setView(position, map.getZoom());
  }, []);
  return null;
}
