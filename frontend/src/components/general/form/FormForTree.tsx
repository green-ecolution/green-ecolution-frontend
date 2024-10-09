import { NewTreeForm } from "@/schema/newTreeSchema";
import { FormForProps } from "./FormForTreecluster";
import Input from "./types/Input";
import Select from "./types/Select";
import { Sensor, TreeCluster } from "@/api/backendApi";
import Textarea from "./types/Textarea";
import { MapPin } from "lucide-react";
import PrimaryButton from "../buttons/PrimaryButton";
import useFormStore, { FormStore } from "@/store/form/useFormStore";

interface FormForTreeProps extends FormForProps<NewTreeForm> {
  treeClusters: TreeCluster[];
  sensors: Sensor[];
  onChangeLocation: () => void;
}

const FormForTree = (props: FormForTreeProps) => {
  const { lat, lng } = useFormStore((state: FormStore<NewTreeForm>) => ({
    lat: state.form?.latitude ?? 0,
    lng: state.form?.longitude ?? 0,
  }));

  const { errors, isDirty, isValid } = props.formState;

  return (
    <form
      className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-11"
      onSubmit={props.handleSubmit(props.onSubmit)}
    >
      <div className="space-y-6">
        <Input
          placeholder="Baumnummer"
          label="Baumnummer"
          required
          error={errors.treeNumber?.message}
          {...props.register("treeNumber")}
        />
        <Input
          placeholder="Baumart"
          label="Baumart"
          required
          error={errors.species?.message}
          {...props.register("species")}
        />
        <Input
          placeholder="Pflanzjahr"
          label="Pflanzjahr"
          type="number"
          required
          {...props.register("plantingYear")}
        />
        <Select
          options={[
            { label: "Keine Bewässerungsgruppe", value: "-1" },
            ...props.treeClusters.map((cluster) => ({
              label: cluster.name,
              value: cluster.id.toString(),
            })),
          ]}
          placeholder="Wählen Sie eine Bewässerungsgruppe aus"
          label="Bewässerungsgruppe"
          error={errors.treeClusterId?.message}
          {...props.register("treeClusterId")}
        />
        <Select
          options={[
            { label: "Kein Sensor", value: "-1" },
            ...props.sensors.map((sensor) => ({
              label: `Sensor ${sensor.id.toString()}`,
              value: sensor.id.toString(),
            })),
          ]}
          placeholder="Wählen Sie einen Sensor aus, sofern vorhanden"
          label="Sensor am Baum"
          error={errors.sensorId?.message}
          {...props.register("sensorId")}
        />
        <Textarea
          placeholder="Hier ist Platz für Notizen"
          label="Kurze Beschreibung"
          error={errors.description?.message}
          {...props.register("description")}
        />
      </div>

      <div>
        <p className="block font-semibold text-dark-800 mb-2.5">
          Standort des Baumes
        </p>
        <div>
          <p className="block mb-2.5">
            <span className="text-dark-800 font-semibold">Breitengrad:</span>{" "}
            {lat}
          </p>
          <p className="block mb-2.5">
            <span className="text-dark-800 font-semibold">Längengrad:</span>{" "}
            {lng}
          </p>
        </div>

        <button
          type="button"
          className="mt-6 w-fit border border-green-light text-dark-800 px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 hover:border-green-dark hover:text-dark"
          onClick={props.onChangeLocation}
        >
          <span className="font-medium">Standort des Baumes anpassen</span>
          <MapPin className="text-current" />
        </button>
      </div>

      <p
        className={`text-red font-medium mt-10 ${props.displayError ? "" : "hidden"}`}
      >
        Es ist leider ein Problem aufgetreten. Bitte probieren Sie es erneut
        oder wenden Sie sich an eine:n Systemadministrator:in.
      </p>

      <PrimaryButton
        type="submit"
        label="Speichern"
        className="mt-10 lg:col-span-full lg:w-fit"
        disabled={!isValid || !isDirty}
      />
    </form>
  );
};

export default FormForTree;
