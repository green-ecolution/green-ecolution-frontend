import { DragableMarker } from "@/components/map/MapMarker";
import MapSelectTreesModal from "@/components/map/MapSelectTreesModal";
import { WithAllTrees } from "@/components/map/TreeMarker";
import { NewTreeForm } from "@/schema/newTreeSchema";
import useFormStore, { FormStore } from "@/store/form/useFormStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LatLng } from "leaflet";
import { useRef, useState } from "react";

export const Route = createFileRoute("/_protected/map/tree/edit")({
  component: EditTree,
});

function EditTree() {
  const navigate = useNavigate({ from: Route.fullPath });
  const modalRef = useRef<HTMLDivElement>(null);
  const { commit, form } = useFormStore(
    (state: FormStore<NewTreeForm>) => ({
      form: state.form!!,
      commit: state.commit,
    }),
  );
  const [treeLatLng, setTreeLatLng] = useState<LatLng>(
    new LatLng(form.latitude, form.longitude),
  );

  const handleSave = () => {
    commit({...form, latitude: treeLatLng.lat, longitude: treeLatLng.lng});
    navigate({
      to: "/tree/new",
      search: {
        lat: treeLatLng!!.lat,
        lng: treeLatLng!!.lng,
        resetStore: false,
      },
    });
  };

  const handleCancel = () => {
    navigate({
      to: "/tree/new",
      search: {
        lat: treeLatLng!!.lat,
        lng: treeLatLng!!.lng,
        resetStore: false,
      },
    });
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
