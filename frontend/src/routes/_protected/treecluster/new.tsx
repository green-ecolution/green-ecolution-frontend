import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/treecluster/new')({
  component: () => <div>Hello /_protected/treecluster/new!</div>
})