import React, { useState } from 'react'
import {
  PopUp as AruiPopUp,
  PopUpBasicProps,
  Action as PopUpAction
} from './PopUp'
import {
  ConfirmationPopUp as AruiConfirmationPopUp,
  ConfirmationPopUpBasicProps
} from './ConfirmationPopUp'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { ArgsTable, Title, Primary, Stories } from '@storybook/addon-docs'
import { styles, classes, Action } from './types'
import { Box, Typography } from '@mui/material'
import imageHolder from '../assets/imageHolder.jpg'
import { Button } from '@smartb/g2-components'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Components/PopUp',
  component: AruiPopUp,
  decorators: [withDesign],
  subcomponents: { ConfirmationPopUp: AruiConfirmationPopUp },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>PopUp</Title>
          <Primary />
          <ArgsTable components={{ AruiPopUp: AruiPopUp }} />
          <Stories />
          <ArgsTable
            components={{ ConfirmationPopUp: AruiConfirmationPopUp }}
          />
        </>
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A390'
    }
  }
} as Meta

export const PopUp: Story<PopUpBasicProps> = (args: PopUpBasicProps) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open the popup</Button>
      <AruiPopUp {...args} open={open} onClose={() => setOpen(!open)} />
    </>
  )
}

export const alternativePopUp: Story = () => {
  const [open, setOpen] = useState(false)
  const actions: PopUpAction[] = [
    {
      label: 'continuer',
      key: 'continuPopupButton',
      onClick: () => setOpen(!open)
    },
    {
      label: 'annuler',
      key: 'cancelPopupButton',
      onClick: () => setOpen(!open),
      variant: 'text'
    }
  ]
  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open the popup</Button>
      <AruiPopUp
        open={open}
        onClose={() => setOpen(!open)}
        styles={{ actions: { flexDirection: 'column' } }}
        actions={actions}
      >
        <Box display='flex' justifyContent='center'>
          <img
            src={imageHolder}
            alt='image holder'
            style={{ marginBottom: '10px' }}
          />
        </Box>
        <Typography
          variant='h4'
          style={{ marginBottom: '15px' }}
          align='center'
        >
          Popup title
        </Typography>
        <Typography variant='body1' align='center'>
          This is a placeholer text just to show the default size and weight for
          body text typography in a popup.
        </Typography>
      </AruiPopUp>
    </>
  )
}

export const ConfirmationPopUp: Story<ConfirmationPopUpBasicProps> = (
  args: ConfirmationPopUpBasicProps
) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open the popup</Button>
      <AruiConfirmationPopUp
        {...args}
        open={open}
        onClose={() => setOpen(!open)}
      />
    </>
  )
}

PopUp.args = {
  children: (
    <>
      <Typography variant='h4' style={{ marginBottom: '15px' }}>
        Popup title
      </Typography>
      <Typography variant='body1'>
        This is a placeholer text just to show the default size and weight for
        body text typography in a popup.
      </Typography>
    </>
  ),
  actions: [
    {
      label: 'annuler',
      key: 'cancelPopupButton',
      onClick: action('clicked on annuler'),
      variant: 'text'
    },
    {
      label: 'continuer',
      key: 'continuPopupButton',
      onClick: action('clicked on continuer')
    }
  ]
}

PopUp.argTypes = {
  children: {
    control: null
  },
  actions: {
    table: {
      type: {
        summary: 'Action[]',
        detail: Action
      }
    }
  },
  classes: {
    table: {
      type: {
        summary: 'PopUpClasses',
        detail: classes
      }
    }
  },
  styles: {
    table: {
      type: {
        summary: 'PopUpStyles',
        detail: styles
      }
    }
  }
}

ConfirmationPopUp.args = {
  strongConfirmation: true
}

PopUp.storyName = 'PopUp'

alternativePopUp.storyName = 'An alternative popup'

ConfirmationPopUp.storyName = 'ConfirmationPopUp'
