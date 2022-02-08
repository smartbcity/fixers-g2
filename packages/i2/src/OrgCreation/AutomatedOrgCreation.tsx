import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo } from 'react'
import { request, useAsyncResponse } from 'utils'
import {
  Command,
  Organization,
  OrganizationCreateCommand,
  OrganizationGetByIdQuery,
  OrganizationUpdateCommand
} from './types'
import { OrgCreation, OrgCreationProps } from './OrgCreation'

const commandBase: Command = {
  auth: {
    serverUrl: 'https://auth.smart-b.io/auth',
    realmId: 'master',
    clientId: 'admin-cli',
    redirectUrl: '',
    username: 'smartb',
    password: 'conorS'
  },
  realmId: 'test'
}

export interface AutomatedOrgCreationBasicProps extends BasicProps {
  /**
   * The api url where to make the locals api calls
   */
  apiUrl: string
  /**
   * The token to authorize the api calls
   */
  jwt?: string
  /**
   * Define whether the object is updated or created
   * @default false
   */
  update?: boolean
  /**
   * The current organization id. ⚠️ You have to provide it if `update` is true
   */
  organizationId?: string
  /**
   * The event called when the form is submitted. It is called regardless of it is a creation or an updation
   */
  submitted?: (organization: Organization) => void
}

export type AutomatedOrgCreationProps = MergeMuiElementProps<
  OrgCreationProps,
  AutomatedOrgCreationBasicProps
>

export const AutomatedOrgCreation = (props: AutomatedOrgCreationProps) => {
  const { apiUrl, jwt, update = false, submitted, organizationId } = props

  const getOrganization = useCallback(async () => {
    const res = await request<{ organization?: Organization }[]>({
      url: `${apiUrl}/getOrganization`,
      method: 'POST',
      body: JSON.stringify({
        id: organizationId,
        ...commandBase
      } as OrganizationGetByIdQuery),
      jwt: jwt
    })
    if (res) {
      return res[0]
    } else {
      return undefined
    }
  }, [apiUrl, jwt, organizationId])

  const { result, status } = useAsyncResponse(getOrganization, update)

  const organization = useMemo(() => {
    if (!result || !result.organization) return undefined
    return {
      ...result.organization,
      image: `${apiUrl}/${organizationId}/getOrganizationImage`
    }
  }, [result, organizationId])

  const getInseeOrganization = useCallback(
    async (siret: string) => {
      const res = await request<{ organization?: Organization }[]>({
        url: `${apiUrl}/getInseeOrganization`,
        method: 'POST',
        body: JSON.stringify({
          siret: siret
        }),
        jwt: jwt
      })
      if (res) {
        return res[0].organization
      } else {
        return undefined
      }
    },
    [apiUrl, jwt]
  )

  const updateOrganization = useCallback(
    async (organization: Organization) => {
      const res = await request<{ id: string }[]>({
        url: `${apiUrl}/updateOrganization`,
        method: 'POST',
        body: JSON.stringify({
          ...organization,
          ...commandBase
        } as OrganizationUpdateCommand),
        jwt: jwt
      })
      if (res) {
        submitted && submitted(organization)
        return true
      } else {
        return false
      }
    },
    [apiUrl, jwt, submitted, organizationId]
  )

  const createOrganization = useCallback(
    async (organization: Organization) => {
      const res = await request<{ id: string }[]>({
        url: `${apiUrl}/createOrganization`,
        method: 'POST',
        body: JSON.stringify({
          ...organization,
          ...commandBase
        } as OrganizationCreateCommand),
        jwt: jwt
      })
      if (res) {
        submitted && submitted({ ...organization, id: res[0].id })
        return true
      } else {
        return false
      }
    },
    [apiUrl, jwt, submitted]
  )

  if (update && status !== 'SUCCESS') return <></>
  return (
    <OrgCreation
      organization={organization}
      getInseeOrganization={getInseeOrganization}
      onSubmit={update ? updateOrganization : createOrganization}
      submitButtonLabel={update ? 'Mettre à jour' : 'Créer'}
    />
  )
}
