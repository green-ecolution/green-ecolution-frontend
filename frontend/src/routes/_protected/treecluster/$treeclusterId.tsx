import { treeClusterIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/treecluster/$treeclusterId')({
  component: () => <Outlet />,
  loader: async ({ params }) => {
    return {
      cluster: await queryClient.ensureQueryData(
        treeClusterIdQuery(params.treeclusterId)
      ),
    }
  },
  meta: ({ loaderData: {cluster} }) => {
    return [
      {
        title: cluster.name,
      },
    ]
  },
})

