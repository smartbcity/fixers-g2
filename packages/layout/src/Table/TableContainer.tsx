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
  if (variant === 'elevated') {
    return {
      '& .AruiTable-actionColumn': {
        width: '20px'
      },
      '& .MuiTableCell-root': {
        borderBottomColor: '#D9DBE1'
      }
    }
  } else {
    return {
      '& .AruiTable-actionColumn': {
        width: '20px'
      },
      '& .MuiTableCell-root': {
        border: 'unset'
      },
      '& .AruiTable-tableRow': {
        borderRadius: '4px',
        background: 'white',
        boxShadow: theme.shadows[2]
      }
    }
  }
})
