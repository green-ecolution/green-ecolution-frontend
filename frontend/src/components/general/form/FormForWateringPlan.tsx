import PrimaryButton from "../buttons/PrimaryButton";
import Input from "./types/Input";
import Select from "./types/Select";
import Textarea from "./types/Textarea";
import FormError from "./FormError";
import { WateringPlanForm } from "@/schema/wateringPlanSchema";
import { Vehicle } from "@green-ecolution/backend-client";
import { FormForProps } from "./FormForTreecluster";
import SelectEntities from "./types/SelectEntities";

interface FormForWateringPlanProps extends FormForProps<WateringPlanForm> {
  transporters: Vehicle[]
  trailers: Vehicle[]
  onAddCluster: () => void;
  onDeleteCluster: (clusterId: number) => void;
}

const FormForWateringPlan = (props: FormForWateringPlanProps) => {
  const { errors, isValid } = props.formState

  return (
    <form
      key="cluster-register"
      className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-11"
      onSubmit={props.handleSubmit(props.onSubmit)}
    >
      <div className="space-y-6">
        <Input
          label="Datum des Einsatzes"
          error={errors.date?.message}
          required
          type="date"
          {...props.register("date")}
        />
        <Select
          options={[
            { label: 'Kein Fahrzeug', value: '-1' },
            ...props.transporters.map((transporter) => ({
              label: `${transporter.numberPlate.toString()}`,
              value: transporter.id.toString(),
            })),
          ]}
          placeholder="Wählen Sie ein Fahrzeug aus"
          label="Verknüpftes Fahrzeug"
          required
          error={errors.transporterId?.message}
          {...props.register('transporterId')}
        />
        <Select
          options={[
            { label: 'Keinen Anhänger', value: '-1' },
            ...props.trailers.map((trailer) => ({
              label: `${trailer.numberPlate.toString()}`,
              value: trailer.id.toString(),
            })),
          ]}
          placeholder="Wählen Sie einen Anhänger aus, sofern vorhanden"
          label="Verknüpfter Anhänger"
          error={errors.trailerId?.message}
          {...props.register('trailerId')}
        />
        <Textarea
          placeholder="Hier ist Platz für Notizen"
          label="Kurze Beschreibung"
          error={errors.description?.message}
          {...props.register("description")}
        />
      </div>

      <SelectEntities
        onDelete={props.onAddCluster}
        entityIds={[]}
        onAdd={props.onAddCluster}
        type="tree"
        label="Bewässerungsgruppen"
      />

      <FormError
        show={props.displayError}
        error="Es ist leider ein Problem aufgetreten. Bitte probieren Sie es erneut oder wenden Sie sich an einen Systemadministrierenden."
      />

      <PrimaryButton
        type="submit"
        label="Speichern"
        disabled={!isValid}
        className="mt-10 lg:col-span-full lg:w-fit"
      />
    </form>
  );
};

export default FormForWateringPlan;
