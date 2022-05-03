import React from 'react'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { KeycloakProvider, useAuth } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import {
  UserResetPasswordFormAutomated,
  UserResetPasswordFormAutomatedProps
} from './UserResetPasswordFormAutomated'
import { I2ConfigBuilder } from '../../../Config'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useResetUserPassword } from '../../Api'

export default {
  title: 'I2/UserResetPasswordForm',
  component: UserResetPasswordFormAutomated
} as Meta

I2ConfigBuilder({
  orgUrl: 'http://localhost:8002',
  userUrl: 'http://localhost:8002',
  keycloak: {
    clientId: 'admin-cli',
    realm: 'test',
    url: 'https://auth.smart-b.io/auth'
  }
})

const queryClient = new QueryClient()

export const UserResetPasswordFormAutomatedStory: Story<UserResetPasswordFormAutomatedProps> =
  (args: UserResetPasswordFormAutomatedProps) => {
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

const Following = (args: UserResetPasswordFormAutomatedProps) => {
  const { keycloak } = useAuth()

  if (!keycloak.authenticated) return <></>
  return <UserResetPasswordFormAutomated {...args} jwt={keycloak.token} />
}

UserResetPasswordFormAutomatedStory.args = {
  userId: 'userId',
  apiUrl: 'http://localhost:8002'
}

UserResetPasswordFormAutomatedStory.storyName = 'UserResetPasswordFormAutomated'
