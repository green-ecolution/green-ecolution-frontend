import { treeIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/trees/_formular/$treeId')({
  component: () => <Outlet />,
  loader: async ({ params: { treeId } }) => {
    return {
      tree: await queryClient.ensureQueryData(treeIdQuery(treeId)),
    }
  },
  meta: ({ loaderData: { tree } }) => [
    { title: `Baum: ${tree.number}` },
  ],
})

