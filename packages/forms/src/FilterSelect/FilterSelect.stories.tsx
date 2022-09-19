import React, { useState } from 'react'
import { FilterSelect, Option, FilterSelectBasicProps } from './FilterSelect'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { Box } from '@mui/material'
import { FilterSelectClasses, FilterSelectStyles } from './docs'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Forms/FilterSelect',
  component: FilterSelect,
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
          summary: 'FilterSelectClasses',
          detail: FilterSelectClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'FilterSelectStyles',
          detail: FilterSelectStyles
        }
      }
    }
  }
} as Meta

export const FilterSelectStory: Story<FilterSelectBasicProps> = (
  args: FilterSelectBasicProps
) => {
  const [value, setvalue] = useState('')
  const [values, setvalues] = useState<string[]>([])
  return (
    <FilterSelect
      options={[]}
      {...args}
      value={args.multiple ? undefined : value}
      values={args.multiple ? values : undefined}
      onChangeValue={(value) =>
        setvalue((oldValue) => (oldValue === value ? '' : value))
      }
      onChangeValues={(values) => setvalues(values)}
      onRemove={() => {
        setvalue('')
        setvalues([])
      }}
    />
  )
}

export const FilterSelectSizes: Story<FilterSelectBasicProps> = () => {
  const [value, setvalue] = useState('')
  return (
    <Box display='flex' justifyContent='space-around' alignItems='center'>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <FilterSelect
          label='Primary outlined'
          color='primary'
          variant='outlined'
          value={value}
          onChangeValue={(value) =>
            setvalue((oldValue) => (oldValue === value ? '' : value))
          }
          onRemove={() => {
            setvalue('')
          }}
          options={options}
          style={{ margin: 20, width: '200px' }}
        />
        <FilterSelect
          label='Secondary outlined'
          color='secondary'
          variant='outlined'
          value={value}
          onChangeValue={(value) =>
            setvalue((oldValue) => (oldValue === value ? '' : value))
          }
          onRemove={() => {
            setvalue('')
          }}
          options={options}
          style={{ margin: 20, width: '200px' }}
        />
        <FilterSelect
          label='Default outlined'
          color='default'
          variant='outlined'
          value={value}
          onChangeValue={(value) =>
            setvalue((oldValue) => (oldValue === value ? '' : value))
          }
          onRemove={() => {
            setvalue('')
          }}
          options={options}
          style={{ margin: 20, width: '200px' }}
        />
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <FilterSelect
          label='Primary filled'
          color='primary'
          variant='filled'
          value={value}
          onChangeValue={(value) =>
            setvalue((oldValue) => (oldValue === value ? '' : value))
          }
          onRemove={() => {
            setvalue('')
          }}
          options={options}
          style={{ margin: 20, width: '200px' }}
        />
        <FilterSelect
          label='Secondary filled'
          color='secondary'
          variant='filled'
          value={value}
          onChangeValue={(value) =>
            setvalue((oldValue) => (oldValue === value ? '' : value))
          }
          onRemove={() => {
            setvalue('')
          }}
          options={options}
          style={{ margin: 20, width: '200px' }}
        />
        <FilterSelect
          label='Default filled'
          color='default'
          variant='filled'
          value={value}
          onChangeValue={(value) =>
            setvalue((oldValue) => (oldValue === value ? '' : value))
          }
          onRemove={() => {
            setvalue('')
          }}
          options={options}
          style={{ margin: 20, width: '200px' }}
        />
      </Box>
    </Box>
  )
}

export const FilterSelectStates: Story<FilterSelectBasicProps> = () => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <FilterSelect
        label='outlined disabled'
        variant='outlined'
        disabled
        options={options}
        style={{ width: 170, margin: 20 }}
      />
      <FilterSelect
        label='filled disabled'
        variant='filled'
        options={options}
        disabled
        style={{ width: 170, margin: 20 }}
      />
    </Box>
  )
}

export const MultipleFilterSelect: Story<FilterSelectBasicProps> = () => {
  const [values, setvalues] = useState<string[]>([])

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <FilterSelect
        label='multiple select'
        multiple
        options={options}
        values={values}
        onChangeValues={(values) => setvalues(values)}
        onRemove={() => {
          setvalues([])
        }}
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

FilterSelectStory.args = {
  options: options,
  label: 'A filter'
}

FilterSelectStory.storyName = 'FilterSelect'
FilterSelectSizes.storyName = 'All the select variants'
FilterSelectStates.storyName = 'The select states'
MultipleFilterSelect.storyName = 'Multiple select'
