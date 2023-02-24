import React from 'react'
import {
  AutomateViewer as AruiAutomateViewer,
  AutomateViewerBasicProps
} from './AutomateViewer'
import { SSM, SsmViewer as AruiSsmViewer } from '../SsmViewer'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'

export default {
  title: 'S2/AutomateViewer',
  component: AruiAutomateViewer
} as Meta

const Template: Story<AutomateViewerBasicProps> = (
  args: AutomateViewerBasicProps
) => {
  return <AruiAutomateViewer {...args}></AruiAutomateViewer>
}

export const AutomateViewer = Template.bind({})

AutomateViewer.args = {
  transitions: [
    {
      label: 'transition 1',
      from: 0,
      to: 1
    },
    {
      label: 'transition 2',
      from: 1,
      to: 1
    },
    {
      label: 'transition 3',
      from: 1,
      to: 1
    },
    {
      label: 'transition 4',
      from: 1,
      to: 2
    }
  ],
  style: { width: '100%', height: '500px' }
}

AutomateViewer.storyName = 'AutomateViewer'

export const SsmViewer: Story = () => {
  const automate: SSM = {
    name: 'DidS2',
    version: undefined,
    transitions: [
      {
        from: undefined,
        to: {
          name: 'Created',
          position: 0
        },
        role: {
          name: 'Admin'
        },
        action: {
          name: 'DidCreateCommand'
        }
      },
      {
        from: {
          name: 'Created',
          position: 0
        },
        to: {
          name: 'Actived',
          position: 1
        },
        role: {
          name: 'Owner'
        },
        action: {
          name: 'DidAddPublicKeyCommand'
        }
      },
      {
        from: {
          name: 'Actived',
          position: 1
        },
        to: {
          name: 'Actived',
          position: 1
        },
        role: {
          name: 'Owner'
        },
        action: {
          name: 'DidRevokeCommand'
        }
      },
      {
        from: {
          name: 'Actived',
          position: 1
        },
        to: {
          name: 'Revoked',
          position: 2
        },
        role: {
          name: 'Owner'
        },
        action: {
          name: 'DidRevokePublicKeyCommand'
        }
      }
    ]
  }
  return <AruiSsmViewer automate={automate}></AruiSsmViewer>
}
