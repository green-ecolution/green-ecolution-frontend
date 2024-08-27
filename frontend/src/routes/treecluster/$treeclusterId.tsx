import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/treecluster/$treeclusterId')({
  component: () => <div>Hello /treecluster/show!</div>
})
