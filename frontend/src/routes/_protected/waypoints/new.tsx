import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/waypoints/new')({
  component: () => <div>Hello /_protected/waypoints/new!</div>
})
