import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Input from "./types/Input";
import Select from "./types/Select";
import Textarea from "./types/Textarea";
import SelectTrees from "./types/SelectTrees";
import { FieldErrors, SubmitHandler, UseFormRegister } from "react-hook-form";
import { SoilConditionOptions } from "@/hooks/useDetailsForSoilCondition";
import { TreeclusterSchema } from "@/schema/treeclusterSchema";
import useFormStore, { FormStore } from "@/store/form/useFormStore";

interface FormForTreeclusterProps {
  displayError: boolean;
  register: UseFormRegister<TreeclusterSchema>;
  errors: FieldErrors<TreeclusterSchema>;
  onSubmit: SubmitHandler<TreeclusterSchema>;
  handleSubmit: (
    onSubmit: SubmitHandler<TreeclusterSchema>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const FormForTreecluster: React.FC<FormForTreeclusterProps> = ({
  handleSubmit,
  displayError,
  register,
  errors,
  onSubmit,
}) => {
  const { form, set } = useFormStore((state: FormStore<TreeclusterSchema>) => ({
    form: state.form,
    set: state.commit,
  }));

  const handleDeleteTree = (treeId: number) => {
    form &&
      set({
        ...form,
        treeIds: form?.treeIds.filter((id) => id !== treeId) ?? [],
      });
  };

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
          {...register("name")}
        />
        <Input
          label="Adresse"
          error={errors.address?.message}
          {...register("address")}
        />
        <Select
          options={SoilConditionOptions}
          placeholder="Wählen Sie eine Bodenbeschaffenheit aus"
          label="Bodenbeschaffenheit"
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

      <SelectTrees onDelete={handleDeleteTree} treeIds={form?.treeIds ?? []} />

      <p
        className={`text-red font-medium mt-10 ${displayError ? "" : "hidden"}`}
      >
        Es ist leider ein Problem aufgetreten. Bitte probieren Sie es erneut
        oder wenden Sie sich an eine:n Systemadministrator:in.
      </p>

      <PrimaryButton
        type="submit"
        label="Speichern"
        disabled={Object.keys(errors).length > 0 || form?.treeIds.length === 0}
        className="mt-10 lg:col-span-full lg:w-fit"
      />
    </form>
  );
};

export default FormForTreecluster;
