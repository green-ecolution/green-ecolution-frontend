import UserCard from '@/components/general/cards/UserCard'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSuspenseQuery } from '@tanstack/react-query'
import { userQuery } from '@/api/queries'

export const Route = createFileRoute('/_protected/team/')({
  component: Team,
  meta: () => [
    {
      title: 'Mitarbeitende',
      path: '/team',
    },
  ],
})

function Team() {
  // TODO: do not show all user, only user with correct user role
  const { data: userRes } = useSuspenseQuery(userQuery())

  return (
    <div className="container mt-6">
      <article className="mb-20 2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Alle Mitarbeitenden
        </h1>
        <p className="mb-5">
          Hier finden Sie eine Übersicht aller Mitarbeitenden und weitere Informationen zu deren Rollen und welche
          Führerscheinklasse sie besitzen. Diese Informationen sind wichtig, wenn Personen zu einem Einsatzplan eingeteilt werden sollen.
        </p>
      </article>

      <section className="mt-10">
        <header className="hidden border-b pb-2 text-sm text-dark-800 px-8 border-b-dark-200 mb-5 lg:grid lg:grid-cols-[1fr,1.5fr,1fr,1fr] lg:gap-5 xl:px-10">
          <p>Verfügbarkeit</p>
          <p>Name</p>
          <p>Aufgabenbereich</p>
          <p>Führerscheinklasse</p>
        </header>
        <Suspense fallback={<LoadingInfo label="Daten werden geladen" />}>
          <ErrorBoundary
            fallback={
              <p className="text-center text-dark-600 mt-10">
                Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später
                erneut.
              </p>
            }
          >
            <ul>
              {userRes.data?.length === 0 ? (
                <li className="text-center text-dark-600 mt-10">
                  <p>Es wurden leider keine Fahrzeuge gefunden.</p>
                </li>
              ) : (
                userRes.data?.map((user, key) => (
                  <li key={key} className="mb-5 last:mb-0">
                    <UserCard user={user} />
                  </li>
                ))
              )}
            </ul>
          </ErrorBoundary>
        </Suspense>
      </section>
    </div>
  )
}
