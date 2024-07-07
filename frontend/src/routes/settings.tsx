import { SidePanelButton } from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div>
      <div className="h-[48px] flex items-center justify-between mx-2">
        <div className="flex items-center">
          <SidePanelButton />
          <h1 className="font-bold text-xl">Einstellungen</h1>
        </div>
      </div>

      <Separator />
    </div>
  );
}
