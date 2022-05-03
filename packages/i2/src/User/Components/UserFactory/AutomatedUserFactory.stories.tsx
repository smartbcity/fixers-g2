import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import {
  AutomatedUserFactory,
  AutomatedUserFactoryBasicProps as AutomatedUserFactoryProps
} from './AutomatedUserFactory'
import { Story } from '@storybook/react/types-6-0'
import { KeycloakProvider, useAuth } from '@smartb/g2-providers'
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
    </QueryClientProvider>
  )
}

const Following = (args: AutomatedUserFactoryProps) => {
  const [userId, setuserId] = useState<string | undefined>(undefined)
  const { keycloak } = useAuth()

  if (!keycloak.authenticated) return <></>
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
      jwt={keycloak.token}
    />
  )
}

AutomatedUserFactoryStory.args = {
  apiUrl: 'http://localhost:8002'
}

AutomatedUserFactoryStory.storyName = 'AutomatedUserFactory'
