import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings")({
  component: () => <Outlet />,
  meta: () => [
    {
      title: 'Einstellungen',
      path: '/settings',
    },
  ],
});

