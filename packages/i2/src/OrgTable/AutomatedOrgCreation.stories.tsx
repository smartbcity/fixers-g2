import { Meta } from '@storybook/react'
import {
  AutomatedOrgTable,
  AutomatedOrgTableBasicProps as AutomatedOrgTableProps
} from './AutomatedOrgTable'
import { Story } from '@storybook/react/types-6-0'
import { KeycloakProvider, useAuth } from '@smartb/g2-providers'
import { Typography } from '@mui/material'

export default {
  title: 'I2/AutomatedOrgTable',
  component: AutomatedOrgTable
} as Meta

export const AutomatedOrgTableStory: Story<AutomatedOrgTableProps> = (
  args: AutomatedOrgTableProps
) => {
  return (
    <KeycloakProvider
      config={{
        clientId: 'admin-cli',
        realm: 'master',
        url: 'https://auth.smart-b.io/auth'
      }}
      loadingComponent={<Typography>Loading...</Typography>}
      initOptions={{ onLoad: 'login-required' }}
    >
      <Following {...args} />
    </KeycloakProvider>
  )
}

const Following = (args: AutomatedOrgTableProps) => {
  const { keycloak } = useAuth()
  if (!keycloak.authenticated) return <></>
  return <AutomatedOrgTable {...args} jwt={keycloak.token} />
}

AutomatedOrgTableStory.args = {
  apiUrl: 'http://localhost:9090'
}

AutomatedOrgTableStory.storyName = 'AutomatedOrgTable'
