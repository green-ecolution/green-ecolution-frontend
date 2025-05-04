import { treeIdQuery } from '@/api/queries'
import { createFileRoute, Outlet } from '@tanstack/react-router'

const RouteComponent = () => <Outlet />;

export const Route = createFileRoute('/_protected/trees/$treeId')({
  component: RouteComponent,
  loader: async ({ context, params: { treeId } }) => {
    const tree = await context.queryClient.ensureQueryData(treeIdQuery(treeId))
    return {
      crumb: {
        title: `Baum: ${tree.number}`,
      }
    }
  },
})
