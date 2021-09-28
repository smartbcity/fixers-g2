import React from 'react'
import {
  FilterDatePicker as AruiFilterDatePicker,
  FilterDatePickerProps
} from './FilterDatePicker'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { addDays } from 'date-fns'
import { Box } from '@mui/material'

export default {
  title: 'Forms/FilterDatePicker',
  component: AruiFilterDatePicker
} as Meta

const today = new Date()

export const FilterDatePicker: Story<FilterDatePickerProps> = (
  args: FilterDatePickerProps
) => {
  const [date, setSelectedDate] = React.useState<Date | undefined>(today)
  const handleDateChange = (date?: Date) => {
    setSelectedDate(date)
  }
  return (
    <Box display='flex'>
      <AruiFilterDatePicker
        value={date}
        label='From'
        onChangeDate={handleDateChange}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
        {...args}
      />
      <AruiFilterDatePicker
        value={date}
        label='To'
        onChangeDate={handleDateChange}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
        {...args}
      />
    </Box>
  )
}

FilterDatePicker.args = {
  id: 'datePicker-test',
  minDate: addDays(today, -10),
  maxDate: addDays(today, 10)
}

FilterDatePicker.storyName = 'FilterDatePicker'

export const FilterMuiDatePickerVariants: Story<FilterDatePickerProps> = () => {
  const [date, setSelectedDate] = React.useState<Date | undefined>(undefined)
  return (
    <Box display='flex' justifyContent='space-around'>
      <Box display='flex' flexDirection='column'>
        <AruiFilterDatePicker
          value={date}
          label='outlined primary'
          variant='outlined'
          color='primary'
          onChangeDate={(date) => setSelectedDate(date)}
          onRemove={() => setSelectedDate(undefined)}
          style={{ margin: 10, width: 190 }}
        />
        <AruiFilterDatePicker
          value={date}
          label='outlined secondary'
          variant='outlined'
          color='secondary'
          onChangeDate={(date) => setSelectedDate(date)}
          onRemove={() => setSelectedDate(undefined)}
          style={{ margin: 10, width: 190 }}
        />
        <AruiFilterDatePicker
          value={date}
          label='outlined default'
          variant='outlined'
          color='default'
          onChangeDate={(date) => setSelectedDate(date)}
          onRemove={() => setSelectedDate(undefined)}
          style={{ margin: 10, width: 190 }}
        />
      </Box>
      <Box display='flex' flexDirection='column'>
        <AruiFilterDatePicker
          value={date}
          label='filled primary'
          variant='filled'
          color='primary'
          onChangeDate={(date) => setSelectedDate(date)}
          onRemove={() => setSelectedDate(undefined)}
          style={{ margin: 10, width: 190 }}
        />
        <AruiFilterDatePicker
          value={date}
          label='filled secondary'
          variant='filled'
          color='secondary'
          onChangeDate={(date) => setSelectedDate(date)}
          onRemove={() => setSelectedDate(undefined)}
          style={{ margin: 10, width: 190 }}
        />
        <AruiFilterDatePicker
          value={date}
          label='filled default'
          variant='filled'
          color='default'
          onChangeDate={(date) => setSelectedDate(date)}
          onRemove={() => setSelectedDate(undefined)}
          style={{ margin: 10, width: 190 }}
        />
      </Box>
    </Box>
  )
}

export const FilterDatePickerStatus: Story<FilterDatePickerProps> = () => {
  const [date, setSelectedDate] = React.useState<Date | undefined>(undefined)
  return (
    <Box display='flex' flexDirection='column'>
      <AruiFilterDatePicker
        value={date}
        label='mui-picker disabled'
        disabled
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10, width: 180 }}
      />
      <AruiFilterDatePicker
        value={date}
        label='mui-picker english'
        locale='enUS'
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10, width: 180 }}
      />
    </Box>
  )
}
