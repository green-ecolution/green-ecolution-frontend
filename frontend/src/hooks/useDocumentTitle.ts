import { useEffect } from 'react'
import { useRouterState } from '@tanstack/react-router'

function useDocumentTitle() {
  const title = useRouterState({
    select: (state) => {
      console.log(state.matches)
      return state.matches
        .map((match) => match.meta?.find((tag) => tag.title)?.title)
        .filter((title) => Boolean(title))
        .reverse()
        .join(' | ')
    },
  })

  useEffect(() => {
    document.title = title || 'Green Ecolution'
  }, [title])
}

export default useDocumentTitle
