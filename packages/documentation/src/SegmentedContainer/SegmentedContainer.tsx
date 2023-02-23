import { Box, Stack, useMediaQuery, useTheme } from '@mui/material'
import { BasicProps } from '@smartb/g2-themes'
import { cx } from '@emotion/css'
import React from 'react'

export interface SegmentedContainerProps extends BasicProps {
  /**
   * The description paragraph
   */
  description?: React.ReactNode
  /**
   * The left element placed under the description
   */
  leftElement?: React.ReactNode
  /**
   * The right element placed in a sticky container
   */
  rightElement?: React.ReactNode
  /**
   * The left segment portion in the screen between 0 and 1
   * @default 0.6
   */
  leftSegmentPortion?: number
}

export const SegmentedContainer = (props: SegmentedContainerProps) => {
  const {
    leftElement,
    rightElement,
    description,
    leftSegmentPortion = 0.6,
    className,
    style,
    id
  } = props

  const theme = useTheme()
  const isSM = useMediaQuery(theme.breakpoints.down('sm'))

  const child = !isSM ? (
    <>
      <Box
        className={'AruiSegmentedContainer-leftContainer'}
        sx={{
          flex: leftSegmentPortion
        }}
      >
        {description}
        {leftElement}
      </Box>
      <Box
        className={'AruiSegmentedContainer-rightContainer'}
        sx={{
          position: 'sticky',
          top: '16px',
          alignSelf: 'flex-start',
          flex: 1 - leftSegmentPortion
        }}
      >
        {rightElement}
      </Box>
    </>
  ) : (
    <Box className={'AruiSegmentedContainer-mobileContainer'}>
      {description}
      {rightElement}
      {leftElement}
    </Box>
  )

  return (
    <Stack
      className={cx('AruiSegmentedContainer-root', className)}
      style={style}
      id={id}
      direction='row'
      gap={'50px'}
    >
      {child}
    </Stack>
  )
}
