import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TreeclusterForm, TreeclusterSchema } from "@/schema/treeclusterSchema";
import { useEffect } from "react";
import useStore from "@/store/store";

export const useTreeClusterForm = (defaultValues: TreeclusterForm) => {
  const { cache, cluster } = useStore((state) => ({
    cache: state.form.treecluster.cache,
    cluster: {
      treeIds: state.form.treecluster.treeIds,
      name: state.form.treecluster.name,
      address: state.form.treecluster.address,
      description: state.form.treecluster.description,
      soilCondition: state.form.treecluster.soilCondition,
    },
  }));

  const form = useForm<TreeclusterForm>({
    resolver: zodResolver(TreeclusterSchema()),
    defaultValues,
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((value) => {
      cache({
        treeIds:
          value.treeIds?.filter((id): id is number => !!id) ?? cluster.treeIds,
        name: value.name ?? cluster.name,
        address: value.address ?? cluster.address,
        description: value.description ?? cluster.description,
        soilCondition: value.soilCondition ?? cluster.soilCondition,
      });
    });

    return () => unsubscribe();
  }, [form.watch]);

  return form;
};
