import { createFileRoute } from "@tanstack/react-router";
import MapButtons from "@/components/map/MapButtons";
import { WithAllTrees } from "@/components/map/TreeMarker";

export const Route = createFileRoute("/_protected/map/")({
  component: MapView,
});

function MapView() {

  return (
    <>
      <MapButtons />
      <WithAllTrees />
    </>
  );
}
