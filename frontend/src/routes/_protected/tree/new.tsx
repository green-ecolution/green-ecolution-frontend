import { treeApi } from "@/api/backendApi";
import PrimaryButton from "@/components/general/buttons/PrimaryButton";
import Input from "@/components/general/form/Input";
import Select from "@/components/general/form/Select";
import Textarea from "@/components/general/form/Textarea";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import { NewTreeForm, NewTreeSchema } from "@/schema/newTreeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newTreeSearchSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const Route = createFileRoute("/_protected/tree/new")({
  component: NewTree,
  validateSearch: newTreeSearchSchema,
});

function NewTree() {
  const { lat, lng } = useSearch({ from: "/_protected/tree/new" });
  const authorization = useAuthHeader();
  const { data: treeClusters } = useSuspenseQuery({
    queryKey: ["treeClusters"],
    queryFn: () => treeApi.getAllTrees({ authorization }), // TODO: Change to treeClusters
  });

  const { data: sensors } = useSuspenseQuery({
    queryKey: ["sensors"],
    queryFn: () => treeApi.getAllTrees({ authorization }), // TODO: Change to sensors
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    // getValues,
    // reset,
  } = useForm<NewTreeForm>({
    resolver: zodResolver(NewTreeSchema()),
  });

  const onSubmit = async (data: NewTreeForm) => {
    console.log(data);
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
            <Input<NewTreeForm>
              name="number"
              placeholder="Baumnummer"
              label="Baumnummer"
              required
              register={register}
              error={errors.number?.message}
            />
            <Input<NewTreeForm>
              name="species"
              placeholder="Baumart"
              label="Baumart"
              required
              register={register}
              error={errors.species?.message}
            />
            <Input<NewTreeForm>
              name="plantingYear"
              placeholder="Pflanzjahr"
              label="Pflanzjahr"
              register={register}
              error={errors.plantingYear?.message}
            />
            <Select<NewTreeForm>
              name="treeClusterId"
              options={treeClusters?.data?.map((cluster) => ({
                label: cluster.id.toString(),
                value: cluster.id.toString(),
              }))}
              placeholder="Wählen Sie eine Bewässerungsgruppe aus"
              label="Bewässerungsgruppe"
              required
              register={register}
              error={errors.treeClusterId?.message}
            />
            <Select<NewTreeForm>
              name="sensorId"
              options={sensors?.data?.map((sensor) => ({
                label: sensor.id.toString(),
                value: sensor.id.toString(),
              }))}
              placeholder="Wählen Sie einen Sensor aus, sofern vorhanden"
              label="Sensor am Baum"
              register={register}
              error={errors.sensorId?.message}
            />
            <Textarea<NewTreeForm>
              name="description"
              placeholder="Hier ist Platz für Notizen"
              label="Kurze Beschreibung"
              register={register}
              error={errors.description?.message}
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

            <button className="mt-6 w-fit border border-green-light text-dark-800 px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 hover:border-green-dark hover:text-dark">
              <span className="font-medium">Standort des Baumes anpassen</span>
              <MapPin className="text-current" />
            </button>
          </div>

          <p className={`text-red font-medium mt-10 ${true ? "" : "hidden"}`}>
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
