import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/waypoints/')({
  component: () => <div>Hello /_protected/waypoints/!</div>
})