import React from 'react'
import { Meta } from '@storybook/react'
import {
  AutomatedOrganizationTable,
  AutomatedOrganizationTableBasicProps as AutomatedOrganizationTableProps
} from './AutomatedOrganizationTable'
import { Story } from '@storybook/react/types-6-0'
import { KeycloakProvider, useAuth } from '@smartb/g2-providers'
import { Typography } from '@mui/material'

export default {
  title: 'I2/OrganizationTable',
  component: AutomatedOrganizationTable
} as Meta

export const AutomatedOrganizationTableStory: Story<AutomatedOrganizationTableProps> =
  (args: AutomatedOrganizationTableProps) => {
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

const Following = (args: AutomatedOrganizationTableProps) => {
  const { keycloak } = useAuth()
  if (!keycloak.authenticated) return <></>
  return <AutomatedOrganizationTable {...args} jwt={keycloak.token} />
}

AutomatedOrganizationTableStory.args = {
  apiUrl: 'http://localhost:8002'
}

AutomatedOrganizationTableStory.storyName = 'AutomatedOrganizationTable'
