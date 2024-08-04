import { treeApi } from "@/api/backendApi";
import Map from "@/components/Map";
import MapHeader from "@/components/MapHeader";
import MapMarker, { TreeIcon } from "@/components/MapMarker";
import MapTooltip from "@/components/MapTooltip";
import { useTrees } from "@/context/TreeDataContext";
import { cn } from "@/lib/utils";
import useMapStore from "@/store/map/store";
import { Tree } from "@green-ecolution/backend-client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Activity, Battery, Droplet, TreePine } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useMapEvents } from "react-leaflet/hooks";
import { toast } from "sonner";
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

export const Route = createFileRoute("/map/")({
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
  const { tooltipOpen, tooltipContent, closeTooltip } =
    useMapStore((state) => ({
      tooltipContent: state.tooltip.content,
      tooltipOpen: state.tooltip.isOpen,
      closeTooltip: state.tooltip.close,
    }));

  const trees = useTrees();
  const tooltipTitle = "Baumgruppe 110";
  const tooltipDescription = "Zuletzt gegossen: vor 2 Tagen";

  return (
    <div className="relative">
      <MapHeader />
      <MapTooltip
        open={tooltipOpen}
        onClose={() => closeTooltip()}
        title={tooltipTitle}
        description={tooltipDescription}
      >
        <MapTooltipContent tree={tooltipContent} />
      </MapTooltip>
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
  const { openTooltip } = useMapStore((state) => ({
    openTooltip: state.tooltip.open,
  }));
  const treeMarkers = useMemo(
    () =>
      trees.map((tree) => (
        <MapMarker
          key={tree.id}
          position={[tree.location.latitude, tree.location.longitude]}
          icon={TreeIcon("green")}
          onClick={() => {
            openTooltip(tree);
          }}
        />
      )),
    [trees],
  );

  return <>{treeMarkers}</>;
};

const MapTooltipContent = ({ tree }: { tree: Tree }) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["tree_prediction", tree.id],
    refetchInterval: 10000,
    queryFn: () =>
      treeApi.getTreePredictionById({ treeID: tree.id, sensorData: true }),
  });

  useEffect(() => {
    if (data === undefined && isError) {
      console.error("Error while fetching trees", error);
      toast.error(
        "Es ist ein Fehler beim Abrufen der Sensor Daten zum Baum: " + tree.id,
        {
          description: error.message,
        },
      );
    }
  }, [isError, error]);

  const sensorData = useMemo(() => {
    return (
      data?.sensorData?.map((d) => ({
        humidity: d.uplinkMessage.decodedPayload.humidity,
        battery: d.uplinkMessage.decodedPayload.battery,
        trunkHumidity: 113,
        timestamp: new Date(d.uplinkMessage.receivedAt),
      })) ?? []
    );
  }, [data]);

  const treeActionRecommendation = useMemo(() => {
    if (data?.sensorPrediction.health === "good") {
      return {
        health: "In Ordnung",
        content:
          "Die Baumgruppe benötigt keine Pflege und ist in einem guten Zustand",
        icon: (
          <div
            className={cn("bg-green-500 size-3 rounded-full", "bg-green-500")}
          ></div>
        ),
      };
    } else if (data?.sensorPrediction.health === "moderate") {
      return {
        health: "Mäßig",
        content: "Die Baumgruppe benötigt bald Wasser und Pflege",
        icon: (
          <div
            className={cn("bg-green-500 size-3 rounded-full", "bg-yellow-500")}
          ></div>
        ),
      };
    } else {
      return {
        health: "Schlecht",
        content: "Die Baumgruppe benötigt dringend Wasser und Pflege",
        icon: (
          <div
            className={cn("bg-green-500 size-3 rounded-full", "bg-red-500")}
          ></div>
        ),
      };
    }
  }, [data?.sensorPrediction]);

  const lastSensorData = useMemo(
    () => ({
      data: sensorData[sensorData.length - 1],
      humidityDiff:
        sensorData[sensorData.length - 1]?.humidity -
          sensorData[sensorData.length - 2]?.humidity || 0,
      batteryDiff:
        sensorData[sensorData.length - 1]?.battery -
          sensorData[sensorData.length - 2]?.battery || 0,
    }),
    [sensorData],
  );

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-1">
          <Activity className="size-5 text-muted-foreground" />
          <span className="text-muted-foreground">Handlungsempfehlung</span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          {treeActionRecommendation.icon}
          {treeActionRecommendation.health}
        </div>
      </div>

      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-1">
          <Droplet className="size-5 text-muted-foreground" />
          <span className="text-muted-foreground">Bodenfeuchtigkeit</span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          {lastSensorData.data.humidity}%
        </div>
      </div>

      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-1">
          <TreePine className="size-5 text-muted-foreground" />
          <span className="text-muted-foreground">Stammfeuchte</span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          {lastSensorData.data.trunkHumidity} kΩ
        </div>
      </div>

      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-1">
          <Battery className="size-5 text-muted-foreground" />
          <span className="text-muted-foreground">Batterie</span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          {lastSensorData.data.battery} Volt
        </div>
      </div>
    </div>
  );
};
