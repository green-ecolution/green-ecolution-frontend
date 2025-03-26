import { wateringPlanIdQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { format } from 'date-fns'

export const Route = createFileRoute(
  '/_protected/watering-plans/_formular/$wateringPlanId'
)({
  component: () => <Outlet />,
  loader: async ({ params }) => {
    const wateringPlan = await queryClient.ensureQueryData(wateringPlanIdQuery(params.wateringPlanId))
    const title = wateringPlan?.date ? `Einsatz: ${format(new Date(wateringPlan?.date), 'dd.MM.yyyy')}` : `Einsatz: ${wateringPlan.id}`
    return {
      crumb: { title }
    }
  },
})
