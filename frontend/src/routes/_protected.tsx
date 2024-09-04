import { userApi } from '@/api/backendApi'
import useAuthStore from '@/store/store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    const isAuthenticated = useAuthStore.getState().auth.isAuthenticated
    const currentPath = (location.pathname+location.search)
    if (!isAuthenticated) {
      const loginUrl = await userApi.v1UserLoginGet({
        redirectUrl: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(currentPath)}`
      }).then((res) => res.loginUrl)

      window.location.href = loginUrl
    }
  }
})
