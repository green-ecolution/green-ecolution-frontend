import { loginApi } from '@/api/backendApi'
import useAuthStore from '@/store/auth/authStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated
    const currentPath = window.location.pathname
    if (!isAuthenticated) {
      const loginUrl = await loginApi.v1LoginGet({
        redirectUrl: `${window.location.origin}/auth/callback?redirect=${currentPath}`
      }).then((res) => res.loginUrl)

      window.location.href = loginUrl
    }
  }
})
