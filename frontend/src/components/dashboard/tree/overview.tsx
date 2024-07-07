import { addDays, format } from "date-fns";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { PredictedHealth, SensorPrediction, Tree } from "@/api/backendApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Battery,
  CalendarIcon,
  CheckCheck,
  Clock,
  Droplet,
  Frown,
  Info,
  Smile,
  Sun,
  TreePine,
  TrendingUp,
  Wrench,
} from "lucide-react";
import React from "react";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

export type SensorData = {
  timestamp: Date;
  battery: number;
  humidity: number;
  trunkHumidity: number;
};

export interface TreeOverviewDashboardProps {
  tree: Tree;
  sensorData: SensorData[];
  sensorPrediction: SensorPrediction;
}

const TreeOverviewDashboard = ({
  sensorData,
  sensorPrediction,
  tree,
}: TreeOverviewDashboardProps) => {
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

  const treeActionRecommendation = useMemo(() => {
    if (sensorPrediction.health === "good") {
      return {
        health: "In Ordnung",
        content:
          "Die Baumgruppe benötigt keine Pflege und ist in einem guten Zustand",
        icon: <TreePredictionIcon health="good" />,
      };
    } else if (sensorPrediction.health === "moderate") {
      return {
        health: "Mäßig",
        content: "Die Baumgruppe benötigt bald Wasser und Pflege",
        icon: <TreePredictionIcon health="moderate" />,
      };
    } else {
      return {
        health: "Schlecht",
        content: "Die Baumgruppe benötigt dringend Wasser und Pflege",
        icon: <TreePredictionIcon health="bad" />,
      };
    }
  }, [sensorPrediction]);

  return (
    <>
      {/*  Tree Dashboard Cards */}
      <div className="grid gap-4 md:grid-cols-5 grid-cols-2">
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
          title="Bodenfeuchtigkeit"
          icon={<Droplet className="size-5" />}
          contentValue={`${lastSensorData?.data.humidity}%`}
          contentDescription={
            lastSensorData?.humidityDiff === 0
              ? "Keine Veränderung zur letzten Messung"
              : lastSensorData?.humidityDiff > 0
                ? `+${lastSensorData?.humidityDiff}% zu der letzten Messung`
                : `${lastSensorData?.humidityDiff}% zu der letzten Messung`
          }
        />

        <TreeDashboardInfoCard
          title="Stammfeuchtigkeit"
          icon={<TreePine className="size-5" />}
          contentValue={`${lastSensorData?.data.trunkHumidity} kΩ`}
          contentDescription={"+0.5 kΩ zu der letzten Messung"}
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
                : `${lastSensorData?.batteryDiff} Volt zu der letzten Messung`
          }
        />

        <TreeDashboardInfoCard
          title="Standjahre"
          icon={<Info className="size-5" />}
          contentValue={`~${tree.age} Jahre`}
          contentDescription={
            <>
              Die Baumgruppe ist ca. {tree.age} Jahre alt <br />
              <span className="text-muted-foreground">
                {" "}
                (gepflanzt am {format(addDays(new Date(), -(2 * 365)), "LLL dd, y")})
              </span>
            </>
          }
        />
      </div>

      {/*  Tree Dashboard Diagram */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pt-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-row pb-1">
              <CardTitle>Verlauf</CardTitle>
              <TrendingUp className="size-5 text-muted-foreground" />
            </div>
            <CardDescription>
              <div className="flex items-center justify-between">
                <span>
                  Verlauf der Feuchtigkeit und Batterie des Baumsensors
                </span>
                <DatePickerWithRange />
              </div>
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
              <Clock className="size-5 text-muted-foreground" />
            </div>
            <CardDescription>
              Historie der Pflege und Wartung des Baumes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TreeDashboardRouteHistory data={historyTreeRoutes} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export const TreePredictionIcon = ({ health }: { health: PredictedHealth }) => {
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
    description: "vor 2 Tagen",
    icon: <Sun className="size-5" />,
  },
  {
    routeId: "2",
    title: "Diese Baumgruppe wurde als gesund markiert",
    description: "vor 2 Wochen",
    icon: <Smile className="size-5" />,
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
      label: "Bodenfeuchtigkeit",
      color: "#659858",
      icon: Droplet,
    },
    battery: {
      label: "Batterie",
      color: "#ACB63B",
      icon: Battery,
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart accessibilityLayer data={sensorData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="timestamp"
          tickMargin={8}
          tickCount={10}
          tickFormatter={(value) => format(new Date(value), "HH:mm")}
        />
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

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 7, 5),
    to: new Date(2024, 7, 7),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default TreeOverviewDashboard;
