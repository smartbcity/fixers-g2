import React, { useCallback } from 'react'
import {
  OrganizationFactory,
  OrganizationFactoryProps
} from './OrganizationFactory'
import { getInseeOrganization } from '../../Api'
import { useAuth, i2Config } from '@smartb/g2-providers'

export const AutomatedOrganizationFactory = (
  props: OrganizationFactoryProps
) => {
  const { keycloak } = useAuth()

  const getInseeOrganizationMemoized = useCallback(
    async (siret: string) => {
      return getInseeOrganization(siret, i2Config().orgUrl, keycloak.token)
    },
    [keycloak.token]
  )

  return (
    <OrganizationFactory
      getInseeOrganization={getInseeOrganizationMemoized}
      {...props}
    />
  )
}
