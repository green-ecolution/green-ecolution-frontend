export interface TreeDashboardProps {
  treeId: string;
}

const TreeDashboard = ({ treeId }: TreeDashboardProps) => {
  return (
    <>
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
    </div >

      {/*  Tree Dashboard Cards */ }
      < div className = "py-5 grid gap-2 md:grid-cols-4 grid-cols-2" >
          <TreeDashboardInfoCard
            title="Empfehlung"
            icon={<Activity className="size-5" />}
            contentValue={
              <div className="h-[40px] flex items-center gap-2">
                {treeActionRecommendation.icon}
                {treeActionRecommendation.health}
              </div>
            }
            contentDescription={treeActionRecommendation.content}
          />

          <TreeDashboardInfoCard
            title="Feuchtigkeit"
            icon={<Droplet className="size-5" />}
            contentValue={`${lastSensorData?.data.humidity}%`}
            contentDescription={
              lastSensorData?.humidityDiff === 0
                ? "Keine Veränderung zur letzten Messung"
                : lastSensorData?.humidityDiff > 0
                  ? `+${lastSensorData?.humidityDiff}% zu der letzten Messung`
                  : `-${lastSensorData?.humidityDiff}% zu der letzten Messung`
            }
          />

          <TreeDashboardInfoCard
            title="Batterie"
            icon={<Battery className="size-5" />}
            contentValue={`${lastSensorData?.data.battery} Volt`}
            contentDescription={
              lastSensorData?.batteryDiff === 0
                ? "Keine Veränderung zur letzten Messung"
                : lastSensorData?.batteryDiff > 0
                  ? `+${lastSensorData?.batteryDiff} Volt zu der letzten Messung`
                  : `-${lastSensorData?.batteryDiff} Volt zu der letzten Messung`
            }
          />

          <TreeDashboardInfoCard
            title="Wetter"
            icon={<Sun className="size-5" />}
            contentValue={"Sonnig"}
            contentDescription={"In den nächsten Tagen soll es nicht regnen"}
          />
        </div >

  {/*  Tree Dashboard Diagram */ }
  < div className = "grid grid-cols-1 gap-4 md:grid-cols-2" >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-row pb-1">
                <CardTitle>Verlauf</CardTitle>
                <TrendingUp className="size-5" />
              </div>
              <CardDescription>
                Verlauf der Feuchtigkeit und Batterie des Baumsensors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TreeDashboardChart sensorData={sensorData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-row pb-1">
                <CardTitle>Historie</CardTitle>
                <Clock className="size-5" />
              </div>
              <CardDescription>
                Historie der Pflege und Wartung des Baumes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TreeDashboardRouteHistory data={historyTreeRoutes} />
            </CardContent>
          </Card>
        </div >
    </>
  )
}

type HistoryTreeRoute = {
  routeId: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const historyTreeRoutes: HistoryTreeRoute[] = [
  {
    routeId: "1",
    title: "Diese Baumgruppe wurde gepflegt",
    description: "vor 2 Wochen",
    icon: <Sun className="size-5" />,
  },
  {
    routeId: "2",
    title: "Diese Baumgruppe wurde bewässert",
    description: "vor 3 Wochen",
    icon: <Droplet className="size-5" />,
  },
  {
    routeId: "3",
    title: "Der Sensor wurde ausgetauscht",
    description: "vor 4 Wochen",
    icon: <Wrench className="size-5" />,
  },
  {
    routeId: "4",
    title: "Diese Baumgruppe wurde als ungesund markiert",
    description: "vor 5 Wochen",
    icon: <Frown className="size-5" />,
  },
];

interface TreeDashboardRouteHistoryProps {
  data: HistoryTreeRoute[];
}

const TreeDashboardRouteHistory = ({
  data,
}: TreeDashboardRouteHistoryProps) => {
  return (
    <div className="grid grid-flow-row gap-4">
      {data.map((route) => (
        <div
          key={route.routeId}
          className="flex items-center gap-4 p-4 border rounded justify-between"
        >
          <div className="flex gap-4 items-center">
            <div>{route.icon}</div>
            <div>
              <h1 className="font-bold">{route.title}</h1>
              <p className="text-muted-foreground">{route.description}</p>
            </div>
          </div>

          <div>
            <Button variant="ghost" size="icon">
              <CheckCheck className="size-5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

type TreeDashboardChartProps = {
  sensorData: {
    timestamp: Date;
    humidity: number;
    battery: number;
  }[];
};

const TreeDashboardChart = ({ sensorData }: TreeDashboardChartProps) => {
  const chartConfig = {
    humidity: {
      label: "Feuchtigkeit",
      color: "#2563eb",
      icon: Droplet,
    },
    battery: {
      label: "Batterie",
      color: "#60a5fa",
      icon: Battery,
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px]">
      <AreaChart accessibilityLayer data={sensorData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="timestamp" />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />

        <Area
          type="natural"
          dataKey="humidity"
          fill="var(--color-humidity)"
          fillOpacity={0.4}
          stroke="var(--color-humidity)"
          stackId="a"
        />

        <Area
          type="natural"
          dataKey="battery"
          fill="var(--color-battery)"
          fillOpacity={0.4}
          stroke="var(--color-battery)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

const TreePredictionIcon = ({ health }: { health: PredictedHealth }) => {
  if (health === "good") {
    return <div className="bg-green-500 size-6 rounded-full"></div>;
  } else if (health === "moderate") {
    return <div className="bg-yellow-500 size-6 rounded-full"></div>;
  } else {
    return <div className="bg-red-500 size-6 rounded-full"></div>;
  }
};

export interface TreeDashboardInfoCardProps {
  title: string;
  icon: React.ReactNode;
  contentValue: string | React.ReactNode;
  contentDescription: string | React.ReactNode;
}

const TreeDashboardInfoCard = (props: TreeDashboardInfoCardProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between flex-row pb-1">
        <CardTitle className="text-sm">{props.title}</CardTitle>
        <CardDescription>{props.icon}</CardDescription>
      </CardHeader>

      <CardContent>
        <h1 className="text-4xl font-bold">{props.contentValue}</h1>
        <p className="pt-2 text-sm text-muted-foreground">
          {props.contentDescription}
        </p>
      </CardContent>
    </Card>
  );
};

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
