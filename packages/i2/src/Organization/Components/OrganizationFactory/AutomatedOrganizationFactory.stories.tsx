import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import {
  AutomatedOrganizationFactory,
  AutomatedOrganizationFactoryBasicProps as AutomatedOrganizationFactoryProps
} from './AutomatedOrganizationFactory'
import { Story } from '@storybook/react/types-6-0'
import { KeycloakProvider, useAuth } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  useCreateOrganization,
  useGetOrganization,
  useUpdateOrganization
} from '../../Api'

export default {
  title: 'I2/OrganizationFactory',
  component: AutomatedOrganizationFactory
} as Meta

const queryClient = new QueryClient()

export const AutomatedOrganizationFactoryStory: Story<AutomatedOrganizationFactoryProps> =
  (args: AutomatedOrganizationFactoryProps) => {
    return (
      <QueryClientProvider client={queryClient}>
        <KeycloakProvider
          config={{
            clientId: 'admin-cli',
            realm: 'test',
            url: 'https://auth.smart-b.io/auth'
          }}
          loadingComponent={<Typography>Loading...</Typography>}
          initOptions={{ onLoad: 'login-required' }}
        >
          <Following {...args} />
        </KeycloakProvider>
      </QueryClientProvider>
    )
  }

const Following = (args: AutomatedOrganizationFactoryProps) => {
  const [organizationId, setOrganizationId] = useState<string | undefined>()
  const { keycloak } = useAuth()

  const getOrganization = useGetOrganization({
    apiUrl: 'http://localhost:8002',
    organizationId: organizationId,
    jwt: keycloak.token
  })

  const updateOrganization = useUpdateOrganization({
    apiUrl: 'http://localhost:8002',
    jwt: keycloak.token
  })

  const createOrganization = useCreateOrganization({
    apiUrl: 'http://localhost:8002',
    jwt: keycloak.token,
    options: {
      onSuccess: (data) => {
        setOrganizationId(data.id)
      }
    }
  })

  if (!keycloak.authenticated) return <></>
  return (
    <AutomatedOrganizationFactory
      getOrganization={getOrganization}
      updateOrganization={updateOrganization}
      createOrganization={createOrganization}
      update={!!organizationId}
      {...args}
      jwt={keycloak.token}
    />
  )
}

AutomatedOrganizationFactoryStory.args = {
  apiUrl: 'http://localhost:8002'
}

AutomatedOrganizationFactoryStory.storyName = 'AutomatedOrganizationFactory'
