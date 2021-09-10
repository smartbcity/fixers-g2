import React, { useEffect } from 'react'
import { AppProvider as AruiAppProvider } from './AppProvider'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { Button } from '@smartb/g2-components'
import { Router as AruiRouter } from './Router'
import { PrivateRoute as AruiPrivateRoute } from './PrivateRoute'
import { NoMatchPage as AruiNoMatchPage } from './NoMatchPage'
import { Typography } from '@material-ui/core'
import { ArgsTable, Title, Primary, Description } from '@storybook/addon-docs'
import { CodeHighlighter } from '@smartb/g2-documentation'
import initRedux from './store'
import { Route, useHistory } from 'react-router'
import { LinkProps, Link } from 'react-router-dom'
import { i18next, usei18next, redux } from './docs'

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
            **redux**, the translation module **i18next** and the router module
            **react-router**.
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
            fr)"/translation.json`
          </Description>
          <Description>
            You can extends the `useI18n` hook to type i18n with your
            application languages:
          </Description>
          <CodeHighlighter code={usei18next} />
          <Description>
            To instanciate the redux store and to get the State type in your
            application you have to call statically the `initRedux` function in
            your application:
          </Description>
          <CodeHighlighter code={redux} />
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
        </>
      )
    }
  }
} as Meta

const Template: Story = () => {
  interface Languages {
    fr: string
    en: string
  }
  const languages: Languages = {
    fr: 'fr-FR',
    en: 'en-US'
  }
  const { store, history } = initRedux()
  return (
    <AruiAppProvider<Languages>
      languages={languages}
      loadingComponent={<Typography>Loading ...</Typography>}
      reduxStore={store}
      history={history}
    >
      <Router />
    </AruiAppProvider>
  )
}

const Router = () => {
  const history = useHistory()
  useEffect(() => {
    history.push('/')
  }, [])
  return (
    <AruiRouter>
      <Route exact path='/' key='hello'>
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
      </Route>
      <Route exact path='/world' key='world'>
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
      </Route>
    </AruiRouter>
  )
}

export const AppProvider = Template.bind({})

AppProvider.storyName = 'AppProvider'
AppProvider.id = 'AppProvider'
