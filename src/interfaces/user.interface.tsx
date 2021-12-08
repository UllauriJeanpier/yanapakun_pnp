export interface User {
  id: number
  email: string
  password: string
  roles: string[]
  isActive: boolean
  notificationToken: string
  callsHelp: []
  profile: Profile
  currentHashedRefreshToken: string
  createdAt: string
  updatedAt: string
}

export interface Profile {
  id: number
  firstName: string
  lastName: string
  age: number
  document: string
  district: string
  phone: string
  emergencyNumber: string
  photo: any
  gender: string
  dateBirth: string
  latitude: number
  longitude: number
}
