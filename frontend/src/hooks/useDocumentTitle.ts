import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';

function useDocumentTitle() {
  const route = useRouterState({
    select: (state) => state.matches.find(match => match.meta?.find(tag => tag.title)),
  });

  const title = route?.meta?.find(tag => tag.title)?.title || 'Green Ecolution';

  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default useDocumentTitle;
