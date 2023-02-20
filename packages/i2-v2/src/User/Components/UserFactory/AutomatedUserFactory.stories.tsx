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
import { Button } from '@smartb/g2-components'
import { useUserFormState } from './useUserFormState'

export default {
  title: 'I2V2/AutomatedUserFactory',
  component: AutomatedUserFactory
} as Meta

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

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
  const [userId, setuserId] = useState<string | undefined>('1')

  const userFormState = useUserFormState({
    createUserOptions: {
      onSuccess: (data) => {
        setuserId(data?.id)
      }
    },
    userId: userId,
    update: !!userId,
    organizationId: '1',
    roles: ['admin']
  })

  return (
    <>
      <AutomatedUserFactory
        update={!!userId}
        organizationId={'1'}
        fieldsOverride={{
          memberOf: {
            params: {
              options: [
                {
                  key: '1',
                  label: 'Organization 1'
                }
              ]
            }
          },
          roles: {
            params: {
              options: [
                {
                  key: 'admin',
                  label: 'admin'
                },
                {
                  key: 'user',
                  label: 'user'
                }
              ]
            }
          }
        }}
        resetPasswordType='forced'
        {...userFormState}
        {...args}
        userId={userId}
      />
      <Button onClick={userFormState.formState.submitForm}>Validate</Button>
    </>
  )
}

AutomatedUserFactoryStory.args = {}

AutomatedUserFactoryStory.storyName = 'AutomatedUserFactory'
