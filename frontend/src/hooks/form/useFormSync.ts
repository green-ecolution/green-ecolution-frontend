import useFormStore, { FormStore } from "@/store/form/useFormStore";
import { useEffect } from "react";
import { Resolver, DefaultValues, useForm, FieldValues } from "react-hook-form";

export const useFormSync = <T extends FieldValues>(
  defaultValues?: DefaultValues<T>,
  resolver?: Resolver<T>,
) => {
  const { commit } = useFormStore((state: FormStore<T>) => ({
    commit: state.commit,
  }));

  const form = useForm<T>({
    resolver,
    defaultValues,
    mode: "all",
  });

  useEffect(() => {
    // console.log("defaultValues", defaultValues);
    defaultValues && form.reset(defaultValues);
  }, [defaultValues, form]);

  useEffect(() => {
    const { unsubscribe } = form.watch((value) => {
      // console.log(value);
      commit(value);
    });

    return () => unsubscribe();
  }, [commit, form, form.watch]);

  return form;
};
