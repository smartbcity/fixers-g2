import React, { useEffect } from 'react'
import { AppProvider as AruiAppProvider } from './AppProvider'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { Button } from '@smartb/g2-components'
import { Router as AruiRouter } from './Router'
import { PrivateRoute as AruiPrivateRoute } from './PrivateRoute'
import { NoMatchPage as AruiNoMatchPage } from './NoMatchPage'
import { Typography } from '@mui/material'
import { ArgsTable, Title, Primary, Description } from '@storybook/addon-docs'
import { CodeHighlighter } from '@smartb/g2-documentation'
import { LinkProps, Link, Route, useNavigate } from 'react-router-dom'
import { i18next, usei18next, reactQuery } from './docs'
import { QueryClient } from 'react-query'
import { G2Translations } from './G2Translations'

export default {
  title: 'Providers/AppProvider',
  component: AruiAppProvider,
  subcomponents: {
    Router: AruiRouter,
    PrivateRoute: AruiPrivateRoute,
    NoMatchPage: AruiNoMatchPage
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>AppProvider</Title>
          <Description>
            The appProvider manage the provider of the data storage module
            **react-query**, the translation module **i18next** and the router
            module **react-router**.
          </Description>
          <Description>
            All those modules are needed to create a complete modern
            application.
          </Description>
          <Primary />
          <ArgsTable components={{ AruiAppProvider: AruiAppProvider }} />
          <Description>
            To instanciate the i18next module you just have to pass the
            languages you want to be enabled in your application:
          </Description>
          <CodeHighlighter code={i18next} />
          <Description>
            With the default configuration of i18next you will have to save the
            json translation file in `public/locales/"your languages (example:
            fr)"/translation.json`.
          </Description>
          <Description>
            In G2 there is a default translation file with translations keys
            that you can found documented at the end of this page. To override
            the default translations you can write them with the same key in
            your local translation file or override the js object from the
            translation file in the initI18next.
          </Description>
          <Description>
            You can extends the `useI18n` hook to type i18n with your
            application languages:
          </Description>
          <CodeHighlighter code={usei18next} />
          <Description>
            For react-query instanciate a query client staticly. You can find
            all the options of the query client here:
            https://react-query.tanstack.com/reference/useQuery
          </Description>
          <CodeHighlighter code={reactQuery} />
          <Title>Router</Title>
          <Description>
            This component allow you to declare the routes you to be active in
            your application.
          </Description>
          <ArgsTable components={{ Router: AruiRouter }} />
          <Title>PrivateRoute</Title>
          <Description>
            This component allow you to declare a routes only accessible if the
            current user has one of the roles passed in the props.
          </Description>
          <Description>
            ⚠️ You need to have added the keycloak provider initialized on top
            of your application in order to have that component working.
          </Description>
          <ArgsTable components={{ PrivateRoute: AruiPrivateRoute }} />
          <Title>NoMatchPage</Title>
          <Description>
            This is the default component that the `Router` and the
            `PrivateRoute` are redirecting to when they can't reach the wanted
            one.
          </Description>
          <ArgsTable components={{ NoMatchPage: AruiNoMatchPage }} />
          <Title>G2 translations</Title>
          <CodeHighlighter object={G2Translations} />
        </>
      )
    }
  }
} as Meta

const queryClient = new QueryClient()

const Template: Story = () => {
  interface Languages {
    fr: string
    en: string
  }
  const languages: Languages = {
    fr: 'fr-FR',
    en: 'en-US'
  }
  return (
    <AruiAppProvider<Languages>
      languages={languages}
      loadingComponent={<Typography>Loading ...</Typography>}
      queryClient={queryClient}
    >
      <Router />
    </AruiAppProvider>
  )
}

const Router = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/')
  }, [])
  return (
    <AruiRouter>
      <Route
        path='/'
        key='hello'
        element={
          <>
            <Typography>/hello</Typography>
            <Button<LinkProps>
              component={Link}
              componentProps={{ to: '/world' }}
              variant='outlined'
            >
              Go to World
            </Button>
            <Button<LinkProps>
              component={Link}
              componentProps={{ to: '/nowhere' }}
              variant='outlined'
            >
              Go to nowhere
            </Button>
          </>
        }
      ></Route>
      <Route
        path='/world'
        key='world'
        element={
          <>
            <Typography>/world</Typography>
            <Button<LinkProps>
              component={Link}
              componentProps={{ to: '/' }}
              variant='outlined'
            >
              Go to Hello
            </Button>
            <Button<LinkProps>
              component={Link}
              componentProps={{ to: '/nowhere' }}
              variant='outlined'
            >
              Go to nowhere
            </Button>
          </>
        }
      ></Route>
    </AruiRouter>
  )
}

export const AppProvider = Template.bind({})

AppProvider.storyName = 'AppProvider'
AppProvider.id = 'AppProvider'
