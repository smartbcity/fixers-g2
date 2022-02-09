import React from 'react'
import { Meta } from '@storybook/react'
import { Table as AruiTable, TableBasicProps } from './Table'
import { Column, CellProps } from 'react-table'
import { Story } from '@storybook/react/types-6-0'
import { Box, Typography } from '@mui/material'

export default {
  title: 'Layout/Table',
  component: AruiTable
} as Meta

export const Table: Story<TableBasicProps<Data>> = (
  args: TableBasicProps<Data>
) => {
  return <AruiTable {...args}></AruiTable>
}

interface Data {
  id: string
  name: string
  isRelaxed: boolean
}

const data: Data[] = [
  {
    id: '0',
    name: 'Jean',
    isRelaxed: true
  },
  {
    id: '1',
    name: 'Mathieu',
    isRelaxed: false
  },
  {
    id: '2',
    name: 'Simon',
    isRelaxed: true
  }
]

const columns: Column<Data>[] = [
  {
    Header: 'Id',
    accessor: 'id',
    Cell: ({ row }: CellProps<Data>) => (
      <Typography>{row.original.id}</Typography>
    )
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ row }: CellProps<Data>) => (
      <Typography>{row.original.name}</Typography>
    )
  },
  {
    Header: 'Is he relax ?',
    accessor: 'isRelaxed',
    Cell: ({ row }: CellProps<Data>) => (
      <Typography>{row.original.isRelaxed ? 'yes' : 'no'}</Typography>
    )
  }
]

Table.args = {
  data: data,
  columns: columns,
  setSelectedRows: (rows) => console.log(rows),
  renderSubComponent: (row, rowProps) => (
    <Box
      sx={{
        margin: 1
      }}
    >
      <Typography>Hy, I'm the subcomponent of {row.original.name}</Typography>
    </Box>
  ),
  onRowClicked: (row) => console.log('cliked', row)
}
