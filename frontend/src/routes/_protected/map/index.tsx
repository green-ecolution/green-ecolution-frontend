import { createFileRoute, useNavigate } from "@tanstack/react-router";
import MapButtons from "@/components/map/MapButtons";
import { WithAllTrees } from "@/components/map/TreeMarker";
import { Tree } from "@green-ecolution/backend-client";

export const Route = createFileRoute("/_protected/map/")({
  component: MapView,
});

function MapView() {
  const navigate = useNavigate({ from: '/map' });

  const handleMarkerClick = (tree: Tree) => {
    navigate({ to: `/tree/$treeId`, params: { treeId: tree.id.toString() } });
  };

  return (
    <>
      <MapButtons />
      <WithAllTrees onClick={handleMarkerClick}/>
    </>
  );
}
