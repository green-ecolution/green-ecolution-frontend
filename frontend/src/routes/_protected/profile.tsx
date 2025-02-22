import { createFileRoute } from '@tanstack/react-router'
import useStore from '@/store/store'
import { UserRound } from 'lucide-react'
import {
  getUserRoleDetails,
  getUserStatusDetails,
} from '@/hooks/details/useDetailsForUser'

export const Route = createFileRoute('/_protected/profile')({
  component: Sensors,
  meta: () => [{ title: 'Profil' }],
})

function Sensors() {
  const user = useStore((state) => state.user)
  const roleDetails = getUserRoleDetails(user.userRoles)

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Profil von {user.firstName} {user.lastName}
        </h1>
        <p>
          Dies ist Ihre persönliche Profilseite. Auf dieser Seite finden Sie
          Ihre persönlichen Daten sowie Ihre Berechtigungsstufe.{' '}
        </p>
      </article>

      <section className="mt-16 grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-x-11">
        <div className="flex items-center gap-x-6">
          <div className="w-32 h-32 bg-dark-200 rounded-full flex items-center justify-center 2xl:w-48 2xl:h-48">
            <UserRound className="text-white w-12 h-12 2xl:w-16 2xl:h-16" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-lato xl:text-2xl">
              {user.firstName} {user.lastName}
            </h2>
            <ul className="mt-2 flex flex-col gap-2 xl:mt-4">
              {roleDetails?.length > 0 &&
                roleDetails.map((role, index) => (
                  <li
                    key={index}
                    className="border w-fit border-green-light px-3 py-2 rounded-full text-dark-800 font-medium text-sm"
                  >
                    {role.label}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <dl className="mt-10 text-lg md:grid md:grid-cols-2 md:gap-x-11 lg:mt-16">
        <div>
          <div className="pb-4 border-b border-b-dark-200">
            <dt className="font-bold inline">Username:</dt>
            <dd className="sm:inline sm:px-2">
              {user.username ?? 'Keine Angabe'}
            </dd>
          </div>
          <div className="py-4 border-b border-b-dark-200">
            <dt className="font-bold sm:inline">Vorname:</dt>
            <dd className="sm:inline sm:px-2">
              {user.firstName ?? 'Keine Angabe'}
            </dd>
          </div>
          <div className="py-4 border-b border-b-dark-200">
            <dt className="font-bold sm:inline">Nachname:</dt>
            <dd className="sm:inline sm:px-2">
              {user.lastName ?? 'Keine Angabe'}
            </dd>
          </div>
          <div className="py-4 border-b border-b-dark-200 md:border-b-transparent">
            <dt className="font-bold sm:inline">E-Mail:</dt>
            <dd className="sm:inline sm:px-2">
              {user.email ?? 'Keine Angabe'}
            </dd>
          </div>
        </div>

        <div>
          <div className="py-4 border-b border-b-dark-200">
            <dt className="font-bold sm:inline">Verfügbarkeit:</dt>
            <dd className="sm:inline sm:px-2">
              {getUserStatusDetails(user.status).label}
            </dd>
          </div>
          <div className="py-4 border-b border-b-dark-200">
            <dt className="font-bold sm:inline">Führerscheinklasse:</dt>
            <dd className="sm:inline sm:px-2">
              {user.drivingLicense && user.drivingLicense !== '-'
                ? user.drivingLicense
                : 'Keine Angabe'}
            </dd>
          </div>
          <div className="py-4 border-b border-b-dark-200 md:border-b-transparent">
            <dt className="font-bold sm:inline">Rollen:</dt>
            <dd className="sm:inline sm:px-2">
              {roleDetails.map((role, index) => (
                <span key={index}>
                  {role.label}
                  {index < roleDetails.length - 1 ? ', ' : ''}
                </span>
              ))}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  )
}
