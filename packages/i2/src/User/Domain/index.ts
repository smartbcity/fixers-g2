import { Roles } from '../../Commons'
import { OrganizationRef } from '../../Organization'

export const classes = `export interface UserCreationClasses {
  leftForm?: string
  rightForm?: string
  actionsContainer?: string
}`
export const styles = `export interface UserCreationStyles {
  leftForm?: React.CSSProperties
  rightForm?: React.CSSProperties
  actionsContainer?: React.CSSProperties
}`

export type UserId = string

export interface Address {
  street: string
  postalCode: string
  city: string
}

export interface User {
  id: UserId
  memberOf?: OrganizationRef
  familyName: string
  givenName: string
  address?: Address
  email: string
  roles: Roles
  phone?: string
  sendEmailLink?: boolean
}

export interface FlatUser {
  id: UserId
  memberOf?: string
  familyName: string
  givenName: string
  email: string
  roles: string[]
  phone?: string
  sendEmailLink?: boolean
  street?: string
  postalCode?: string
  city?: string
}

export const userToFlatUser = (user: User): FlatUser => {
  const flat: FlatUser & { address?: Address } = {
    ...user,
    street: user.address?.street,
    city: user.address?.city,
    postalCode: user.address?.postalCode,
    memberOf: user.memberOf?.id,
    roles: user.roles.assignedRoles
  }
  delete flat.address
  return flat
}

export const FlatUserToUser = (flat: FlatUser): User => {
  const user: User & {
    street?: string
    city?: string
    postalCode?: string
  } = {
    ...flat,
    address: {
      street: flat.street ?? '',
      city: flat.city ?? '',
      postalCode: flat.postalCode ?? ''
    },
    memberOf: {
      id: flat.memberOf ?? '',
      name: '',
      roles: []
    },
    roles: {
      assignedRoles: flat.roles,
      effectiveRoles: []
    }
  }
  delete user.street
  delete user.city
  delete user.postalCode
  return user
}

export interface UserGetAllQuery {
  name?: string
  role?: string
  page?: number
  size?: number
}

export interface UserGetAllQueryResult {
  users: User[]
  total: number
}

export interface UserResetPasswordCommand {
  id: UserId
  password: string
}

export interface UserResetPasswordResult {
  id: UserId
}
