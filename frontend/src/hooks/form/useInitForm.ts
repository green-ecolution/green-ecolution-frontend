import { useEffect, useRef } from "react";
import { useAuthHeader } from "../useAuthHeader";
import { useSuspenseQuery } from "@tanstack/react-query";
import { clusterApi, EntitiesTreeSoilCondition } from "@/api/backendApi";
import useFormStore, { FormStore } from "@/store/form/useFormStore";
import { TreeclusterSchema } from "@/schema/treeclusterSchema";

export const useInitTreeClusterForm = (clusterId: string) => {
  const authorization = useAuthHeader();
  const { init, isEmpty, form } = useFormStore(
    (state: FormStore<TreeclusterSchema>) => ({
      init: state.commit,
      isEmpty: state.isEmpty,
      form: state.form,
    }),
  );
  const initForm = useRef<TreeclusterSchema | undefined>(form);

  const { data } = useSuspenseQuery({
    queryKey: ["treescluster", clusterId],
    queryFn: () =>
      clusterApi.getTreeClusterById({
        authorization,
        clusterId,
      }),
    staleTime: 0,
  });

  useEffect(() => {
    if (isEmpty()) {
      initForm.current = {
        name: data.name,
        address: data.address,
        description: data.description,
        soilCondition: data.soilCondition as EntitiesTreeSoilCondition,
        treeIds: data.trees.map((tree) => tree.id),
      };

      console.log("initForm", initForm, data, isEmpty());
      isEmpty() && init(initForm.current);
    }
  }, [data, init, isEmpty]);

  return { initForm: initForm.current, loadedData: data };
};
