import { User } from './user.interface'

export interface CallHelp {
  id: number
  status: string
  description: string
  message: string
  user: User
  isActive: boolean
  createdAt: string
  updatedAt: string
}
