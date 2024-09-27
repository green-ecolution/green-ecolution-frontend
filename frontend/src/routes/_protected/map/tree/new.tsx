import MapSelectTreesModal from "@/components/map/MapSelectTreesModal";
import { WithAllTrees } from "@/components/map/TreeMarker";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LatLng } from "leaflet";
import { useState } from "react";
import { useMapMouseSelect } from "@/hooks/useMapMouseSelect";
import { DragableMarker } from "@/components/map/MapMarker";

export const Route = createFileRoute("/_protected/map/tree/new")({
  component: NewTree,
});

function NewTree() {
  const [treeLatLng, setTreeLatLng] = useState<LatLng>();
  const navigate = useNavigate({ from: Route.fullPath });
  useMapMouseSelect((latlng) => {
    setTreeLatLng(latlng);
  });

  const handleSave = () => { };

  const handleCancel = () => {
    navigate({ to: "/map", search: (prev) => prev });
  };

  return (
    <>
      <WithAllTrees />
      <MapSelectTreesModal
        onSave={handleSave}
        onCancel={handleCancel}
        title="Baum erfassen:"
        content={
          <ul className="space-y-3">
            <li className="text-dark-600">
              {treeLatLng ? (
                <>
                  <p>Neuer Baum an folgendem Standort:</p>
                  {treeLatLng!!.lat}, {treeLatLng!!.lng}
                </>
              ) : (
                <p>Bitte wähle einen Standort für den neuen Baum.</p>
              )}
            </li>
          </ul>
        }
      />

      {treeLatLng && (
        <DragableMarker
          position={treeLatLng}
          onMove={(latlng) => setTreeLatLng(latlng)}
        />
      )}
    </>
  );
}
