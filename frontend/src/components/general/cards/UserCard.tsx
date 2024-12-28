import Pill from '@/components/general/Pill'
import React from 'react'
import { User } from '@/components/general/User'
import {
  getUserStatusDetails,
  UserStatus,
} from '@/hooks/useDetailsForUserStatus'
import GeneralLink from '../links/GeneralLink'

interface UserCard {
  user: User
}

const UserCard: React.FC<UserCard> = ({ user }) => {
  const statusDetails = getUserStatusDetails(user.availability)

  return (
    <div className="bg-white border border-dark-50 p-6 rounded-xl shadow-cards flex flex-col gap-y-4 transition-all ease-in-out duration-300 hover:bg-green-dark-50 hover:border-green-dark lg:grid lg:grid-cols-4 lg:items-center lg:gap-5 lg:py-10 xl:px-10">
      <Pill
        label={statusDetails?.label ?? 'Keine Angabe'}
        theme={statusDetails?.color ?? 'dark-400'}
      />

      <div>
        <h2 className="text-dark font-bold text-lg mb-0.5">{user.name}</h2>
      </div>

      <p className="text-dark-800">{user.role}</p>

      {statusDetails?.value == UserStatus.OnDuty && (
        <div className="ml-auto">
          <GeneralLink
            label="Zum Einsatzplan"
            link={{
              to: '/team', // TODO: link to linked watering plan
            }}
          />
        </div>
      )}
    </div>
  )
}

export default UserCard
