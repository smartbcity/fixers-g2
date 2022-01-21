import React from 'react'
import { DatePicker as AruiDatePicker, DatePickerProps } from './DatePicker'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { addDays } from 'date-fns'
import { Box } from '@mui/material'

export default {
  title: 'Forms/DatePicker',
  component: AruiDatePicker
} as Meta

const today = new Date()

export const DatePicker: Story<DatePickerProps> = (args: DatePickerProps) => {
  const [date, setSelectedDate] = React.useState<Date | undefined>(today)
  const handleDateChange = (date?: Date) => {
    setSelectedDate(date)
  }

  console.log(date)
  return (
    <AruiDatePicker
      value={date}
      onChangeDate={handleDateChange}
      onRemove={() => setSelectedDate(undefined)}
      {...args}
    />
  )
}

DatePicker.args = {
  id: 'datePicker-test',
  minDate: addDays(today, -10),
  maxDate: addDays(today, 10)
}

DatePicker.storyName = 'DatePicker'

export const DatePickerStatus: Story<DatePickerProps> = () => {
  const [date, setSelectedDate] = React.useState<Date | undefined>(undefined)
  return (
    <Box display='flex' flexDirection='column'>
      <AruiDatePicker
        value={date}
        placeholder='normal'
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
      <AruiDatePicker
        value={date}
        placeholder='disabled'
        disabled
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
      <AruiDatePicker
        value={date}
        placeholder='error'
        error
        errorMessage='there is an error'
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
      <AruiDatePicker
        value={date}
        placeholder='english'
        locale='enUS'
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
    </Box>
  )
}

export const DatePickerSizes: Story<DatePickerProps> = () => {
  const [date, setSelectedDate] = React.useState<Date | undefined>(undefined)
  return (
    <Box display='flex' flexDirection='column'>
      <AruiDatePicker
        value={date}
        placeholder='mui-picker small'
        size='small'
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
      <AruiDatePicker
        value={date}
        placeholder='mui-picker medium'
        size='medium'
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
      <AruiDatePicker
        value={date}
        placeholder='mui-picker large'
        size='large'
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
    </Box>
  )
}
