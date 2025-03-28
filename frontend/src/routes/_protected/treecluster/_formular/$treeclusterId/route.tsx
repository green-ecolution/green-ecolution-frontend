import { treeClusterIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/treecluster/_formular/$treeclusterId'
)({
  component: () => <Outlet />,
  loader: async ({ params }) => {
    const cluster = await queryClient.ensureQueryData(treeClusterIdQuery(params.treeclusterId))
    return {
      crumb: {
        title: cluster.name,
      }
    }
  },
})
