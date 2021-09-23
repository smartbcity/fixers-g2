import React from 'react'
import { Tooltip as AruiTooltip, TooltipBasicProps } from './Tooltip'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { Typography } from  '@mui/material'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Notifications/Tooltip',
  component: AruiTooltip,
  decorators:[withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Nl4422AUGHNVClZOHzPg8/SmartB-UI-kit?node-id=210%3A380',
    },
  }
} as Meta

const Template: Story<TooltipBasicProps> = (args: TooltipBasicProps) => {
  return (
    <AruiTooltip {...args} open={args.open ? true : undefined}>
      <Typography align='center'>The element to tooltiped</Typography>
    </AruiTooltip>
  )
}

const Template2: Story = () => {
  return (
    <AruiTooltip helperText='A helper message' open>
      <Typography align='center'>The element to tooltiped</Typography>
    </AruiTooltip>
  )
}

export const Tooltip = Template.bind({})

export const PermanentTooltip = Template2.bind({})

Tooltip.args = {
  helperText: 'A helper message'
}

Tooltip.storyName = 'Tooltip'

PermanentTooltip.storyName = 'permanent tooltip'
