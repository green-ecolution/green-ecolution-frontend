import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/tree/')({
  component: () => <div>Hello /dashboard/tree/!</div>
})
