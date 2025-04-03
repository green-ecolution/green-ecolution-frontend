import { useNavigate } from "@tanstack/react-router";
import { useMapEvents } from "react-leaflet/hooks";
import useMapStore from "@/store/store";

export interface MapConrollerProps {
}

const MapConroller = () => {
  const navigate = useNavigate();
  const { setCenter, setZoom } = useMapStore((state) => ({
    setCenter: state.map.setCenter,
    setZoom: state.map.setZoom,
  }));
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      setCenter([center.lat, center.lng]);
      setZoom(zoom);
      navigate({
        to: ".",
        search: (prev) => ({ ...prev, lat: center.lat, lng: center.lng, zoom }),
        replace: true,
      });
    },
  });

  return null;
};

export default MapConroller;
