import React, { useState } from 'react'
import { Select, Option, SelectBasicProps } from './Select'
import { Meta } from "@storybook/react";
import { Story } from "@storybook/react/types-6-0";
import { Box } from  '@mui/material';
import { SelectClasses, SelectStyles } from "./docs"
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Forms/Select',
  component: Select,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Nl4422AUGHNVClZOHzPg8/SmartB-UI-kit?node-id=418%3A26',
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'SelectClasses',
          detail: SelectClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'SelectStyles',
          detail: SelectStyles
        }
      }
    }
  }
} as Meta;

export const SelectStory: Story<SelectBasicProps> = (args: SelectBasicProps) => {

  const [value, setvalue] = useState("")
  const [values, setvalues] = useState([])
  return (
    <Select
      options={[]}
      {...args}
      value={args.multiple ? undefined : value}
      values={args.multiple ? values : undefined}
      onChangeValue={(value) => setvalue(value)}
      onChangeValues={(values) => setvalues(values)}
      onRemove={() => { setvalue(""); setvalues([]) }}
      style={{ width: 350 }}
    />
  )
}

export const SelectSizes: Story<SelectBasicProps> = () => {

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Select
        placeholder="small"
        id="smallSelect"
        value=""
        options={options}
        size="small"
        style={{ width: 350, margin: 20 }}
      />
      <Select
        placeholder="medium"
        id="mediumSelect"
        options={options}
        size="medium"
        style={{ width: 350, margin: 20 }}
      />
      <Select
        placeholder="large"
        id="largeSelect"
        options={options}
        size="large"
        style={{ width: 350, margin: 20 }}
      />
    </Box>
  )
}

export const SelectStates: Story<SelectBasicProps> = () => {

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Select
        placeholder="select with error"
        id="errorSelect"
        options={options}
        error
        errorMessage="A custom error message"
        style={{ width: 350, margin: 20 }}
      />
      <Select
        placeholder="select disabled"
        id="disabledSelect"
        options={options}
        disabled
        style={{ width: 350, margin: 20 }}
      />
    </Box>
  )
}

export const MultipleSelect: Story<SelectBasicProps> = () => {
  const [values, setvalues] = useState([])

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Select
        placeholder="multiple select"
        id="multpileSelect"
        multiple
        options={options}
        values={values}
        onChangeValues={(values) => setvalues(values)}
        onRemove={() => { setvalues([]) }}
        style={{ width: 350, margin: 20 }}
      />
    </Box>
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

SelectStory.args = {
  options: options,
  placeholder: "Choose a name"
}

SelectStory.storyName = "Select"
SelectSizes.storyName = "All size of the select"
SelectStates.storyName = "The select states"
MultipleSelect.storyName = "Multiple select"