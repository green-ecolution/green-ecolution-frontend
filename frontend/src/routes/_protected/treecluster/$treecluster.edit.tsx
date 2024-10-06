import { clusterApi, TreeCluster, TreeClusterUpdate } from "@/api/backendApi";
import queryClient from "@/api/queryClient";
import FormForTreecluster from "@/components/general/form/FormForTreecluster";
import { useFormSync } from "@/hooks/form/useFormSync";
import { useInitFormQuery } from "@/hooks/form/useInitForm";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import { TreeclusterSchema } from "@/schema/treeclusterSchema";
import useFormStore, { FormStore } from "@/store/form/useFormStore";
import useStore from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";

const queryParams = (id: string, token: string) =>
  queryOptions<TreeCluster>({
    queryKey: ["treescluster", id],
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
    // useFormStore.getState().reset();
  },
});

function EditTreeCluster() {
  const authorization = useAuthHeader();
  const clusterId = Route.useParams().treecluster;
  const navigate = useNavigate({ from: Route.fullPath });
  const {initForm, loadedData } = useInitFormQuery<TreeCluster, TreeclusterSchema>(
    queryParams(clusterId, authorization),
    (data) => ({
      name: data.name,
      address: data.address,
      description: data.description,
      soilCondition: data.soilCondition,
      treeIds: data.trees.map((tree) => tree.id),
    }),
  );

  const formStore = useFormStore((state: FormStore<TreeclusterSchema>) => ({
    form: state.form,
    reset: state.reset,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormSync<TreeclusterSchema>(initForm, zodResolver(TreeclusterSchema));

  const { isError, mutate } = useMutation({
    mutationFn: (body: TreeClusterUpdate) =>
      clusterApi.updateTreeCluster({ authorization, clusterId, body }),
    onSuccess: (data) => onUpdateSuccess(data),
    onError: () => onUpdateError(),
  });

  const onUpdateSuccess = useCallback((data: TreeCluster) => {
    console.log("Treecluster updated", data);
    formStore.reset();
    console.log("reset", formStore.form);
    navigate({
      to: `/treecluster/${data.id}`,
      replace: true,
    });
  }, []);

  const onUpdateError = () => {
    console.error("Error updating treecluster");
  };

  const onSubmit: SubmitHandler<TreeclusterSchema> = async (data) => {
    mutate({
      ...data,
      description: formStore.form?.description ?? "",
      treeIds: formStore.form?.treeIds ?? [],
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
              Bewässerungsgruppe {loadedData?.name} bearbeiten
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
