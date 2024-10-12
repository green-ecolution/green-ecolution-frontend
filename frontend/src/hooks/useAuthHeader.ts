import useStore from '@/store/store'

export const useAuthHeader = () => {
  const token = useStore((state) => state.auth.token)

  // TODO: Add logic to refresh token if expired
  return token ? `Bearer ${token.accessToken}` : ''
}
