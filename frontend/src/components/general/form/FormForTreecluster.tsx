import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Input from "./types/Input";
import Select from "./types/Select";
import Textarea from "./types/Textarea";
import SelectTrees from "./types/SelectTrees";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";
import { SoilConditionOptions } from "@/hooks/useDetailsForSoilCondition";
import { TreeclusterSchema } from "@/schema/treeclusterSchema";
import useFormStore, { FormStore } from "@/store/form/useFormStore";
import FormError from "./FormError";

export type FormForProps<T extends FieldValues> = {
  displayError: boolean;
  register: UseFormRegister<T>;
  onSubmit: SubmitHandler<T>;
  formState: FormState<T>;
  handleSubmit: (
    onSubmit: SubmitHandler<T>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
};

interface FormForTreeclusterProps extends FormForProps<TreeclusterSchema> {
  onAddTrees: () => void;
  onDeleteTree: (treeId: number) => void;
}

const FormForTreecluster: React.FC<FormForTreeclusterProps> = ({
  handleSubmit,
  displayError,
  register,
  onSubmit,
  onAddTrees,
  onDeleteTree,
  formState: { errors, isDirty, isValid },
}) => {
  const { treeIds } = useFormStore((state: FormStore<TreeclusterSchema>) => ({
    treeIds: state.form?.treeIds,
  }));

  return (
    <form
      key="cluster-register"
      className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-11"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-6">
        <Input
          label="Name"
          error={errors.name?.message}
          required
          {...register("name")}
        />
        <Input
          label="Adresse"
          required
          error={errors.address?.message}
          {...register("address")}
        />
        <Select
          options={SoilConditionOptions}
          placeholder="Wählen Sie eine Bodenbeschaffenheit aus"
          label="Bodenbeschaffenheit"
          required
          error={errors.soilCondition?.message}
          {...register("soilCondition")}
        />
        <Textarea
          placeholder="Hier ist Platz für Notizen"
          label="Kurze Beschreibung"
          error={errors.description?.message}
          {...register("description")}
        />
      </div>

      <SelectTrees
        onDelete={onDeleteTree}
        treeIds={treeIds ?? []}
        onAddTrees={onAddTrees}
      />

      <FormError
        show={displayError}
        error="Es ist leider ein Problem aufgetreten. Bitte probieren Sie es erneut oder wenden Sie sich an eine:n Systemadministrator:in."
      />

      <PrimaryButton
        type="submit"
        label="Speichern"
        disabled={!isValid || !isDirty}
        className="mt-10 lg:col-span-full lg:w-fit"
      />
    </form>
  );
};

export default FormForTreecluster;
