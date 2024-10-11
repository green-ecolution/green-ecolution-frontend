import { MoveRight } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { clusterApi } from "@/api/backendApi";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import { useNavigate } from "@tanstack/react-router";
import Modal from "../general/Modal";

interface DeleteSectionProps {
  clusterId: number;
}

const DeleteSection: React.FC<DeleteSectionProps> = ({ clusterId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayError, setDisplayError] = useState<string | null>(null);
  const authorization = useAuthHeader();
  const navigate = useNavigate();

  const { mutate, isError } = useMutation({
    mutationFn: () =>
      clusterApi.deleteTreeCluster({
        authorization,
        clusterId: String(clusterId),
      }),
    onSuccess: () => {
      navigate({ to: "/treecluster", search: { showToast: "delete" } });
      setIsModalOpen(true);
    },
    onError: (error: any) => {
      setDisplayError(error?.message || "An unknown error occurred");
      console.error(error);
      setIsModalOpen(false);
    },
  });
  
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-10 group flex items-center gap-x-2 text-red font-medium text-base mb-4"
      >
        Bewässerungsgruppe löschen
        <MoveRight className="w-4 h-4 transition-all ease-in-out duration-300 group-hover:translate-x-1" />
      </button>

      {isError && (
        <p className="text-red mt-2 font-semibold text-sm">
          {displayError || "Es ist leider ein Fehler aufgetreten."}
        </p>
      )}

      <Modal
        title="Soll die Bewässerungsgruppe wirklich gelöscht werden?"
        description="Sobald eine Bewässerungsgruppe gelöscht wurde, können die Daten nicht wieder hergestellt werden."
        confirmText="Wirklich löschen"
        onConfirm={() => mutate()}
        onCancel={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      />
    </>
  );
};

export default DeleteSection;
