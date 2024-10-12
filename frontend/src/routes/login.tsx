import { userApi } from '@/api/backendApi'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const loginUrl = await userApi
      .v1UserLoginGet({
        redirectUrl: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent('/dashboard')}`,
      })
      .then((res) => res.loginUrl)

    window.location.href = loginUrl
  },
})
