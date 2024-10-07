import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  clusterApi,
  EntitiesTreeSoilCondition,
  TreeClusterCreate,
} from "@/api/backendApi";
import { SubmitHandler } from "react-hook-form";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import { TreeclusterSchema } from "@/schema/treeclusterSchema";
import { useMutation } from "@tanstack/react-query";
import FormForTreecluster from "@/components/general/form/FormForTreecluster";
import useFormStore, { FormStore } from "@/store/form/useFormStore";
import { useFormSync } from "@/hooks/form/useFormSync";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInitForm } from "@/hooks/form/useInitForm";
import useStore from "@/store/store";

export const Route = createFileRoute("/_protected/treecluster/_formular/new")({
  beforeLoad: () => {
    useFormStore.getState().setType("new");
  },
  component: NewTreecluster,
});

function NewTreecluster() {
  const authorization = useAuthHeader();
  const navigate = useNavigate({ from: Route.fullPath });
  const { initForm } = useInitForm<TreeclusterSchema>({
    name: "",
    address: "",
    description: "",
    soilCondition: EntitiesTreeSoilCondition.TreeSoilConditionUnknown,
    treeIds: [],
  });
  const formStore = useFormStore((state: FormStore<TreeclusterSchema>) => ({
    form: state.form,
    reset: state.reset,
  }));

  const mapPosition = useStore((state) => ({
    lat: state.map.center[0],
    lng: state.map.center[1],
    zoom: state.map.zoom,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormSync<TreeclusterSchema>(initForm, zodResolver(TreeclusterSchema));

  const { isError, mutate } = useMutation({
    mutationFn: (cluster: TreeClusterCreate) =>
      clusterApi.createTreeCluster({
        authorization,
        body: cluster,
      }),
    onSuccess: (data) => {
      formStore.reset();
      navigate({
        to: `/treecluster/${data.id}`,
        search: { resetStore: false },
        replace: true,
      });
    },
    onError: () => {
      console.error("Error creating treecluster");
    },
  });

  const onSubmit: SubmitHandler<TreeclusterSchema> = async (data) => {
    mutate({
      ...data,
      treeIds: formStore.form?.treeIds ?? [],
    });
  };

  const navigateToTreeSelect = () => {
    navigate({
      to: "/map/treecluster/select/tree",
      search: {
        lat: mapPosition.lat,
        lng: mapPosition.lng,
        zoom: mapPosition.zoom,
      },
    });
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
          handleSubmit={handleSubmit}
          displayError={isError}
          errors={errors}
          onSubmit={onSubmit}
          onAddTrees={navigateToTreeSelect}
        />
      </section>
    </div>
  );
}

export default NewTreecluster;