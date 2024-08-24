import { treeApi } from "@/api/backendApi";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTree } from "@/context/TreeDataContext";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  Blocks,
  Map,
  MoreVertical,
  Pencil,
  Settings,
} from "lucide-react";
import React from "react";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TreeOverviewDashboard from "@/components/dashboard/tree/overview";
import TreeSensorDashboard from "@/components/dashboard/tree/sensorView";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import useAuthStore from "@/store/auth/authStore";

export const Route = createFileRoute("/dashboard/tree/$treeId")({
  component: TreeDashboard,
});

function TreeDashboard() {
  const { treeId } = Route.useParams();
  const tree = useTree(treeId);
  const {apiHeader} = useAuthStore(state => ({apiHeader: state.apiHeader}));

  const { data, isError, error, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ["tree_prediction", treeId],
    refetchInterval: 10000,
    queryFn: () =>
      treeApi.getTreePredictionById({ treeID: treeId, sensorData: true, authorization: apiHeader}),
  });

  useEffect(() => {
    if (data === undefined && isError) {
      console.error("Error while fetching trees", error);
      toast.error(
        "Es ist ein Fehler beim Abrufen der Sensor Daten zum Baum: " + treeId,
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
    <div>
      <TreeDashboardLayout>
        {/*  Tree Dashboard title and actions */}
        <div className="flex justify-between items-start min-w-full">
          <div>
            <h1 className="font-bold text-3xl">Baum Cluster {tree?.treeNum}</h1>
            <p className="text-muted-foreground">
              {tree?.location.address} ({tree?.location.additionalInfo})
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <Button variant="ghost" size="icon">
              <Pencil className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Blocks className="w-5 h-5" />
            </Button>
            <Link to={`/`}>
              <Button>
                <span className="flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  <span>In Karte anzeigen</span>
                </span>
              </Button>
            </Link>
          </div>
        </div>

        <Tabs className="py-2" defaultValue="overview">
          <div className="flex justify-between items-center w-full">
            <TabsList>
              <TabsTrigger value="overview">Übersicht</TabsTrigger>
              <TabsTrigger disabled value="waypoint">
                Einsatzplanung
              </TabsTrigger>
              <TabsTrigger disabled value="info">
                Informationen
              </TabsTrigger>
              <TabsTrigger value="sensor">Sensor Daten</TabsTrigger>
            </TabsList>

            <div className="flex flex-col">
              <span className="text-muted-foreground">
                Letzter Abfrage:{" "}
                {format(
                  dataUpdatedAt,
                  "dd.MM.yyyy HH:mm:ss",
                )}
              </span>
              <span className="text-muted-foreground">
                Letzter Sensor Update:{" "}
                {format(
                  lastSensorData.data.timestamp,
                  "dd.MM.yyyy HH:mm:ss",
                )}
              </span>
            </div>
          </div>
          <TabsContent value="overview">
            <TreeOverviewDashboard
              tree={tree!!}
              sensorPrediction={data.sensorPrediction}
              sensorData={sensorData}
            />
          </TabsContent>
          <TabsContent value="sensor">
            <TreeSensorDashboard rawSensorData={data.sensorData || []} />
          </TabsContent>
        </Tabs>
      </TreeDashboardLayout>
    </div>
  );
}

export interface TreeDashboardLayoutProps extends React.PropsWithChildren { }

// TODO: as layout component in tanstack router
const TreeDashboardLayout = ({ children }: TreeDashboardLayoutProps) => {
  return (
    <div>
      <div className="h-[48px] flex items-center justify-between mx-2">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-xl">Dashboard</h1>
        </div>

        <div className="flex gap-2 items-center">
          <Button variant="ghost" size="icon">
            <Bell className="size-5" />
          </Button>
          <button>
            <Avatar>
              <AvatarFallback>CH</AvatarFallback>
            </Avatar>
          </button>
          <Button variant="ghost" size="icon">
            <Settings className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="size-5" />
          </Button>
        </div>
      </div>

      <Separator />

      <div className="min-h-[calc(h-full_-_48px)] p-4">{children}</div>
    </div>
  );
};
