import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MqttPayload } from "@green-ecolution/backend-client";
import { Cpu } from "lucide-react";
import ReactJson from 'react-json-view'

export interface TreeSensorDashboardProps {
  rawSensorData: MqttPayload[];
}

const TreeSensorDashboard = ({ rawSensorData }: TreeSensorDashboardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-row pb-1">
          <CardTitle>Sensor Daten</CardTitle>
          <Cpu className="size-5" />
        </div>
        <CardDescription>
          Auflistung der unausgewerteten Sensor Daten
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-2 rounded">
          <ScrollArea className="h-96">
            <ReactJson src={rawSensorData} collapsed name="mqtt_payload" />
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};


export default TreeSensorDashboard;
