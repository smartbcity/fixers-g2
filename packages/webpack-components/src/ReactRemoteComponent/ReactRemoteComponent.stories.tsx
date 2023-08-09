import React from 'react'
import {
  ReactRemoteComponent as AruiReactRemoteComponent,
  ReactRemoteComponentProps
} from './ReactRemoteComponent'
import { Meta, StoryFn } from '@storybook/react'
import { Title, Primary, Description } from '@storybook/addon-docs'

export default {
  title: 'WebpackComponents/ReactRemoteComponent',
  component: AruiReactRemoteComponent,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>ReactRemoteComponent</Title>
          <Description>
            A component that can import and run a module exported from webpack.
          </Description>
          <Primary />
          <Description>
            You have to provide the url of the script, the name of the module
            and the dependencies to start using it
          </Description>
        </>
      )
    }
  }
} as Meta

export const ReactRemoteComponent: StoryFn<ReactRemoteComponentProps> = (
  args: ReactRemoteComponentProps
) => {
  return <AruiReactRemoteComponent {...args} />
}

ReactRemoteComponent.storyName = 'ReactRemoteComponent'
