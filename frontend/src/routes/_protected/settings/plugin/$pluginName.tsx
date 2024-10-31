import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useMemo } from 'react'
import {
  __federation_method_getRemote,
  __federation_method_setRemote,
  // @ts-ignore
} from '__federation__'
import { PluginProvider } from '@green-ecolution/plugin-interface'
import useStore from '@/store/store'

export const Route = createFileRoute('/_protected/settings/plugin/$pluginName')(
  {
    component: PluginView,
    meta: ({ params: { pluginName } }) => [{ title: pluginName }],
  }
)

function PluginView() {
  const pluginName = Route.useParams().pluginName
  const { authToken } = useStore((state) => ({
    authToken: state.auth.token,
  }))

  const Plugin = useMemo(
    () =>
      lazy(() => {
        const { url, name, module } = {
          url: `/api-local/v1/plugin/${pluginName}/assets/plugin.js`,
          name: pluginName,
          module: './RemoteARoot',
        }

        __federation_method_setRemote(name, {
          url: () => Promise.resolve(url),
          format: 'esm',
          from: 'vite',
        })

        return __federation_method_getRemote(name, module)
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
