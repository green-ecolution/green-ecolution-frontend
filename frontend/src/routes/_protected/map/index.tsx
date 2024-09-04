import Map from "@/components/Map";
import MapMarker, { TreeIcon } from "@/components/MapMarker";
import { useTrees } from "@/context/TreeDataContext";
import useMapStore from "@/store/store";
import { Tree } from "@green-ecolution/backend-client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
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
  const trees = useTrees();

  return (
    <div className="relative">
      <Map>
        <MapConroller />
        <TreeMarker trees={trees} />
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

const TreeMarker = ({ trees }: { trees: Tree[] }) => {
  const treeMarkers = useMemo(
    () =>
      trees.map((tree) => (
        <MapMarker
          key={tree.id}
          position={[tree.location.latitude, tree.location.longitude]}
          icon={TreeIcon("green")}
          onClick={() => {
            // navigate to tree detail page
          }}
        />
      )),
    [trees],
  );

  return <>{treeMarkers}</>;
};

