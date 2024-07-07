import { createFileRoute } from "@tanstack/react-router";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import { Separator } from "../components/ui/separator";
import { SidePanelButton } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight, Plus } from "lucide-react";

export const Route = createFileRoute("/calendar")({
  component: DemoApp,
});

const events = [
  {
    title: "Einsatzplanung 1",
    start: "2024-07-08",
    backgroundColor: "#4C7741",
    borderColor: "#4C7741",
  },
  {
    title: "Einsatzplanung 2",
    start: "2024-07-11",
    backgroundColor: "#4C7741",
    borderColor: "#4C7741",
  },
  {
    title: "Einsatzplanung 3",
    start: "2024-07-19",
    backgroundColor: "#4C7741",
    borderColor: "#4C7741",
  },
];

function DemoApp() {
  return (
    <div>
      <div className="h-[48px] flex items-center justify-between mx-2">
        <div className="flex items-center gap-1">
          <SidePanelButton />
          <h1 className="font-bold text-xl">Kalendar</h1>
        </div>

        <div>
          <Button variant="ghost" size="icon">
            <Plus className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ChevronsLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ChevronsRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <Separator />
      <div className="mx-4 h-[calc(100vh_-_48px-1rem)] p-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={events}
          eventContent={renderEventContent}
        />
      </div>
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo: {
  timeText:
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | Iterable<ReactNode>
  | ReactPortal
  | null
  | undefined;
  event: {
    title:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
  };
}) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
