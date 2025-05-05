import { DragableMarker } from "@/components/map/MapMarker";
import MapSelectEntitiesModal from "@/components/map/MapSelectEntitiesModal";
import { TreeForm } from "@/schema/treeSchema";
import useFormStore, { FormStore } from "@/store/form/useFormStore";
import { useMapStore } from "@/store/store";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LatLng } from "leaflet";
import { useCallback, useState } from "react";

export const Route = createFileRoute("/_protected/map/tree/edit/")({
  component: EditTree,
});

function EditTree() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { treeId } = Route.useSearch();
  const { commit, form, type } = useFormStore((state: FormStore<TreeForm>) => ({
    form: state.form!,
    commit: state.commit,
    type: state.type,
  }));
  const { zoom } = useMapStore();
  const [treeLatLng, setTreeLatLng] = useState<LatLng>(
    new LatLng(form.latitude, form.longitude),
  );

  const handleNavigateBack = useCallback(() => {
    switch (type) {
      case "new":
        return navigate({
          to: "/trees/new",
          search: {
            resetStore: false,
            lat: treeLatLng.lat,
            lng: treeLatLng.lng,
          },
        });
      case "edit":
        return navigate({
          to: `/trees/$treeId/edit`,
          params: { treeId: treeId?.toString() ?? "" },
          search: { resetStore: false },
        });
      default:
        return navigate({
          to: "/map",
          search: { lat: treeLatLng.lat, lng: treeLatLng.lng, zoom },
        });
    }
  }, [type, navigate, treeLatLng.lat, treeLatLng.lng, treeId, zoom]);

  const handleSave = () => {
    commit({ ...form, latitude: treeLatLng.lat, longitude: treeLatLng.lng });
    handleNavigateBack().catch((error) => console.error('Navigation failed:', error));
  };

  return (
    <>
      <MapSelectEntitiesModal
        onSave={handleSave}
        onCancel={() => void handleNavigateBack()}
        title="Baum erfassen:"
        content={
          <ul className="space-y-3">
            <li className="text-dark-600">
              {treeLatLng ? (
                <>
                  <p>Neuer Baum an folgendem Standort:</p>
                  {treeLatLng.lat}, {treeLatLng.lng}
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
