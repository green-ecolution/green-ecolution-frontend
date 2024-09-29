import { useRouterState } from '@tanstack/react-router';
import { useMemo } from 'react';

interface Breadcrumb {
  title: string;
  path: string;
}

export function useBreadcrumbs() {
  const matches = useRouterState({ select: (s) => s.matches });
  const breadcrumbs = useMemo(() => {
    const result: Breadcrumb[] = [];

    matches.forEach(({ meta }) => {
      const titlesAndPaths = meta?.filter((tag): tag is { title: string; path: string } => tag.title !== undefined) || [];
      titlesAndPaths.forEach(tag => {
        result.push({
          title: tag.title,
          path: tag.path,
        });
      });
    });

    return result;
  }, [matches]);

  return breadcrumbs;
}
