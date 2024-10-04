import { LatLng, LeafletMouseEvent } from "leaflet";
import { useMapEvents } from "react-leaflet";

export function useMapMouseSelect(
  fn: (latlng: LatLng, e: LeafletMouseEvent) => any,
) {
  useMapEvents({
    click(e) {
      fn(e.latlng, e);
    },
  });
}
