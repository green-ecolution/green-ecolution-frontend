import { useState } from "react";
import { useMapEvents } from "react-leaflet";

export function useMapMouseSelect() {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position;
}
