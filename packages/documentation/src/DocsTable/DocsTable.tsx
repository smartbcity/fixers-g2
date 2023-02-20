import { Box, Divider } from '@mui/material'
import React, { Fragment, useMemo } from 'react'

export interface DocsTableProps {
  children: React.ReactNode
  /**
   * The number of column
   *
   * @default 2
   */
  gridColumnNumber?: number
}

export const DocsTable = (props: DocsTableProps) => {
  const { gridColumnNumber = 2, children } = props

  const display = useMemo(() => {
    if (!Array.isArray(children)) return
    let dividerCount = 0
    return children.map((child, index) => {
      const canDisplayDivider =
        index > 0 &&
        (index + 1) % gridColumnNumber === 0 &&
        index + 1 < children.length
      if (canDisplayDivider) dividerCount++
      return (
        <Fragment key={index}>
          {child}
          {canDisplayDivider && (
            <Divider
              sx={{
                gridArea: `${
                  (index + 1) / gridColumnNumber + dividerCount
                } / 1 / ${(index + 1) / gridColumnNumber + dividerCount} / ${
                  gridColumnNumber + 1
                }`,
                width: 'calc(100% + 48px)',
                marginLeft: '-24px',
                borderColor: '#EEEEEE'
              }}
            />
          )}
        </Fragment>
      )
    })
  }, [children, gridColumnNumber])

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          md: `repeat(${gridColumnNumber}, 1fr)`
        },
        gridColumnGap: '50px',
        gridRowGap: '16px',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #EEEEEE',
        background: '#FFFEFB',
        alignItems: 'center'
      }}
    >
      {display}
    </Box>
  )
}
