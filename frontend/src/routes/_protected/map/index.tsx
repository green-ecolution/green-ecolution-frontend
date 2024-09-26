import Map from "@/components/map/Map";
import MapSelectTreesModal from "@/components/map/MapSelectTreesModal";
import ZoomControls from "@/components/map/ZoomControls";
import useStore from "@/store/store";
import useMapStore from "@/store/store";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMapEvents } from "react-leaflet/hooks";
import { z } from "zod";

const mapSearchParamsSchema = z.object({
  selected: z.string().optional(),
  lat: z.number().catch(useMapStore.getState().map.center[0]),
  lng: z.number().catch(useMapStore.getState().map.center[1]),
  showSelectModal: z.boolean().catch(false),
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
  loaderDeps: ({ search: { lat, lng, zoom, showSelectModal } }) => ({ lat, lng, zoom, showSelectModal }),
  loader: ({ deps: { lat, lng, zoom, showSelectModal } }) => {
    useMapStore.setState((state) => ({
      map: { ...state.map, center: [lat, lng], zoom, showSelectModal },
    }));
  },
});

function MapView() {
  const showSelectModal = useStore((state) => state.map.showSelectModal);

  return (
    <div className="relative">
      <Map>
        {showSelectModal && <MapSelectTreesModal />}
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

