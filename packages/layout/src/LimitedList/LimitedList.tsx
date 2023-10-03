import { Stack, StackProps } from '@mui/material'
import { Chip, MergeMuiElementProps, Option, Tooltip } from '@smartb/g2'
import React, { useMemo } from 'react'

export interface LimitedListBasicProps<T extends {}> extends StackProps {
  values?: (Option & T)[]
  listedComponent: React.ElementType<any>
  /**
   * @default 4
   */
  limit?: number
}

export type LimitedListProps<T extends {}> = MergeMuiElementProps<
  StackProps,
  LimitedListBasicProps<T>
>

export const LimitedList = <T extends {} = {}>(props: LimitedListProps<T>) => {
  const { values = [], limit = 4, listedComponent, ...other } = props

  const tagsDisplay = useMemo(() => {
    const limited = values.slice(0, limit)
    const Component = listedComponent
    return limited.map((el) => <Component {...el} key={el.key ?? el.label} />)
  }, [values, limit, listedComponent])

  const textRest = useMemo(() => {
    const rest = values.slice(limit, values.length - 1).map((el) => el.label)
    return rest.join(', ')
  }, [values, limit, listedComponent])

  return (
    <Stack direction='row' gap={0.5} flexWrap='wrap' {...other}>
      {tagsDisplay}
      <Tooltip helperText={textRest}>
        <Chip
          label={`${values.length - limit} +`}
          sx={{
            bgcolor: 'primary.main',
            color: 'white'
          }}
        />
      </Tooltip>
    </Stack>
  )
}
