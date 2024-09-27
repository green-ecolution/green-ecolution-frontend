import { LatLng } from "leaflet";
import { useMapEvents } from "react-leaflet";

export function useMapMouseSelect(
  fn: (latlng: LatLng) => any,
) {
  useMapEvents({
    click(e) {
      fn(e.latlng);
    },
  });
}
