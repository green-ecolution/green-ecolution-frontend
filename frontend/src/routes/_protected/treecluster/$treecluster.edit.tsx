import { clusterApi, EntitiesTreeSoilCondition } from '@/api/backendApi';
import LoadingInfo from '@/components/general/error/LoadingInfo';
import FormForTreecluster from '@/components/general/form/FormForTreecluster';
import { useAuthHeader } from '@/hooks/useAuthHeader';
import { TreeclusterForm, TreeclusterSchema } from '@/schema/treeclusterSchema';
import useStore from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const Route = createFileRoute('/_protected/treecluster/$treecluster/edit')({
  component: EditTreeCluster,
  loader: async ({ params }) => {
    return params.treecluster;
  },
});

function EditTreeCluster() {
  const authorization = useAuthHeader();
  const clusterId = useLoaderData({ from: '/_protected/treecluster/$treecluster/edit' });
  const clusterState = useStore((state) => state.treecluster);
  const [displayError] = useState(false);

  const { data: cluster, isLoading, isError } = useSuspenseQuery({
    queryKey: ["treecluster", clusterId],
    queryFn: () => clusterApi.getTreeClusterById({ clusterId, authorization }),
  });

  const defaultValues = useMemo(() => ({
    name: cluster?.name || '',
    address: cluster?.address || '',
    description: cluster?.description || '',
    soilCondition: cluster?.soilCondition || EntitiesTreeSoilCondition.TreeSoilConditionUnknown,
  }), [cluster]);

  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<TreeclusterForm>({
    resolver: zodResolver(TreeclusterSchema()),
    defaultValues,
  });

  useEffect(() => {
    if (cluster && clusterState.treeIds.length === 0) {
      clusterState.setTreeIds(cluster.trees.map(tree => tree.id));
    }
  }, [cluster, clusterState]);

  const onSubmit: SubmitHandler<TreeclusterForm> = async (data) => {
    try {
      setDisplayError(false);
  
      const clusterData = {
        ...data,
        treeIds: clusterState.treeIds,
      };
      
      const response = await clusterApi.updateTreeCluster({
        authorization,
        body: clusterData,
      });

      // TODO: navigate to overview and show success toast
      console.log('Tree cluster created:', response);
    } catch (error) {
      setDisplayError(true);
      console.error('Failed to create tree cluster:', error);
    }
  };

  const handleDeleteTree = (treeIdToDelete: number) => {
    clusterState.setTreeIds(clusterState.treeIds.filter((treeId) => treeId !== treeIdToDelete));
  };

  const storeState = () => {
    const formData = getValues();
    clusterState.setName(formData.name);
    clusterState.setAddress(formData.address);
    clusterState.setSoilCondition(formData.soilCondition);
    clusterState.setDescription(formData.description);
  };

  return (
    <div className="container mt-6">
      {isLoading ? (
        <LoadingInfo label="Daten werden geladen …" />
      ) : isError || !cluster ? (
        <p className="text-red text-lg">
          Eine Bewässerungsgruppe mit der Nummer {clusterId} gibt es nicht oder die Daten zur Bewässerungsgruppe konnten nicht geladen werden.
        </p>
      ) : (
        <div>
          <article className="2xl:w-4/5">
            <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
              Bewässerungsgruppe {cluster.name} bearbeiten
            </h1>
            <p className="mb-5">
              Labore est cillum aliqua do consectetur. 
              Do anim officia sunt magna nisi eiusmod sit excepteur qui aliqua duis irure in cillum cillum.
            </p>
          </article>

          <section className="mt-10">
          <FormForTreecluster
            register={register}
            handleDeleteTree={handleDeleteTree}
            handleSubmit={handleSubmit}
            displayError={displayError}
            errors={errors}
            onSubmit={onSubmit}
            treeIds={clusterState.treeIds} 
            storeState={storeState} />
          </section>
        </div>
      )}
    </div>
  )
}