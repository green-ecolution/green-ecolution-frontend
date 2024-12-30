import { wateringPlanIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/watering-plans/_formular/$wateringPlanId')({
  component: () => <Outlet />,
  loader: async ({ params }) => {
    return {
      wateringPlan: await queryClient.ensureQueryData(
        wateringPlanIdQuery(params.wateringPlanId)
      ),
    }
  },
  meta: ({ loaderData: { wateringPlan } }) => {
    return [
      {
        title: `Einsatzplan: ${wateringPlan.date}`,
      },
    ]
  },
})
