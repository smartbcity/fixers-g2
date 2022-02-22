import React from 'react'
import { Meta } from '@storybook/react'
import {
  AutomatedOrgFactory,
  AutomatedOrgFactoryBasicProps as AutomatedOrgFactoryProps
} from './AutomatedOrgFactory'
import { Story } from '@storybook/react/types-6-0'
import { KeycloakProvider, useAuth } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { useState } from 'react'

export default {
  title: 'I2/AutomatedOrgFactory',
  component: AutomatedOrgFactory
} as Meta

export const AutomatedOrgFactoryStory: Story<AutomatedOrgFactoryProps> = (
  args: AutomatedOrgFactoryProps
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

const Following = (args: AutomatedOrgFactoryProps) => {
  const [organizationId, setorganizationId] = useState<string | undefined>(
    'ec1a059a-b6de-4c17-9466-12e1dde4eff0'
  )
  const { keycloak } = useAuth()
  if (!keycloak.authenticated) return <></>
  return (
    <AutomatedOrgFactory
      submitted={(org) => setorganizationId(org.id)}
      organizationId={organizationId}
      update={!!organizationId}
      {...args}
      jwt={keycloak.token}
    />
  )
}

AutomatedOrgFactoryStory.args = {
  apiUrl: 'http://localhost:9090'
}

AutomatedOrgFactoryStory.storyName = 'AutomatedOrgFactory'
