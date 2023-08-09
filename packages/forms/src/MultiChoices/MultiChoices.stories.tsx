import React, { useState } from 'react'
import { MultiChoices, MultiChoicesBasicProps } from './MultiChoices'
import { Meta, StoryFn } from '@storybook/react'
import { MultiChoicesClasses, MultiChoicesStyles } from './docs'

import { Option } from '../Select'

export default {
  title: 'Forms/MultiChoices',
  component: MultiChoices,

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
          summary: 'MultiChoicesClasses',
          detail: MultiChoicesClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'MultiChoicesStyles',
          detail: MultiChoicesStyles
        }
      }
    }
  }
} as Meta

export const MultiChoicesStory: StoryFn<MultiChoicesBasicProps> = (
  args: MultiChoicesBasicProps
) => {
  const [values, setvalues] = useState<any[]>([])
  return (
    <MultiChoices
      {...args}
      values={values}
      onChange={(values) => setvalues(values)}
      style={{ width: 350 }}
    />
  )
}

const options: Option[] = [
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

MultiChoicesStory.args = {
  options: options
}

MultiChoicesStory.storyName = 'MultiChoices'
