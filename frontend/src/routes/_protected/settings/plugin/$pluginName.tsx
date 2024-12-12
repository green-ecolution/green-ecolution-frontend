import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useMemo } from 'react'
import { PluginProvider } from '@green-ecolution/plugin-interface'
import useStore from '@/store/store'
import {
  init,
  loadRemote,
  registerRemotes,
} from '@module-federation/enhanced/runtime'

export const Route = createFileRoute('/_protected/settings/plugin/$pluginName')(
  {
    component: PluginView,
    meta: ({ params: { pluginName } }) => [{ title: pluginName }],
  }
)

init({
  name: 'app',
  remotes: [],
})

function PluginView() {
  const pluginName = Route.useParams().pluginName
  const { authToken } = useStore((state) => ({
    authToken: state.auth.token,
  }))

  const Plugin = useMemo(
    () =>
      lazy(async () => {
        const { url, name } = {
          url: `/api-local/v1/plugin/${pluginName}/plugin.js`,
          name: pluginName,
        }

        registerRemotes(
          [
            {
              name,
              entry: url,
              type: 'module',
            },
          ],
          { force: true }
        )

        const remote = loadRemote<{ default: any }>(`${name}/app`, {
          from: 'runtime',
        }) as Promise<{ default: any }>

        return remote
      }),
    [pluginName]
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PluginProvider authToken={authToken?.accessToken || ''}>
        <Plugin />
      </PluginProvider>
    </Suspense>
  )
}
