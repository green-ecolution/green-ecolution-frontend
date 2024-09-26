import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/map/treecluster/new')({
  component: () => <div>Hello /_protected/map/treecluster/new!</div>
})