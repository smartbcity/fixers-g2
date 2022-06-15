import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import React, { useMemo } from 'react'

interface GroundedLoadingProps {
  expectedSize: number
}

export const GroundedLoading = (props: GroundedLoadingProps) => {
  const { expectedSize } = props
  const headerCell = (
    <TableCell>
      <Typography sx={{ width: '120px' }} variant='h6'>
        <Skeleton animation='wave' />
      </Typography>
    </TableCell>
  )
  const bodyCell = (
    <TableCell>
      <Typography sx={{ width: '90px' }}>
        <Skeleton animation='wave' />
      </Typography>
    </TableCell>
  )

  const rows = useMemo(() => {
    const display: JSX.Element[] = []
    for (let i = 0; i < expectedSize; i++) {
      display.push(
        <TableRow key={i}>
          {bodyCell}
          {bodyCell}
          {bodyCell}
          {bodyCell}
        </TableRow>
      )
    }
    return display
  }, [expectedSize])

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headerCell}
          {headerCell}
          {headerCell}
          {headerCell}
        </TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
    </Table>
  )
}
