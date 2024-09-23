import Map from "@/components/map/Map";
import ZoomControls from "@/components/map/ZoomControls";
import useMapStore from "@/store/store";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMapEvents } from "react-leaflet/hooks";
import { z } from "zod";

const mapSearchParamsSchema = z.object({
  selected: z.string().optional(),
  lat: z.number().catch(useMapStore.getState().map.center[0]),
  lng: z.number().catch(useMapStore.getState().map.center[1]),
  zoom: z
    .number()
    .int()
    .max(useMapStore.getState().map.maxZoom)
    .min(useMapStore.getState().map.minZoom)
    .catch(useMapStore.getState().map.minZoom),
});

export const Route = createFileRoute("/_protected/map/")({
  component: MapView,
  validateSearch: mapSearchParamsSchema,
  loaderDeps: ({ search: { lat, lng, zoom } }) => ({ lat, lng, zoom }),
  loader: ({ deps: { lat, lng, zoom } }) => {
    useMapStore.setState((state) => ({
      map: { ...state.map, center: [lat, lng], zoom },
    }));
  },
});

function MapView() {
  return (
    <div className="relative">
      <Map>
        <ZoomControls />
        <MapConroller />
      </Map>
    </div>
  );
}

const MapConroller = () => {
  const navigate = useNavigate({ from: Route.fullPath });
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
        search: (prev) => ({ ...prev, lat: center.lat, lng: center.lng, zoom }),
      });
    },
  });

  return null;
};

