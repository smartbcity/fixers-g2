import { Meta } from '@storybook/react'
import React, { useRef, useState } from 'react'
import {
  OrganizationFactory,
  OrganizationFactoryProps
} from './OrganizationFactory'
import { Story } from '@storybook/react/types-6-0'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import { Stack, Typography } from '@mui/material'
import { styles, classes } from '../../Domain'
import { Button } from '@smartb/g2-components'

export default {
  title: 'I2/OrganizationFactory',
  component: OrganizationFactory,
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Stack>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Forms' story='Form'>
                Form
              </LinkTo>
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Notifications' story='Popover'>
                PopOver
              </LinkTo>
            </Typography>
          </Stack>
        </>
      )
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'OrganizationFactoryClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'OrganizationFactoryStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const OrganizationFactoryStory: Story<OrganizationFactoryProps> = (
  args: OrganizationFactoryProps
) => {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <>
      <OrganizationFactory
        {...args}
        organization={{ roles: ['Manager'], name: 'SmartB' }}
        SubmitButtonRef={ref}
        readOnly
      />
      <Button sx={{ marginTop: '16px' }} ref={ref}>
        Sauvegarder
      </Button>
    </>
  )
}

OrganizationFactoryStory.args = {
  onSubmit: (org) => {
    window.alert(JSON.stringify(org))
    return true
  },
  rolesOptions: [
    {
      key: 'Operateur',
      label: 'Operateur'
    },
    {
      key: 'Manager',
      label: 'Manager'
    }
  ]
}

OrganizationFactoryStory.storyName = 'OrganizationFactory'
