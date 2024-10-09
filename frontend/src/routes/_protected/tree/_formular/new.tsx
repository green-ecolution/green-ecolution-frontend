import { treeApi, TreeCreate } from "@/api/backendApi";
import FormForTree from "@/components/general/form/FormForTree";
import { useFormSync } from "@/hooks/form/useFormSync";
import { useInitForm } from "@/hooks/form/useInitForm";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import { NewTreeForm, NewTreeSchema } from "@/schema/newTreeSchema";
import useFormStore, { FormStore } from "@/store/form/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { sensorQuery, treeClusterQuery } from "../_formular";

const newTreeSearchSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const Route = createFileRoute("/_protected/tree/_formular/new")({
  component: NewTree,
  validateSearch: newTreeSearchSchema,
  loaderDeps: ({ search: { lat, lng } }) => {
    const storeNotInit = useFormStore.getState().isEmpty();
    return {
      lat: storeNotInit ? lat : useFormStore.getState().form.latitude,
      lng: storeNotInit ? lng : useFormStore.getState().form.longitude
    };
  },
});

function NewTree() {
  const { lat, lng } = Route.useLoaderDeps();
  const navigate = useNavigate({ from: Route.fullPath });
  const authorization = useAuthHeader();
  const { data: sensors } = useSuspenseQuery(sensorQuery(authorization));
  const { data: treeClusters } = useSuspenseQuery(
    treeClusterQuery(authorization),
  );

  const formStore = useFormStore((state: FormStore<NewTreeForm>) => ({
    form: state.form,
    reset: state.reset,
  }));

  const { initForm } = useInitForm<NewTreeForm>({
    latitude: lat,
    longitude: lng,
    treeNumber: "",
    species: "",
    plantingYear: new Date().getFullYear(),
    treeClusterId: -1,
    sensorId: -1,
    description: "",
  });

  const {
    register,
    handleSubmit,
    formState,
  } = useFormSync<NewTreeForm>(
    initForm,
    zodResolver(
      NewTreeSchema(lat, lng),
    ),
  );

  const { isError, mutate } = useMutation({
    mutationFn: (tree: TreeCreate) =>
      treeApi.createTree({
        authorization,
        body: tree,
      }),
    onSuccess: (data) => {
      formStore.reset();
      navigate({
        to: "/tree/$treeId",
        params: { treeId: data.id.toString() },
        search: { resetStore: false },
        replace: true,
      });
    },
  });

  const onSubmit = (data: NewTreeForm) => {
    mutate({
      ...data,
      sensorId: data.sensorId === -1 ? undefined : data.sensorId,
      treeClusterId: data.treeClusterId === -1 ? undefined : data.treeClusterId,
      readonly: false,
    });
  };

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Neuen Baum erfassen
        </h1>
        <p className="mb-5">
          Labore est cillum aliqua do consectetur. Do anim officia sunt magna
          nisi eiusmod sit excepteur qui aliqua duis irure in cillum cillum.
        </p>
      </article>

      <section className="mt-10">
        <FormForTree
          register={register}
          handleSubmit={handleSubmit}
          formState={formState}
          treeClusters={treeClusters.data}
          sensors={sensors.data}
          onSubmit={onSubmit}
          displayError={isError}
        />
      </section>
    </div>
  );
}
