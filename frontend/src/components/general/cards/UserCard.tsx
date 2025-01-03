import React from 'react'
import { User } from '@green-ecolution/backend-client'

interface UserCard {
  user: User
}

const UserCard: React.FC<UserCard> = ({ user }) => {
  return (
    <div className="bg-white border border-dark-50 p-6 rounded-xl shadow-cards flex flex-col gap-y-4 transition-all ease-in-out duration-300 hover:bg-green-dark-50 hover:border-green-dark lg:grid lg:grid-cols-[1fr,1.5fr,1fr,1fr] lg:items-center lg:gap-5 lg:py-10 xl:px-10">
      <p>@TODO: status</p>

      <h2 className="text-dark font-bold text-lg mb-0.5">
        {user.firstName} {user.lastName}
      </h2>

      <p className="text-dark-800">
        @TODO: role
      </p>

      <p className="text-dark-800">
        {user.drivingLicense ? user.drivingLicense : 'Keine Angabe'}
      </p>
    </div>
  )
}

export default UserCard
