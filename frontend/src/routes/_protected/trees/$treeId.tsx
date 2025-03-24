import { treeIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import TreeDashboard from '@/components/tree/TreeDashboard'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/_protected/trees/$treeId')({
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

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Baumdaten werden geladen …" />}>
        <TreeDashboard treeId={treeId} />
      </Suspense>
    </div>
  )
}
