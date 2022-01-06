import React, { useState } from 'react'
import { Timeline as AruiTimeline, TimelineBasicProps } from './Timeline'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { Paper, Typography } from '@mui/material'
import { Fastfood } from '@mui/icons-material'
import { styles, classes, TimeLineCell } from './types'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Components/Timeline',
  component: AruiTimeline,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1017%3A1851'
    }
  },
  argTypes: {
    lines: {
      table: {
        type: {
          summary: 'TimeLineCell[]',
          detail: TimeLineCell
        }
      },
      control: null
    },
    classes: {
      table: {
        type: {
          summary: 'TextFieldStyles',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'TextFieldStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

const now = Date.now()
const lines = [
  {
    id: 'cell-1',
    content: (
      <Paper style={{ padding: '20px' }}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </Paper>
    ),
    startTime: new Date(now - 3600000 * 2).toLocaleTimeString(),
    endTime: new Date(now - 3600000 * 2 - 3600000 / 2).toLocaleTimeString(),
    endDate: 3600000 * 2 - 3600000 / 2,
    startDate: now - 3600000 * 2
  },
  {
    id: 'cell-2',
    content: (
      <Paper style={{ padding: '20px' }}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </Paper>
    ),
    startTime: new Date(now - 3600000).toLocaleTimeString(),
    startDate: now - 3600000,
    disabled: true
  },
  {
    id: 'cell-3',
    content: (
      <Paper style={{ padding: '20px' }}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </Paper>
    ),
    startTime: new Date(now - 3600000 / 2).toLocaleTimeString(),
    endTime: new Date(now + 3600000 / 2).toLocaleTimeString(),
    startDate: now - 3600000 / 2,
    endDate: now + 3600000 / 2,
    startDot: <Fastfood />
  },
  {
    id: 'cell-4',
    content: (
      <Paper style={{ padding: '20px' }}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </Paper>
    ),
    startTime: new Date(now + 3600000 * 2).toLocaleTimeString(),
    startDate: now + 3600000 * 2,
    disabled: true
  }
]

const Template: Story<TimelineBasicProps> = (args: TimelineBasicProps) => {
  const [cell, setcell] = useState(undefined)
  return (
    <AruiTimeline
      selectedCellId={cell}
      onSelectCell={(newcell) =>
        newcell.id === cell ? setcell(undefined) : setcell(newcell.id)
      }
      {...args}
    ></AruiTimeline>
  )
}

const Template2: Story = () => {
  return <AruiTimeline lines={lines} passedTimeLine></AruiTimeline>
}

export const Timeline = Template.bind({})

export const passedTimeLine = Template2.bind({})

Timeline.args = {
  lines: lines
}

passedTimeLine.storyName = 'passed timeline'
