import { sensorQuery, treeClusterQuery } from '@/api/queries'
import useFormStore from '@/store/form/useFormStore'
import useStore from '@/store/store'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { z } from 'zod'

const treeFormularSchema = z.object({
  resetStore: z.boolean().default(true),
})

export const Route = createFileRoute('/_protected/trees/_formular')({
  component: () => <Outlet />,
  validateSearch: treeFormularSchema,
  loaderDeps: ({ search: { resetStore } }) => ({
    resetStore,
  }),
  loader: ({ context: { queryClient }, deps: { resetStore } }) => {
    if (resetStore) {
      useFormStore.getState().reset()
    }

    if (!useStore.getState().auth.isAuthenticated) return

    queryClient.prefetchQuery(treeClusterQuery())
    queryClient.prefetchQuery(sensorQuery())
  },
})
