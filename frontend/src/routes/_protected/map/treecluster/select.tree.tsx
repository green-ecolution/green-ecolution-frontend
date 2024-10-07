import MapSelectTreesModal from "@/components/map/MapSelectTreesModal";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Tree } from "@green-ecolution/backend-client";
import { WithAllTrees } from "@/components/map/TreeMarker";
import { useCallback, useState, useRef } from "react";
import SelectedCard from "@/components/general/cards/SelectedCard";
import useFormStore, { FormStore } from "@/store/form/useFormStore";
import { TreeclusterSchema } from "@/schema/treeclusterSchema";
import { useMapMouseSelect } from "@/hooks/useMapMouseSelect";
import { useMap } from "react-leaflet";

export const Route = createFileRoute("/_protected/map/treecluster/select/tree")(
  {
    component: SelectTrees,
  },
);

function SelectTrees() {
  const { form, storeTreeIds, set, type } = useFormStore(
    (state: FormStore<TreeclusterSchema>) => ({
      form: state.form,
      storeTreeIds: state.form?.treeIds ?? [1],
      set: state.commit,
      type: state.type,
    }),
  );
  const [treeIds, setTreeIds] = useState<number[]>(storeTreeIds);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate({ from: Route.fullPath });
  const modalRef = useRef<HTMLDivElement>(null);
  const map = useMap();
  const { clusterId } = Route.useSearch();

  const handleNavigateBack = useCallback(() => {
    switch (type) {
      case "new":
        return navigate({
          to: "/treecluster/new",
          search: { resetStore: false },
        });
      case "edit":
        return navigate({
          to: `/treecluster/$treecluster/edit`,
          params: { treecluster: clusterId?.toString() ?? "" },
          search: { resetStore: false },
        });
      default:
        return navigate({
          to: "/treecluster/new",
          search: { resetStore: false },
        });
    }
  }, [navigate, type, clusterId]);

  const handleSave = () => {
    if (treeIds.length === 0) {
      setShowError(true);
      return;
    }
    form &&
      set({
        ...form,
        treeIds,
      });

    handleNavigateBack();
  };

  const handleCancel = () => handleNavigateBack();

  const handleDeleteTree = (treeId: number) => {
    setTreeIds((prev) => prev.filter((id) => id !== treeId));
  };

  const handleTreeClick = (tree: Tree) => {
    setTreeIds((prev) => (!prev.includes(tree.id) ? [...prev, tree.id] : prev));
  };

  useMapMouseSelect((_, e) => {
    const target = e.originalEvent.target as HTMLElement;
    if (modalRef.current?.contains(target)) {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
    } else {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
    }
  });

  return (
    <>
      <MapSelectTreesModal
        ref={modalRef}
        onSave={handleSave}
        onCancel={handleCancel}
        treeIds={treeIds}
        title="Bäume auswählen:"
        content={
          <ul className="space-y-3">
            {(treeIds?.length || 0) === 0 || showError ? (
              <li className="text-red">
                <p>Bitte wählen Sie mindestens einen Baum aus.</p>
              </li>
            ) : (
              treeIds.map((treeId, key) => (
                <li key={key}>
                  <SelectedCard treeId={treeId} onClick={handleDeleteTree} />
                </li>
              ))
            )}
          </ul>
        }
      />
      <WithAllTrees onClick={handleTreeClick} />
    </>
  );
}
