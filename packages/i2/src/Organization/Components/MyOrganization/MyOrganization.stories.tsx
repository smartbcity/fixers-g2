import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import { MyOrganization } from './MyOrganization'
import { Story } from '@storybook/react/types-6-0'
import { g2Config, KeycloakProvider } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AutomatedOrganizationFactoryProps } from '../OrganizationFactory'

export default {
  title: 'I2/MyOrganization',
  component: MyOrganization
} as Meta

const queryClient = new QueryClient()

export const MyOrganizationStory: Story<AutomatedOrganizationFactoryProps> = (
  args: AutomatedOrganizationFactoryProps
) => {
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
  return <MyOrganization {...args} />
}

MyOrganizationStory.args = {}

MyOrganizationStory.storyName = 'MyOrganization'
