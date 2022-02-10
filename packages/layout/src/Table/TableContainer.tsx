import {
  styled,
  TableContainer as MuiTableContainer,
  TableContainerProps as MuiTableContainerProps
} from '@mui/material'
import React from 'react'
import { MergeMuiElementProps } from '@smartb/g2-themes'

interface BasicTableContainerBasicProps {
  variant: 'grounded' | 'elevated'
  children: React.ReactNode
}

type BasicTableContainerProps = MergeMuiElementProps<
  MuiTableContainerProps,
  BasicTableContainerBasicProps
>

const BasicTableContainer = (props: BasicTableContainerProps) => {
  const { children, ...other } = props
  return <MuiTableContainer {...other}>{children}</MuiTableContainer>
}

export const TableContainer = styled(BasicTableContainer)((props) => {
  const { variant, theme } = props
  const comunStyles = {
    '& .AruiTable-actionColumn': {
      width: '20px'
    }
  }
  if (variant === 'grounded') {
    return {
      ...comunStyles,
      '& .MuiTableCell-root': {
        borderBottomColor: '#D9DBE1'
      },
      '& .AruiTable-principaleTableRow': {
        '& > *': { borderBottom: 'unset ' }
      }
    }
  } else {
    return {
      ...comunStyles,
      '& .MuiTableCell-root': {
        border: 'unset'
      },
      '& .AruiTable-principaleTableRow': {
        borderRadius: '4px',
        background: 'white',
        boxShadow: theme.shadows[1],
        margin: '10p 0px',
        border: '2px solid transparent'
      },
      '& .AruiTable-tableCell': {
        padding: '7px 12px',
        alignSelf: 'center'
      },
      '& .AruiTable-tableHeaderCell': {
        padding: '7px 12px',
        alignSelf: 'center'
      }
    }
  }
})
