import React, { useCallback, useMemo } from 'react'
import { request, useAsyncResponse } from 'utils'
import { Organization, OrgCreation } from './OrgCreation'

export interface AutomatedOrgCreation {
  apiUrl: string
  jwt?: string
  update?: boolean
  submitted?: (organization: Organization) => void
}

export const AutomatedOrgCreation = (props: AutomatedOrgCreation) => {
  const { apiUrl, jwt, update = false, submitted } = props

  const getOrganization = useCallback(async () => {
    return request<Organization>({
      url: `${apiUrl}/getOrganization`,
      method: 'POST',
      jwt: jwt
    })
  }, [apiUrl, jwt])

  const { result, status } = useAsyncResponse(getOrganization, update)

  const organization = useMemo(() => {
    if (!result) return undefined
    return { ...result, image: `${apiUrl}/getOrganizationImage` }
  }, [result])

  const getInseeOrganization = useCallback(async () => {
    return request<Organization>({
      url: `${apiUrl}/getInseeOrganization`,
      method: 'POST',
      jwt: jwt
    })
  }, [apiUrl, jwt])

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
    [apiUrl, jwt, submitted]
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
