import React from 'react'
import { User } from '@green-ecolution/backend-client'

interface UserCard {
  user: User
}

const UserCard: React.FC<UserCard> = ({ user }) => {
  return (
    <div className="bg-white border border-dark-50 p-6 rounded-xl shadow-cards flex flex-col gap-y-4 lg:py-4 lg:grid lg:grid-cols-[1fr,1.5fr,1fr,1fr] lg:items-center lg:gap-5 xl:px-10">
      <p>@TODO: status</p>

      <h2 className="text-dark font-bold text-md mb-0.5">
        {user.firstName} {user.lastName}
      </h2>

      <p className="text-dark-800">
        <span className="lg:sr-only">Aufgabenbereich:&nbsp;</span>
        @TODO: role
      </p>

      <p className="text-dark-800">
        <span className="lg:sr-only">Führerscheinklasse:&nbsp;</span>
        {user.drivingLicense ? user.drivingLicense : 'Keine Angabe'}
      </p>
    </div>
  )
}

export default UserCard
