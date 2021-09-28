import React from 'react'
import { Meta } from '@storybook/react'
import { Table as AruiTable, TableBasicProps } from './Table'
import { Story } from '@storybook/react/types-6-0'
import { IDataTableColumn } from 'react-data-table-component'
import { Typography } from  '@mui/material'
import { IDataTableColumn as IDataTableColumnString } from './types'

export default {
  title: 'Components/Table',
  component: AruiTable,
  argTypes: {
    data: {
      table: {
        type: {
          summary: 'T[]'
        }
      }
    },
    columns: {
      table: {
        type: {
          summary: 'IDataTableColumn<T>[]',
          detail: IDataTableColumnString
        }
      }
    },
    onRowClicked: {
      table: {
        type: {
          summary: '(row: T) => void'
        }
      }
    }
  }
} as Meta

const Template: Story<TableBasicProps<BasicData>> = (
  args: TableBasicProps<BasicData>
) => {
  return <AruiTable {...args}></AruiTable>
}

export const Table = Template.bind({})

interface BasicData {
  id: string
  name: string
  isRelaxed: boolean
}

const data: BasicData[] = [
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

const columns: IDataTableColumn<BasicData>[] = [
  {
    name: 'Id',
    cell: (row) => <Typography>{row.id}</Typography>
  },
  {
    name: 'Name',
    cell: (row) => <Typography>{row.name}</Typography>
  },
  {
    name: 'Is he relax ?',
    cell: (row) => <Typography>{row.isRelaxed ? 'yes' : 'no'}</Typography>
  }
]

Table.args = {
  data: data,
  columns: columns
}
