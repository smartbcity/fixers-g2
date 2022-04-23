import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import {
  AutomatedOrganizationTable,
  AutomatedOrganizationTableBasicProps as AutomatedOrganizationTableProps
} from './AutomatedOrganizationTable'
import { Story } from '@storybook/react/types-6-0'
import { KeycloakProvider, useAuth } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { useGetOrganizations } from '../../Api'
import { QueryClient, QueryClientProvider } from 'react-query'
import { OrganizationTableFilters } from './OrganizationTable'

export default {
  title: 'I2/OrganizationTable',
  component: AutomatedOrganizationTable
} as Meta

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000000
    }
  }
})

export const AutomatedOrganizationTableStory: Story<AutomatedOrganizationTableProps> =
  (args: AutomatedOrganizationTableProps) => {
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

const Following = (args: AutomatedOrganizationTableProps) => {
  const { keycloak } = useAuth()
  const [queryParams, setQueryParams] = useState<
    OrganizationTableFilters | undefined
  >()

  const getOrganizations = useGetOrganizations({
    apiUrl: 'http://localhost:8002',
    jwt: keycloak.token,
    queryParams: queryParams
  })

  if (!keycloak.authenticated) return <></>
  return (
    <AutomatedOrganizationTable
      getOrganizations={getOrganizations}
      onSubmitFilters={setQueryParams}
      {...args}
    />
  )
}

AutomatedOrganizationTableStory.args = {}

AutomatedOrganizationTableStory.storyName = 'AutomatedOrganizationTable'
