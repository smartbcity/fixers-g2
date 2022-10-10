import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import {
  AutomatedOrganizationFactory,
  AutomatedOrganizationFactoryBasicProps as AutomatedOrganizationFactoryProps
} from './AutomatedOrganizationFactory'
import { Story } from '@storybook/react/types-6-0'
import { g2Config, KeycloakProvider } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'

export default {
  title: 'I2-V2/AutomatedOrganizationFactory',
  component: AutomatedOrganizationFactory
} as Meta

const queryClient = new QueryClient()

export const AutomatedOrganizationFactoryStory: Story<
  AutomatedOrganizationFactoryProps
> = (args: AutomatedOrganizationFactoryProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <KeycloakProvider
        config={g2Config().keycloak}
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
  return (
    <AutomatedOrganizationFactory
      createOrganizationOptions={{
        onSuccess: (data) => {
          setOrganizationId(data.id)
        }
      }}
      organizationId={organizationId}
      update={!!organizationId}
      {...args}
    />
  )
}

AutomatedOrganizationFactoryStory.args = {}

AutomatedOrganizationFactoryStory.storyName = 'AutomatedOrganizationFactory'
