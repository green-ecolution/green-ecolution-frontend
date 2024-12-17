import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/watering-plans')({
  component: () => <Outlet />,
  meta: () => [{ title: 'Einsatzpläne' }],
})
