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

type organizationId = string

export interface User {
  id: string
  memberOf: organizationId
  familyName: string
  givenName: string
  address: Address
  mail: string
  phone?: string
  password?: string
  sendEmailLink?: boolean
}

export interface Address {
  street: string
  postalCode: string
  city: string
}

export interface FlatUser {
  id: string
  memberOf: organizationId
  familyName: string
  givenName: string
  mail: string
  phone?: string
  password?: string
  sendEmailLink?: boolean
  street: string
  postalCode: string
  city: string
}

export const userToFlatUser = (user: User): FlatUser => {
  const flat: FlatUser & { address?: Address } = {
    ...user,
    street: user.address.street,
    city: user.address.city,
    postalCode: user.address.postalCode
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
      street: flat.street,
      city: flat.city,
      postalCode: flat.postalCode
    }
  }
  delete user.street
  delete user.city
  delete user.postalCode
  return user
}
