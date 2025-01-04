import { wateringPlanIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { format } from 'date-fns'

export const Route = createFileRoute(
  '/_protected/watering-plans/_formular/$wateringPlanId'
)({
  component: () => <Outlet />,
  loader: async ({ params }) => {
    return {
      wateringPlan: await queryClient.ensureQueryData(
        wateringPlanIdQuery(params.wateringPlanId)
      ),
    }
  },
  meta: ({ loaderData: { wateringPlan } }) => {
    const date = wateringPlan?.date
      ? format(new Date(wateringPlan?.date), 'dd.MM.yyyy')
      : 'Keine Angabe'
    return [
      {
        title: `Einsatzplan: ${date}`,
      },
    ]
  },
})
