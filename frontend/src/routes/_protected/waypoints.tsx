import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/waypoints')({
  component: () => <Outlet />,
  meta: () => [{ title: 'Einsatzplanung' }],
})
