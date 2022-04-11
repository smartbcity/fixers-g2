import React from 'react'
import { Meta } from '@storybook/react'
import {
  AutomatedOrganizationFactory,
  AutomatedOrganizationFactoryBasicProps as AutomatedOrganizationFactoryProps
} from './AutomatedOrganizationFactory'
import { Story } from '@storybook/react/types-6-0'
import { KeycloakProvider, useAuth } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { useState } from 'react'

export default {
  title: 'I2/AutomatedOrganizationFactory',
  component: AutomatedOrganizationFactory
} as Meta

export const AutomatedOrganizationFactoryStory: Story<AutomatedOrganizationFactoryProps> =
  (args: AutomatedOrganizationFactoryProps) => {
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

const Following = (args: AutomatedOrganizationFactoryProps) => {
  const [organizationId, setOrganizationId] = useState<string | undefined>(
    'ec1a059a-b6de-4c17-9466-12e1dde4eff0'
  )
  const { keycloak } = useAuth()
  if (!keycloak.authenticated) return <></>
  return (
    <AutomatedOrganizationFactory
      submitted={(org) => setOrganizationId(org.id)}
      organizationId={organizationId}
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
