import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import React from 'react'

export const GroundedLoading = () => {
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
  const bodyRow = (
    <TableRow>
      {bodyCell}
      {bodyCell}
      {bodyCell}
      {bodyCell}
    </TableRow>
  )
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
      <TableBody>
        {bodyRow}
        {bodyRow}
        {bodyRow}
        {bodyRow}
      </TableBody>
    </Table>
  )
}
