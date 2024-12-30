import { treeIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import TreeDashboard from '@/components/tree/TreeDashboard'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute('/_protected/tree/$treeId')({
  component: SingleTree,
  loader: async ({ params: { treeId } }) => {
    return {
      tree: await queryClient.ensureQueryData(treeIdQuery(treeId)),
    }
  },
  meta: ({ loaderData: { tree } }) => [
    { title: `Baum: ${tree.number}` },
  ],
})

function SingleTree() {
  const treeId = Route.useParams().treeId
  const { tree } = Route.useLoaderData();

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Baumdaten werden geladen …" />}>
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg font-semibold">
              Einen Baum mit der Identifikationsnummer {treeId} gibt es nicht
              oder die Baumdaten konnten nicht geladen werden.
            </p>
          }
        >
          <TreeDashboard tree={tree} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
