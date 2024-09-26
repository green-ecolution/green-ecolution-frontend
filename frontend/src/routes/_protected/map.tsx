import useMapStore from "@/store/store";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { z } from "zod";
import Map from "@/components/map/Map";
import MapConroller from "@/components/map/MapController";
import ZoomControls from "@/components/map/ZoomControls";

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

export const Route = createFileRoute("/_protected/map")({
  component: MapRoot,
  validateSearch: mapSearchParamsSchema,
  loaderDeps: ({ search: { lat, lng, zoom, showSelectModal } }) => ({
    lat,
    lng,
    zoom,
    showSelectModal,
  }),
  loader: ({ deps: { lat, lng, zoom, showSelectModal } }) => {
    useMapStore.setState((state) => ({
      map: { ...state.map, center: [lat, lng], zoom, showSelectModal },
    }));
  },
});

function MapRoot() {
  return (
    <div className="relative">
      <Map>
        <MapConroller path={Route.fullPath} />
        <ZoomControls />
        <Outlet />
      </Map>
    </div>
  );
}
