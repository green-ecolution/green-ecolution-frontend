import MapSelectTreesModal from "@/components/map/MapSelectTreesModal";
import { useMapMouseSelect } from "@/hooks/useMapMouseSelect";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_protected/map/tree/new")({
  component: NewTree,
});

function NewTree() {
  const navigate = useNavigate({ from: Route.fullPath });
  const mousePosition = useMapMouseSelect();


  useEffect(() => {
    if (mousePosition.lat !== 0 && mousePosition.lng !== 0) {
      console.log(mousePosition);
    }
  }, [mousePosition]);

  const handleSave = () => {};
  const handleCancel = () => {
    navigate({ to: "/map", search: (prev) => prev });
  };

  return (
    <>
      <MapSelectTreesModal onSave={handleSave} onCancel={handleCancel} />
    </>
  );
}


