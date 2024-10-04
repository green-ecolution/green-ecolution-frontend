import { clusterApi, TreeCluster, TreeClusterUpdate } from "@/api/backendApi";
import queryClient from "@/api/queryClient";
import FormForTreecluster from "@/components/general/form/FormForTreecluster";
import { useToast } from "@/hooks/use-toast";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import { useTreeClusterForm } from "@/hooks/useTreeclusterForm";
import { TreeclusterForm } from "@/schema/treeclusterSchema";
import useStore from "@/store/store";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

const queryParams = (id: string, token: string) => ({
  queryKey: ["treecluster", id],
  queryFn: () =>
    clusterApi.getTreeClusterById({
      authorization: token,
      clusterId: id,
    }),
});

export const Route = createFileRoute(
  "/_protected/treecluster/$treecluster/edit",
)({
  component: EditTreeCluster,
  loader: ({ params: { treecluster } }) => {
    const token = useStore.getState().auth.token?.accessToken ?? "";
    return queryClient.ensureQueryData(
      queryParams(treecluster, `Bearer ${token}`),
    );
  },
  onLeave: () => {
    useStore.getState().form.treecluster.reset();
  },
});

function EditTreeCluster() {
  const authorization = useAuthHeader();
  const clusterId = Route.useParams().treecluster;
  const navigate = useNavigate({ from: Route.fullPath });
  const formStore = useStore((state) => state.form.treecluster);
  const { toast } = useToast();
  const { data } = useSuspenseQuery(queryParams(clusterId, authorization));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useTreeClusterForm({
    name: data.name,
    address: data.address,
    description: data.description,
    soilCondition: data.soilCondition,
    treeIds: data.trees.map((tree) => tree.id),
  });

  const { isError, mutate } = useMutation({
    mutationFn: (body: TreeClusterUpdate) =>
      clusterApi.updateTreeCluster({ authorization, clusterId, body }),
    onSuccess: (data) => onUpdateSuccess(data),
    onError: () => onUpdateError(),
  });

  const onUpdateSuccess = (data: TreeCluster) => {
    toast({
      title: "Bewässerungsgruppe aktualisiert",
      description: "Die Bewässerungsgruppe wurde erfolgreich aktualisiert.",
    });
    formStore.reset();
    navigate({
      to: `/treecluster/${data.id}`,
      replace: true,
    });
  };

  const onUpdateError = () => {
    toast({
      title: "Fehler",
      description: "Es ist ein Fehler aufgetreten.",
    });
  };

  const onSubmit: SubmitHandler<TreeclusterForm> = async (data) => {
    mutate({
      ...data,
      treeIds: formStore.treeIds,
    });
  };

  return (
    <div className="container mt-6">
      {isError ? (
        <p className="text-red text-lg">
          Eine Bewässerungsgruppe mit der Nummer {clusterId} gibt es nicht oder
          die Daten zur Bewässerungsgruppe konnten nicht geladen werden.
        </p>
      ) : (
        <div>
          <article className="2xl:w-4/5">
            <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
              Bewässerungsgruppe {data.name} bearbeiten
            </h1>
            <p className="mb-5">
              Labore est cillum aliqua do consectetur. Do anim officia sunt
              magna nisi eiusmod sit excepteur qui aliqua duis irure in cillum
              cillum.
            </p>
          </article>

          <section className="mt-10">
            <FormForTreecluster
              register={register}
              handleSubmit={handleSubmit}
              displayError={isError}
              errors={errors}
              onSubmit={onSubmit}
            />
          </section>
        </div>
      )}
    </div>
  );
}
