import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/team')({
  component: () => <Outlet />,
  meta: () => [{ title: 'Mitarbeitende' }],
})
