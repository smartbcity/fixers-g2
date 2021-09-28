import React from 'react'
import {
  Ticket as AruiTicket,
  TicketBasicProps,
} from './Ticket'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { withDesign } from 'storybook-addon-designs'
import { Flight } from '@mui/icons-material'
import { styles, classes } from './docs'
import { Box } from  '@mui/material'

export default {
  title: 'Components/Ticket',
  component: AruiTicket,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Nl4422AUGHNVClZOHzPg8/SmartB-UI-kit?node-id=589%3A0',
    },
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'TicketClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'TicketStyles',
          detail: styles
        }
      }
    },
    icon: {
      control: null
    }
  }
} as Meta

const defaultArgs = {
  title: "flights",
  content: "24 500",
  icon: <Flight style={{ color: "#EDBA27", width: "50px", height: "50px" }} />
}

export const Ticket: Story<TicketBasicProps> = (args: TicketBasicProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%" style={{background: "#EEEEEE", padding: "30px"}}>
      <AruiTicket {...args} />
    </Box>
  )
}

export const TicketVariants: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around" flexWrap="wrap" alignItems="center" width="100%" height="100%" style={{background: "#EEEEEE", padding: "30px"}}>
      <AruiTicket variant="normal" {...defaultArgs} />
      <AruiTicket variant="composed"  {...defaultArgs} />
      <AruiTicket variant="elevated"  {...defaultArgs} />
    </Box>
  )
}

export const TicketOptions: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around" flexWrap="wrap" alignItems="center" width="100%" height="100%" style={{background: "#EEEEEE", padding: "30px"}}>
      <AruiTicket variant="composed" {...defaultArgs} icon={undefined} />
      <AruiTicket variant="composed" reversed {...defaultArgs} />
      <AruiTicket variant="composed" reversed longText {...defaultArgs} content="24 500 flights during the month of june" />
    </Box>
  )
}

Ticket.args = {
  ...defaultArgs
}

Ticket.storyName = 'Ticket'

