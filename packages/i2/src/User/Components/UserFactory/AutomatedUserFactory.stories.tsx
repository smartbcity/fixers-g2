import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import {
  AutomatedUserFactory,
  AutomatedUserFactoryBasicProps as AutomatedUserFactoryProps
} from './AutomatedUserFactory'
import { Story } from '@storybook/react/types-6-0'
import { g2Config, KeycloakProvider } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'

export default {
  title: 'I2/UserFactory',
  component: AutomatedUserFactory
} as Meta

const queryClient = new QueryClient()

export const AutomatedUserFactoryStory: Story<AutomatedUserFactoryProps> = (
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
  const [userId, setuserId] = useState<string | undefined>(undefined)

  return (
    <AutomatedUserFactory
      update={!!userId}
      createUserOptions={{
        onSuccess: (data) => {
          setuserId(data.id)
        }
      }}
      {...args}
      userId={userId}
    />
  )
}

AutomatedUserFactoryStory.args = {}

AutomatedUserFactoryStory.storyName = 'AutomatedUserFactory'
