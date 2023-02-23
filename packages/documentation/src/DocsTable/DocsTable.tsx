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
      const dividerIndex = (index + 1) / gridColumnNumber + dividerCount
      return (
        <Fragment key={index}>
          {child}
          {canDisplayDivider && (
            <Divider
              sx={{
                gridArea: {
                  xs: 'unset',
                  sm: `${dividerIndex} / 1 / ${dividerIndex} / ${
                    gridColumnNumber + 1
                  }`
                },
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
          sm: `repeat(${gridColumnNumber}, 1fr)`
        },
        gridColumnGap: '50px',
        gridRowGap: '16px',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #EEEEEE',
        background: '#FFFEFB',
        alignItems: 'center',
        margin: '8px 0'
      }}
    >
      {display}
    </Box>
  )
}
