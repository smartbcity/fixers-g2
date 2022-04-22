import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import {
  AutomatedUserTable,
  AutomatedUserTableProps
} from './AutomatedUserTable'
import { Story } from '@storybook/react/types-6-0'
import { KeycloakProvider, useAuth } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { useGetUsers } from '../../Api'
import { UserTableFilters } from '../..'
import { QueryClient, QueryClientProvider } from 'react-query'

export default {
  title: 'I2/UserTable',
  component: AutomatedUserTable
} as Meta

const queryClient = new QueryClient()

export const AutomatedUserTableStory: Story<AutomatedUserTableProps> = (
  args: AutomatedUserTableProps
) => {
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

const Following = (args: AutomatedUserTableProps) => {
  const { keycloak } = useAuth()
  const [queryParams, setQueryParams] = useState<UserTableFilters | undefined>()

  const getUsers = useGetUsers({
    apiUrl: 'http://localhost:8002',
    jwt: keycloak.token,
    queryParams: queryParams
  })
  if (!keycloak.authenticated) return <></>
  return (
    <AutomatedUserTable
      getUsers={getUsers}
      {...args}
      onSubmitFilters={setQueryParams}
    />
  )
}

AutomatedUserTableStory.args = {}

AutomatedUserTableStory.storyName = 'AutomatedUserTable'
