import React from 'react'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { g2Config, KeycloakProvider } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import {
  UserResetPasswordFormAutomated,
  UserResetPasswordFormAutomatedProps
} from './UserResetPasswordFormAutomated'
import { QueryClient, QueryClientProvider } from 'react-query'

export default {
  title: 'I2/UserResetPasswordForm',
  component: UserResetPasswordFormAutomated
} as Meta

const queryClient = new QueryClient()

export const UserResetPasswordFormAutomatedStory: Story<UserResetPasswordFormAutomatedProps> =
  (args: UserResetPasswordFormAutomatedProps) => {
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

const Following = (args: UserResetPasswordFormAutomatedProps) => {
  return <UserResetPasswordFormAutomated {...args} />
}

UserResetPasswordFormAutomatedStory.args = {
  userId: 'userId'
}

UserResetPasswordFormAutomatedStory.storyName = 'UserResetPasswordFormAutomated'
