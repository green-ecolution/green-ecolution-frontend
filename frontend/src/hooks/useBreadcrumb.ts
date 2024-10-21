import { useRouterState } from '@tanstack/react-router'

export function useBreadcrumbs() {
  const breadcrumbs = useRouterState({
    select: (state) => {
      return state.matches
        .map((match) => ({
          title: match.meta?.find((tag) => tag.title)!.title as string,
          path: match.pathname,
        }))
        .filter((crumb) => Boolean(crumb.title))
    },
  })
  return breadcrumbs
}
