import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { clusterApi, TreeClusterCreate } from "@/api/backendApi";
import { SubmitHandler } from "react-hook-form";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import useStore from "@/store/store";
import { TreeclusterForm } from "@/schema/treeclusterSchema";
import { useTreeClusterForm } from "@/hooks/useTreeclusterForm";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import FormForTreecluster from "@/components/general/form/FormForTreecluster";

export const Route = createFileRoute("/_protected/treecluster/new")({
  component: NewTreecluster,
});

function NewTreecluster() {
  const authorization = useAuthHeader();
  const navigate = useNavigate({ from: Route.fullPath });
  const formStore = useStore((state) => state.form.treecluster);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useTreeClusterForm(formStore);

  const { isError, mutate } = useMutation({
    mutationFn: (cluster: TreeClusterCreate) =>
      clusterApi.createTreeCluster({
        authorization,
        body: cluster,
      }),
    onSuccess: (data) => {
      toast({
        title: "Bewässerungsgruppe erstellt",
        description: "Die Bewässerungsgruppe wurde erfolgreich erstellt.",
      }); // TODO: Replace with our own toast
      formStore.reset();
      navigate({
        to: `/treecluster/${data.id}`,
        replace: true,
      });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Es ist ein Fehler aufgetreten.",
      }); // TODO: Replace with our own toast
    },
  });

  const onSubmit: SubmitHandler<TreeclusterForm> = async (data) => {
    mutate({
      ...data,
      treeIds: formStore.treeIds,
    });
  };

  const handleDeleteTree = (treeIdToDelete: number) => {
    formStore.removeTree(treeIdToDelete);
  };

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Neue Bewässerungsgruppe erstellen
        </h1>
        <p className="mb-5">
          Labore est cillum aliqua do consectetur. Do anim officia sunt magna
          nisi eiusmod sit excepteur qui aliqua duis irure in cillum cillum.
        </p>
      </article>

      <section className="mt-10">
        <FormForTreecluster
          register={register}
          handleDeleteTree={handleDeleteTree}
          handleSubmit={handleSubmit}
          displayError={isError}
          errors={errors}
          onSubmit={onSubmit}
        />
      </section>
    </div>
  );
}

export default NewTreecluster;
