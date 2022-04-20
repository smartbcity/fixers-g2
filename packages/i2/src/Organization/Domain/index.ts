import { Address, RoleType } from '../../Commons'

export const classes = `interface OrgCreationClasses {
  siretForm?: string
  leftForm?: string
  rightForm?: string
  dropPictureBox?: string
  actionsContainer?: string
  infoPopover?: string
}`
export const styles = `interface OrgCreationStyles {
  siretForm?: React.CSSProperties
  leftForm?: React.CSSProperties
  rightForm?: React.CSSProperties
  dropPictureBox?: React.CSSProperties
  actionsContainer?: React.CSSProperties
  infoPopover?: React.CSSProperties
}`

export type OrganizationId = string

export interface Organization {
  id: OrganizationId
  siret: string
  name: string
  roles: RoleType[]
  description?: string
  website?: string
  address?: Address
  image?: string
}

export interface FlatOrganization {
  id: OrganizationId
  siret: string
  name: string
  roles: string[]
  description?: string
  website?: string
  image?: string
  street?: string
  postalCode?: string
  city?: string
}

export type OrganizationCreateCommand = Organization
export type OrganizationUpdateCommand = Organization

export type OrganizationGetAllQuery = {
  search?: string
  page: number
  size: number
}

export type OrganizationGetByIdQuery = {
  id: OrganizationId
}

export const organizationToFlatOrganization = (
  org: Organization
): FlatOrganization => {
  const flat: FlatOrganization & { address?: Address } = {
    ...org,
    street: org.address?.street,
    city: org.address?.city,
    postalCode: org.address?.postalCode,
    roles: org.roles
  }
  delete flat.address
  return flat
}

export const flatOrganizationToOrganization = (
  flat: FlatOrganization
): Organization => {
  const org: Organization & {
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
    roles: flat.roles
  }
  delete org.street
  delete org.city
  delete org.postalCode
  return org
}
