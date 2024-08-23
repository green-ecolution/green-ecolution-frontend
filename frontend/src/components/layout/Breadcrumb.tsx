import { useRouterState, Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';

function Breadcrumb() {
  const pathNameMap: { [key: string]: string } = {
    '/': 'Dashboard',
    '/sensors': 'Sensoren',
    '/settings': 'Einstellungen',
    '/team': 'Mitarbeitende',
    '/treecluster': 'Baumgruppen',
    '/vehicles': 'Fahrzeuge',
    '/waypoints/': 'Einsatzpläne',
    '/waypoints/new': 'Neuer Einsatzplan',
    '/map/': 'Kataster',
  };

  const matches = useRouterState({ select: (s) => s.matches });
  const breadcrumbs = matches
    .filter(({ pathname }) => pathname !== '/')
    .map(({ pathname }) => {
      const title = pathNameMap[pathname] || 'Kein Titel vorhanden';
      return {
        title,
        path: pathname,
      };
    });

  const rootBreadcrumb = {
    title: 'Dashboard',
    path: '/',
  };

  return (
    <nav aria-label="Seitennavigation" className="hidden text-xs text-dark-800 lg:block">
      <ul className="flex flex-wrap items-center">
        <li className="flex items-center">
          <Link 
            className="data-[status=active]:text-dark data-[status=active]:font-semibold transition-all ease-in-out duration-300 hover:text-green-dark hover:data-[status=active]:text-green-dark" 
            to={rootBreadcrumb.path}
          >
            {rootBreadcrumb.title}
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, key) => (
          <li key={key} className="flex items-center">
            <ChevronRight className="w-3.5 stroke-1" />
            <Link 
              className="data-[status=active]:text-dark data-[status=active]:font-semibold transition-all ease-in-out duration-300 hover:text-green-dark hover:data-[status=active]:text-green-dark" 
              to={breadcrumb.path}
            >
              {breadcrumb.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Breadcrumb;
