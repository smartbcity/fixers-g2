import React from 'react'
import { KeycloakProvider as AruiKeycloakProvider } from './KeycloakProvider'
import { Meta, StoryFn } from '@storybook/react'
import { useAuth, KeycloackService, AuthedUser } from './useAuth'
import { Button } from '@smartb/g2-components'
import { Link, Typography } from '@mui/material'
import {
  ArgsTable,
  PRIMARY_STORY,
  Subtitle,
  Primary,
  Description
} from '@storybook/addon-docs'
import { CodeHighlighter } from '@smartb/g2-documentation'
import {
  localUseAuth,
  staticUseAuth,
  keycloakConfig,
  informRoles,
  checkRoles
} from './docs'

export default {
  title: 'Providers/KeycloakProvider',
  component: AruiKeycloakProvider,
  parameters: {
    docs: {
      page: () => (
        <>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Typography
            variant='body2'
            style={{ margin: '5px', marginBottom: '20px' }}
          >
            -{' '}
            <Link
              color='#0000ee'
              href='https://github.com/keycloak/keycloak-documentation/blob/master/securing_apps/topics/oidc/javascript-adapter.adoc'
            >
              Keycloak init options
            </Link>
          </Typography>
          <Subtitle>The hook useAuth</Subtitle>
          <Description>
            This hook allow you to have access of the keyclaok instance and
            utility functions. You can statically extends the autService like
            so:
          </Description>
          <CodeHighlighter code={staticUseAuth} />
          <Description>
            Keycloak instance will be automatically injected to every extending
            functions. ⚠️ You have to inform the hook about the return type
            `ReturnType` of the function and the prameters type `ParamsType`. To
            dynamically extends the authService you can do it like so:
          </Description>
          <CodeHighlighter code={localUseAuth} />
          <Description>
            The authService contains already 2 functions. One for verifying if
            the current user has the wanted roles `isAuthorized` and another one
            to get the current user id `getUserId`.
          </Description>
          <Description>
            You can inform the roles by giving a type to the useAuth hook. ⚠️
            Your additional services should be inform of those roles as well:
          </Description>
          <CodeHighlighter code={informRoles} />
          <Description>
            in return you will get few services that will allow you to check the
            role of the current user.
          </Description>
          <CodeHighlighter code={checkRoles} />
        </>
      )
    }
  },
  argTypes: {
    config: {
      table: {
        type: {
          summary: 'KeycloakConfig',
          detail: keycloakConfig
        }
      }
    }
  }
} as Meta

export const KeycloakProvider: StoryFn = () => {
  return (
    <AruiKeycloakProvider>
      <ConnectButton />
    </AruiKeycloakProvider>
  )
}

type Roles = 'admin' | 'user'

const roles: Roles[] = ['admin', 'user']

type StaticServices = {
  getRoles: { returnType: Roles[] | undefined; paramsType: { test: boolean } }
}

const staticServices: KeycloackService<StaticServices, Roles> = {
  getRoles: (keycloak) => {
    return keycloak.tokenParsed?.realm_access?.roles
  }
}

function MyObject() {
  // Initialize properties specific to each instance here
}

MyObject.prototype.canUploadInvoice = (
  authedUser: AuthedUser,
  str: string,
  arr: any[]
) => true
MyObject.prototype.canCancelOrder = (authedUser: AuthedUser, str: string) =>
  true
//We creating an object with oy a prototype to imitate the policie coming from the back
const orderPolicies = new MyObject()

const policies = {
  orderPolicies
}

const useExtendedAuth = () => {
  return useAuth<StaticServices, Roles, typeof policies>(
    roles,
    staticServices,
    policies
  )
}

const ConnectButton = () => {
  const { keycloak, policies } = useExtendedAuth()

  console.log(policies)
  if (keycloak.isAuthenticated) {
    return (
      <>
        <Typography>
          The token you received from the authentication server:
        </Typography>
        <CodeHighlighter object={keycloak.tokenParsed} />
        <Button onClick={() => keycloak.logout()}>
          Disconnect from Smartb
        </Button>
      </>
    )
  }
  return <Button onClick={() => keycloak.login()}>Connect with Smartb</Button>
}

KeycloakProvider.storyName = 'KeycloakProvider'
