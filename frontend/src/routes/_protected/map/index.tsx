import { treeApi } from "@/api/backendApi";
import Map from "@/components/map/Map";
import MapSelectTreesModal from "@/components/map/MapSelectTreesModal";
import ZoomControls from "@/components/map/ZoomControls";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import useStore from "@/store/store";
import useMapStore from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Marker } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { z } from "zod";
// @ts-ignore because this image needs to be imported, but not found for some reason, but works.
import defaultIconPng from 'leaflet/dist/images/marker-icon.png'
import { Icon } from "leaflet";

const defaultIcon = new Icon({
  iconUrl: defaultIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

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

function MapView() {
  const showSelectModal = useStore((state) => state.map.showSelectModal);
  const authorization = useAuthHeader();
  const navigate = useNavigate({ from: '/map' });

  const { data: treeRes } = useQuery({
    queryKey: ["trees"],
    queryFn: () => treeApi.getAllTrees({ authorization }),
  });

  const handleMarkerClick = (treeId: number) => {
    navigate({ to: `/trees/${treeId}` });
  };

  return (
    <div className="relative">
      <Map>
        {showSelectModal && <MapSelectTreesModal />}
        <ZoomControls />
        <MapConroller />

        {(treeRes?.data || []).map((tree) => (
          <Marker 
            icon={defaultIcon} 
            key={tree.id} 
            position={[tree.latitude, tree.longitude]} 
            eventHandlers={{
              click: () => handleMarkerClick(tree.id),
            }} />
        ))}
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
