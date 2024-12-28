import { UserStatus } from "@/hooks/useDetailsForUserStatus"

export interface User {
  id: number
  name: string
  availability: UserStatus
  role: string
}