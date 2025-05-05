import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Input from "./types/Input";
import Select from "./types/Select";
import Textarea from "./types/Textarea";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";
import { SoilConditionOptions } from "@/hooks/details/useDetailsForSoilCondition";
import { TreeclusterForm } from "@/schema/treeclusterSchema";
import useFormStore, { FormStore } from "@/store/form/useFormStore";
import FormError from "./FormError";
import SelectEntities from "./types/SelectEntities";

export interface FormForProps<T extends FieldValues> {
  displayError: boolean;
  errorMessage?: string;
  register: UseFormRegister<T>;
  onSubmit: SubmitHandler<T>;
  formState: FormState<T>;
  handleSubmit: (
    onSubmit: SubmitHandler<T>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
};

interface FormForTreeClusterProps extends FormForProps<TreeclusterForm> {
  onAddTrees: () => void;
  onDeleteTree: (treeId: number) => void;
}

const FormForTreecluster = (props: FormForTreeClusterProps) => {
  const { errors, isValid } = props.formState
  const { treeIds } = useFormStore((state: FormStore<TreeclusterForm>) => ({
    treeIds: state.form?.treeIds,
  }));

  return (
    <form
      key="cluster-register"
      className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-11"
      onSubmit={() => void props.handleSubmit(props.onSubmit)}
    >
      <div className="space-y-6">
        <Input
          label="Name"
          error={errors.name?.message}
          required
          {...props.register("name")}
        />
        <Input
          label="Adresse"
          required
          error={errors.address?.message}
          {...props.register("address")}
        />
        <Select
          options={SoilConditionOptions}
          placeholder="Wählen Sie eine Bodenbeschaffenheit aus"
          label="Bodenbeschaffenheit"
          required
          error={errors.soilCondition?.message}
          {...props.register("soilCondition")}
        />
        <Textarea
          placeholder="Hier ist Platz für Notizen"
          label="Kurze Beschreibung"
          error={errors.description?.message}
          {...props.register("description")}
        />
      </div>

      <SelectEntities
        onDelete={props.onDeleteTree}
        entityIds={treeIds ?? []}
        onAdd={props.onAddTrees}
        type="tree"
        label="Bäume"
      />

      <FormError
        show={props.displayError}
        error={props.errorMessage}
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

export default FormForTreecluster;
