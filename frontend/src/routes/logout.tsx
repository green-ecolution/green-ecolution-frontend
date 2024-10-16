import { userApi } from '@/api/backendApi'
import useStore from '@/store/store'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/logout')({
  beforeLoad: async () => {
    const store = useStore.getState()

    if (!store.auth.isAuthenticated) {
      throw redirect({ to: '/', replace: true })
    }

    await userApi
      .v1UserLogoutPost({
        body: {
          refreshToken: store.auth.token?.refreshToken || '',
        },
      })
      .then(() => {
        useStore.setState((state) => {
          state.auth.isAuthenticated = false
          state.auth.token = null
        })
      })
      .catch((err) => {
        console.error(err)
        throw new Error(err.message)
      })

    throw redirect({ to: '/', replace: true })
  },
})
