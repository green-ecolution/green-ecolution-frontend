import { userApi } from '@/api/backendApi'
import App from '@/App'
import useStore from '@/store/store'
import { createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: Root,
  beforeLoad: async () => {
    const token = await userApi.v1UserTokenRefreshPost({
      body: {
        refreshToken: useStore.getState().auth.token?.refreshToken || '',
      },
    })
    if (!token) {
      return
    }
    useStore.getState().auth.setToken(token)
    useStore.getState().user.setFromJwt(token.accessToken)
  }
})

function Root() {
  return (
    <>
      <App />
    </>
  )
}
