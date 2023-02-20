import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import { MyProfile } from './MyProfile'
import { Story } from '@storybook/react/types-6-0'
import { g2Config, KeycloakProvider } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AutomatedUserFactoryProps } from '../UserFactory'

export default {
  title: 'I2V2/MyProfile',
  component: MyProfile
} as Meta

const queryClient = new QueryClient()

export const MyProfileStory: Story<AutomatedUserFactoryProps> = (
  args: AutomatedUserFactoryProps
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

const Following = (args: AutomatedUserFactoryProps) => {
  return <MyProfile readonly {...args} />
}

MyProfileStory.args = {}

MyProfileStory.storyName = 'MyProfile'
