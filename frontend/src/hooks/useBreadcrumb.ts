import { useRouterState } from '@tanstack/react-router';
import { useMemo } from 'react';
import { treeclusterDemoData } from '@/data/treecluser';

interface Breadcrumb {
  title: string;
  path: string;
}

export function useBreadcrumbs() {
  const matches = useRouterState({ select: (s) => s.matches });
  const breadcrumbs = useMemo(() => {
    const pathNameMap: { [key: string]: string } = {
      '/': 'Dashboard',
      '/sensors': 'Sensoren',
      '/settings': 'Einstellungen',
      '/team': 'Mitarbeitende',
      '/treecluster/': 'Bewässerungsgruppen',
      '/treecluster/new': 'Neue Bewässerungsgruppe erstellen',
      '/vehicles': 'Fahrzeuge',
      '/waypoints/': 'Einsatzpläne',
      '/waypoints/new': 'Neuer Einsatzplan',
      '/map/': 'Kataster',
      '/profile': 'Dein Profil',
    };

    const result: Breadcrumb[] = [];

    matches.forEach(({ pathname }) => {
      if (pathname !== '/') {
        if (pathname.startsWith('/treecluster/') && pathname !== '/treecluster/') {
          const id = pathname.split('/')[2];
          const treeclusterId = parseInt(id);
          const treecluster = treeclusterDemoData().find(tc => tc.id === treeclusterId);
          const title = treecluster ? treecluster.name : 'Kein Titel vorhanden';

          // Add the 'Treecluster' segment
          result.push({
            title: 'Bewässerungsgruppen',
            path: '/treecluster/',
          });

          // Add the specific treecluster segment
          result.push({
            title,
            path: pathname,
          });
        } else {
          const title = pathNameMap[pathname] || 'Kein Titel vorhanden';
          result.push({
            title,
            path: pathname,
          });
        }
      }
    });

    return result;
  }, [matches]);

  return breadcrumbs;
}