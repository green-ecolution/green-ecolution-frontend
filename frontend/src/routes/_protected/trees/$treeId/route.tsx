import { treeIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import { createFileRoute, Outlet } from '@tanstack/react-router'

const RouteComponent = () => <Outlet />;

export const Route = createFileRoute('/_protected/trees/$treeId')({
  component: RouteComponent,
  loader: async ({ params: { treeId } }) => {
    const tree = await queryClient.ensureQueryData(treeIdQuery(treeId))
    return {
      crumb: {
        title: `Baum: ${tree.number}`,
      }
    }
  },
})
