import React from 'react'
import { Meta } from '@storybook/react'
import {
  AutomatedUserTable,
  AutomatedUserTableProps
} from './AutomatedUserTable'
import { Story } from '@storybook/react/types-6-0'
import { KeycloakProvider, useAuth } from '@smartb/g2-providers'
import { Typography } from '@mui/material'

export default {
  title: 'I2/UserTable',
  component: AutomatedUserTable
} as Meta

export const AutomatedUserTableStory: Story<AutomatedUserTableProps> = (
  args: AutomatedUserTableProps
) => {
  return (
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
  )
}

const Following = (args: AutomatedUserTableProps) => {
  const { keycloak } = useAuth()
  if (!keycloak.authenticated) return <></>
  return <AutomatedUserTable {...args} jwt={keycloak.token} />
}

AutomatedUserTableStory.args = {
  apiUrl: 'http://localhost:8002'
}

AutomatedUserTableStory.storyName = 'AutomatedUserTable'
