import { clusterApi } from '@/api/backendApi';
import LoadingInfo from '@/components/general/error/LoadingInfo';
import { useAuthHeader } from '@/hooks/useAuthHeader';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/treecluster/$treecluster/edit')({
  component: EditTreeCluster,

  loader: async ({ params }) => {
    return params.treecluster;
  },
})

function EditTreeCluster () {
  const clusterId = useLoaderData({ from: '/_protected/treecluster/$treecluster/edit'});
  const authorization = useAuthHeader();

  const { data: cluster, isLoading, isError } = useSuspenseQuery({
    queryKey: ["treecluster", clusterId],
    queryFn: () => clusterApi.getTreeClusterById({ clusterId, authorization }),
  });

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

          </section>
        </div>
      )}
    </div>
  )
}