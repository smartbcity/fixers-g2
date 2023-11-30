import { ReduxProvider as AruiReduxProvider } from './ReduxProvider'
import { Meta, StoryFn } from '@storybook/react'
import { ArgsTable, Title, Primary, Description } from '@storybook/addon-docs'
import { CodeHighlighter } from '@smartb/g2-documentation'
import initRedux from './store'
import { redux } from './docs'

export default {
  title: 'Providers/ReduxProvider',
  component: AruiReduxProvider,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>ReduxProvider</Title>
          <Description>
            To instanciate the redux store and to get the State type in your
            application you have to call statically the `initRedux` function in
            your application:
          </Description>
          <CodeHighlighter code={redux} />
          <Primary />
          <ArgsTable components={{ AruiReduxProvider: AruiReduxProvider }} />
        </>
      )
    }
  }
} as Meta

export const ReduxProvider: StoryFn = () => {
  const { store } = initRedux()
  return <AruiReduxProvider reduxStore={store}></AruiReduxProvider>
}

ReduxProvider.storyName = 'ReduxProvider'
