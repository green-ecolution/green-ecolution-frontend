import { DragableMarker } from "@/components/map/MapMarker";
import MapSelectTreesModal from "@/components/map/MapSelectTreesModal";
import { WithAllTrees } from "@/components/map/TreeMarker";
import { TreeForm } from "@/schema/treeSchema";
import useFormStore, { FormStore } from "@/store/form/useFormStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LatLng } from "leaflet";
import { useCallback, useRef, useState } from "react";

export const Route = createFileRoute("/_protected/map/tree/edit")({
  component: EditTree,
});

function EditTree() {
  const navigate = useNavigate({ from: Route.fullPath });
  const modalRef = useRef<HTMLDivElement>(null);
  const { treeId } = Route.useSearch();
  const { commit, form, type } = useFormStore(
    (state: FormStore<TreeForm>) => ({
      form: state.form!!,
      commit: state.commit,
      type: state.type,
    }),
  );
  const [treeLatLng, setTreeLatLng] = useState<LatLng>(
    new LatLng(form.latitude, form.longitude),
  );

  const handleNavigateBack = useCallback(() => {
    switch (type) {
      case "new":
        return navigate({
          to: "/tree/new",
          search: {
            resetStore: false,
            lat: treeLatLng.lat,
            lng: treeLatLng.lng,
          },
        });
      case "edit":
        return navigate({
          to: `/tree/$treeId/edit`,
          params: { treeId: treeId?.toString() ?? "" },
          search: { resetStore: false },
        });
      default:
        return navigate({
          to: "/treecluster/new",
          search: { resetStore: false },
        });
    }
  }, [navigate, type, treeId]);

  const handleSave = () => {
    commit({ ...form, latitude: treeLatLng.lat, longitude: treeLatLng.lng });
    handleNavigateBack();
  };

  const handleCancel = () => {
    handleNavigateBack();
  };

  return (
    <>
      <WithAllTrees />
      <MapSelectTreesModal
        ref={modalRef}
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
