import React from 'react'
import { Meta } from '@storybook/react'
import {
  AutomatedOrgCreation,
  AutomatedOrgCreationBasicProps as AutomatedOrgCreationProps
} from './AutomatedOrgCreation'
import { Story } from '@storybook/react/types-6-0'
import { KeycloakProvider, useAuth } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { useState } from 'react'

export default {
  title: 'I2/AutomatedOrgCreation',
  component: AutomatedOrgCreation
} as Meta

export const AutomatedOrgCreationStory: Story<AutomatedOrgCreationProps> = (
  args: AutomatedOrgCreationProps
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

const Following = (args: AutomatedOrgCreationProps) => {
  const [organizationId, setorganizationId] = useState<string | undefined>(
    'ec1a059a-b6de-4c17-9466-12e1dde4eff0'
  )
  const { keycloak } = useAuth()
  if (!keycloak.authenticated) return <></>
  return (
    <AutomatedOrgCreation
      submitted={(org) => setorganizationId(org.id)}
      organizationId={organizationId}
      update={!!organizationId}
      {...args}
      jwt={keycloak.token}
    />
  )
}

AutomatedOrgCreationStory.args = {
  apiUrl: 'http://localhost:9090'
}

AutomatedOrgCreationStory.storyName = 'AutomatedOrgCreation'
