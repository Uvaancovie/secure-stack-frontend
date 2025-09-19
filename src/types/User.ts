export type Role = 'customer' | 'admin'

export interface User {
  _id: string
  role: Role
  fullName: string
  username: string
}

export interface User {
  _id: string
  role: 'customer' | 'admin'
  fullName: string
  username: string
}

export type { User as IUser }
