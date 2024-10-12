import App from '@/App'
import { createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <>
      <App />
    </>
  )
}
