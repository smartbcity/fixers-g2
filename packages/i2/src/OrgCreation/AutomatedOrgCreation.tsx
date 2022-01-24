import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo } from 'react'
import { request, useAsyncResponse } from 'utils'
import { Organization, OrgCreation, OrgCreationProps } from './OrgCreation'

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
    return request<Organization>({
      url: `${apiUrl}/getOrganization`,
      method: 'POST',
      body: JSON.stringify({
        organizationId: organizationId
      }),
      jwt: jwt
    })
  }, [apiUrl, jwt, organizationId])

  const { result, status } = useAsyncResponse(getOrganization, update)

  const organization = useMemo(() => {
    if (!result) return undefined
    return {
      ...result,
      image: `${apiUrl}/${organizationId}/getOrganizationImage`
    }
  }, [result, organizationId])

  const getInseeOrganization = useCallback(
    async (siret: string) => {
      return request<Partial<Organization>>({
        url: `${apiUrl}/getInseeOrganization`,
        method: 'POST',
        body: JSON.stringify({
          siret: siret
        }),
        jwt: jwt
      })
    },
    [apiUrl, jwt]
  )

  const updateOrganization = useCallback(
    async (organization: Organization) => {
      await request<Organization>({
        url: `${apiUrl}/updateOrganization`,
        method: 'POST',
        body: JSON.stringify(organization),
        jwt: jwt
      })
      submitted && submitted(organization)
    },
    [apiUrl, jwt, submitted, organizationId]
  )

  const createOrganization = useCallback(
    async (organization: Organization) => {
      await request<Organization>({
        url: `${apiUrl}/createOrganization`,
        method: 'POST',
        body: JSON.stringify(organization),
        jwt: jwt
      })
      submitted && submitted(organization)
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
