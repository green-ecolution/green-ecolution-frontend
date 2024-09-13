import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/treecluster/$treeclusterId')({
  component: () => <div>Hello /treecluster/show!</div>
})
