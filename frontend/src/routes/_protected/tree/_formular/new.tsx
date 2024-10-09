import { clusterApi, sensorApi, treeApi, TreeCreate } from "@/api/backendApi";
import queryClient from "@/api/queryClient";
import PrimaryButton from "@/components/general/buttons/PrimaryButton";
import Input from "@/components/general/form/types/Input";
import Select from "@/components/general/form/types/Select";
import Textarea from "@/components/general/form/types/Textarea";
import { useFormSync } from "@/hooks/form/useFormSync";
import { useInitForm } from "@/hooks/form/useInitForm";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import { NewTreeForm, NewTreeSchema } from "@/schema/newTreeSchema";
import useFormStore, { FormStore } from "@/store/form/useFormStore";
import useStore from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { z } from "zod";

const newTreeSearchSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const treeClusterQuery = (authorization: string) =>
  queryOptions({
    queryKey: ["cluster"],
    queryFn: () => clusterApi.getAllTreeClusters({ authorization }),
  });

export const sensorClusterQuery = (authorization: string) =>
  queryOptions({
    queryKey: ["sensors"],
    queryFn: () => sensorApi.getAllSensors({ authorization }),
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
  loader: () => {
    const token = useStore.getState().auth.token?.accessToken;
    return {
      treeClusters: queryClient.ensureQueryData(
        treeClusterQuery(`Bearer ${token}`),
      ),
      sensors: queryClient.ensureQueryData(
        sensorClusterQuery(`Bearer ${token}`),
      ),
    };
  },
});

function NewTree() {
  const { lat, lng } = Route.useLoaderDeps();
  const navigate = useNavigate({ from: Route.fullPath });
  const authorization = useAuthHeader();
  const { data: sensors } = useSuspenseQuery(sensorClusterQuery(authorization));
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

  const { mapZoom } = useStore((state) => ({
    mapZoom: state.map.zoom,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
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
        <form
          className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-11"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-6">
            <Input
              placeholder="Baumnummer"
              label="Baumnummer"
              required
              error={errors.treeNumber?.message}
              {...register("treeNumber")}
            />
            <Input
              placeholder="Baumart"
              label="Baumart"
              required
              error={errors.species?.message}
              {...register("species")}
            />
            <Input
              placeholder="Pflanzjahr"
              label="Pflanzjahr"
              type="number"
              required
              error={errors.plantingYear?.message}
              {...register("plantingYear")}
            />
            <Select
              options={[
                { label: "Keine Bewässerungsgruppe", value: "-1" },
                ...treeClusters.data.map((cluster) => ({
                  label: cluster.name,
                  value: cluster.id.toString(),
                })),
              ]}
              placeholder="Wählen Sie eine Bewässerungsgruppe aus"
              label="Bewässerungsgruppe"
              error={errors.treeClusterId?.message}
              {...register("treeClusterId")}
            />
            <Select
              options={[
                { label: "Kein Sensor", value: "-1" },
                ...sensors?.data?.map((sensor) => ({
                  label: `Sensor ${sensor.id.toString()}`,
                  value: sensor.id.toString(),
                })),
              ]}
              placeholder="Wählen Sie einen Sensor aus, sofern vorhanden"
              label="Sensor am Baum"
              error={errors.sensorId?.message}
              {...register("sensorId")}
            />
            <Textarea
              placeholder="Hier ist Platz für Notizen"
              label="Kurze Beschreibung"
              error={errors.description?.message}
              {...register("description")}
            />
          </div>

          <div>
            <p className="block font-semibold text-dark-800 mb-2.5">
              Standort des Baumes
            </p>
            <div>
              <p className="block mb-2.5">
                <span className="text-dark-800 font-semibold">
                  Breitengrad:
                </span>{" "}
                {lat}
              </p>
              <p className="block mb-2.5">
                <span className="text-dark-800 font-semibold">Längengrad:</span>{" "}
                {lng}
              </p>
            </div>

            <Link to="/map/tree/edit" search={{ lat, lng, zoom: mapZoom }}>
              <button
                type="button"
                className="mt-6 w-fit border border-green-light text-dark-800 px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 hover:border-green-dark hover:text-dark"
              >
                <span className="font-medium">
                  Standort des Baumes anpassen
                </span>
                <MapPin className="text-current" />
              </button>
            </Link>
          </div>

          <p
            className={`text-red font-medium mt-10 ${isError ? "" : "hidden"}`}
          >
            Es ist leider ein Problem aufgetreten. Bitte probieren Sie es erneut
            oder wenden Sie sich an eine:n Systemadministrator:in.
          </p>

          <PrimaryButton
            type="submit"
            label="Speichern"
            className="mt-10 lg:col-span-full lg:w-fit"
          />
        </form>
      </section>
    </div>
  );
}
