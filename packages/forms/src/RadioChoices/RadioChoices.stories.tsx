import React, { useState } from 'react'
import { RadioChoices, Choice, RadioChoicesBasicProps } from './RadioChoices'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { Box } from '@mui/material'
import { RadioChoicesClasses, RadioChoicesStyles } from './docs'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Forms/RadioChoices',
  component: RadioChoices,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Nl4422AUGHNVClZOHzPg8/SmartB-UI-kit?node-id=418%3A26'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'RadioChoicesClasses',
          detail: RadioChoicesClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'RadioChoicesStyles',
          detail: RadioChoicesStyles
        }
      }
    }
  }
} as Meta

export const RadioChoicesStory: Story<RadioChoicesBasicProps> = (
  args: RadioChoicesBasicProps
) => {
  const [value, setvalue] = useState('')
  return (
    <RadioChoices
      choices={[]}
      {...args}
      value={value}
      onChange={(event, value) => setvalue(value)}
      style={{ width: 350 }}
    />
  )
}

const choices: Choice[] = [
  {
    key: 1,
    label: 'test1'
  },
  {
    key: 2,
    label: 'test2'
  },
  {
    key: 3,
    label: 'test3'
  },
  {
    key: 4,
    label: 'test4'
  },
  {
    key: 5,
    label: 'test5'
  },
  {
    key: 6,
    label: 'test6'
  },
  {
    key: 7,
    label: 'test7'
  }
]

RadioChoicesStory.args = {
  choices: choices
}

RadioChoicesStory.storyName = 'RadioChoices'
