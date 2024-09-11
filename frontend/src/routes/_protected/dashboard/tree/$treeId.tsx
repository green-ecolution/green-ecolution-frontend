import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard/tree/$treeId')({
  component: () => <div>Hello /_protected/dashboard/tree/$treeId!</div>
})