import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { PredictedHealth, treeApi } from "@/api/backendApi";
import { PlaceholderIcon } from "@/components/MapHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTree } from "@/context/TreeDataContext";
import useSidePanelStore from "@/store/sidePanelStore";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Battery,
  Blocks,
  CheckCheck,
  Clock,
  Droplet,
  Frown,
  Map,
  PanelLeftOpen,
  PanelRightOpen,
  Pencil,
  Sun,
  TrendingUp,
  Wrench,
} from "lucide-react";
import React from "react";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TreeOverviewDashboard from "@/components/dashboard/tree/overview";
import TreeSensorDashboard from "@/components/dashboard/tree/sensorView";

export const Route = createFileRoute("/dashboard/tree/$treeId")({
  component: TreeDashboard,
});

function TreeDashboard() {
  const { treeId } = Route.useParams();
  const tree = useTree(treeId);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["tree_prediction", treeId],
    queryFn: () =>
      treeApi.getTreePredictionById({ treeID: treeId, sensorData: true }),
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
            <Button>
              <span className="flex items-center gap-2">
                <Map className="w-5 h-5" />
                <span>In Karte anzeigen</span>
              </span>
            </Button>
          </div>
        </div>

        <Tabs className="py-2" defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Übersicht</TabsTrigger>
            <TabsTrigger value="waypoint">Einsatzplanung</TabsTrigger>
            <TabsTrigger value="info">Informationen</TabsTrigger>
            <TabsTrigger value="sensor">Sensor Daten</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <TreeOverviewDashboard
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
  const { isPanelOpen, toggleSidePanel } = useSidePanelStore((state) => {
    return {
      isPanelOpen: state.isOpen,
      toggleSidePanel: state.toggle,
    };
  });

  const handleToggleSidePanel = () => {
    toggleSidePanel();
  };

  return (
    <div>
      <div className="h-[48px] flex items-center justify-between mx-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleToggleSidePanel()}
          >
            {isPanelOpen ? (
              <PanelRightOpen className="w-5 h-5" />
            ) : (
              <PanelLeftOpen className="w-5 h-5" />
            )}
          </Button>
          <h1 className="font-bold text-xl">Dashboard</h1>
        </div>

        <div className="flex gap-2">
          <PlaceholderIcon />
          <PlaceholderIcon />
          <PlaceholderIcon />
        </div>
      </div>

      <Separator />

      <div className="min-h-[calc(h-full_-_48px)] p-4">{children}</div>
    </div>
  );
};
