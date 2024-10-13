import { useRouterState } from '@tanstack/react-router'

export function useBreadcrumbs() {
  const breadcrumbs = useRouterState({
    select: (state) => {
      console.log(state)
      return state.matches
        .map((match) => ({
          title: match.meta?.find((tag) => tag.title)!.title as string,
          path: match.pathname,
        }))
        .filter((crumb) => Boolean(crumb.title))
    },
  })

  console.log(breadcrumbs)

  return breadcrumbs
}
