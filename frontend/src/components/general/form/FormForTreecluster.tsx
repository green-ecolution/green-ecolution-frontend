import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Input from "./types/Input";
import Select from "./types/Select";
import Textarea from "./types/Textarea";
import SelectTrees from "./types/SelectTrees";
import { FieldErrors, SubmitHandler, UseFormRegister } from "react-hook-form";
import { SoilConditionOptions } from "@/hooks/useDetailsForSoilCondition";
import { TreeclusterForm } from "@/schema/treeclusterSchema";
import useStore from "@/store/store";

interface FormForTreeclusterProps {
  displayError: boolean;
  register: UseFormRegister<TreeclusterForm>;
  errors: FieldErrors<TreeclusterForm>;
  onSubmit: SubmitHandler<TreeclusterForm>;
  handleSubmit: (
    onSubmit: SubmitHandler<TreeclusterForm>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const FormForTreecluster: React.FC<FormForTreeclusterProps> = ({
  handleSubmit,
  displayError,
  register,
  errors,
  onSubmit,
}) => {
  const { treeIds, removeTree } = useStore((state) => ({
    treeIds: state.form.treecluster.treeIds,
    removeTree: state.form.treecluster.removeTree,
  }));

  return (
    <form
      key="cluster-register"
      className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-11"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-6">
        <Input<TreeclusterForm>
          name="name"
          placeholder="Name"
          label="Name der Bewässerungsgruppe"
          required
          register={register}
          error={errors.name?.message}
        />
        <Input<TreeclusterForm>
          name="address"
          placeholder="Adresse"
          label="Adresse"
          required
          register={register}
          error={errors.address?.message}
        />
        <Select<TreeclusterForm>
          name="soilCondition"
          options={SoilConditionOptions}
          placeholder="Wählen Sie eine Bodenbeschaffenheit aus"
          label="Bodenbeschaffenheit"
          required
          register={register}
          error={errors.soilCondition?.message}
        />
        <Textarea<TreeclusterForm>
          name="description"
          placeholder="Hier ist Platz für Notizen"
          label="Kurze Beschreibung"
          required
          register={register}
          error={errors.description?.message}
        />
      </div>

      <SelectTrees onDelete={removeTree} />

      <p
        className={`text-red font-medium mt-10 ${displayError ? "" : "hidden"}`}
      >
        Es ist leider ein Problem aufgetreten. Bitte probieren Sie es erneut
        oder wenden Sie sich an eine:n Systemadministrator:in.
      </p>

      <PrimaryButton
        type="submit"
        label="Speichern"
        disabled={Object.keys(errors).length > 0 || treeIds.length === 0}
        className="mt-10 lg:col-span-full lg:w-fit"
      />
    </form>
  );
};

export default FormForTreecluster;
