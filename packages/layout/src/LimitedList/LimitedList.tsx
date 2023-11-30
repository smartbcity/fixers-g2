import { Stack, StackProps } from '@mui/material'
import { Chip } from '@smartb/g2-components'
import { Option } from '@smartb/g2-forms'
import { Tooltip } from '@smartb/g2-notifications'
import { MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useMemo } from 'react'

export interface LimitedListBasicProps<T extends {}> extends StackProps {
  values?: (Option & T)[]
  listedComponent: React.ElementType<any>
  /**
   * if undefined  the list is unlimited
   * @default undefined
   */
  limit?: number
}

export type LimitedListProps<T extends {}> = MergeMuiElementProps<
  StackProps,
  LimitedListBasicProps<T>
>

export const LimitedList = <T extends {} = {}>(props: LimitedListProps<T>) => {
  const { values = [], limit, listedComponent, ...other } = props

  const tagsDisplay = useMemo(() => {
    const limited = limit ? values.slice(0, limit) : values
    const Component = listedComponent
    return limited.map((el) => <Component {...el} key={el.key ?? el.label} />)
  }, [values, limit, listedComponent])

  const textRest = useMemo(() => {
    if (limit && limit <= values.length - 1) {
      const rest = values.slice(limit, values.length - 1).map((el) => el.label)
      return rest.join(', ')
    }
    return undefined
  }, [values, limit, listedComponent])

  return (
    <Stack direction='row' gap={0.5} flexWrap='wrap' {...other}>
      {tagsDisplay}
      {textRest && (
        <Tooltip helperText={textRest}>
          <Chip
            label={`${values.length - (limit ?? 0)} +`}
            sx={{
              bgcolor: 'primary.main',
              color: 'white'
            }}
          />
        </Tooltip>
      )}
    </Stack>
  )
}
