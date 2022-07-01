import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import { Table as AruiTable, TableBasicProps } from './Table'
import { Story } from '@storybook/react/types-6-0'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import {
  ArgsTable,
  PRIMARY_STORY,
  Title,
  Description,
  Primary,
  Stories
} from '@storybook/addon-docs'
import { CodeHighlighter } from '@smartb/g2-documentation'
import { customCellExample, classes, styles, Column, CellProps } from './types'
import { Info } from '@mui/icons-material'

export default {
  title: 'Layout/OrganizationTable',
  component: AruiTable,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Table</Title>
          <Description>
            This table is created using the library
            [react-table](https://react-table.tanstack.com/).
          </Description>
          <Description>
            You will have to provide the data and the columns used to create the
            table. The columns need to have an id or an acessor as described
            here:
            https://react-table.tanstack.com/docs/api/useTable#column-options.
            And the Data should extends the type `BasicData` in order to have
            server side pagination and row selection working
          </Description>
          <Description>
            To create a custom cell you will have to type the parameters with
            customs types provided by g2 like so:
          </Description>
          <CodeHighlighter code={customCellExample} />
          <Description>
            There is 2 variants you can use. They are fundamentally different:
          </Description>
          <Description>
            - the `grounded` variant is based on the Material-ui
            [`Table`](https://mui.com/components/tables/#main-content)
            component. And use the the appropriate html tags for a table.
          </Description>
          <Description>
            - the `elevated` variant is a virtualized table created with div
            tags. It's the most custamizable one but it less accessible because
            it doesn't follow the html rule.
          </Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      )
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'AppClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'AppStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

interface Data {
  id: string
  name: string
  isRelaxed: boolean
}

const data1: Data[] = [
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

const data2: Data[] = [
  {
    id: '3',
    name: 'Paul',
    isRelaxed: true
  },
  {
    id: '4',
    name: 'Olivier',
    isRelaxed: false
  },
  {
    id: '5',
    name: 'Thomas',
    isRelaxed: true
  }
]

export const Table: Story<TableBasicProps<Data>> = (
  args: TableBasicProps<Data>
) => {
  const [page, setPage] = useState<number>(1)
  return (
    <AruiTable
      page={page}
      totalPages={2}
      onPageChange={(newPage) => setPage(newPage)}
      {...args}
      data={page === 1 ? data1 : data2}
    ></AruiTable>
  )
}

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
  columns: columns,
  setSelectedRowIds: (ids) => console.log(ids),
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

export const theVariants: Story = () => {
  interface DataExample {
    id: string
    name: string
    age: number
    gender: 'Male' | 'Female'
    nationality: string
  }
  const dataExample: DataExample[] = [
    {
      id: '1',
      name: 'Jean',
      age: 20,
      gender: 'Male',
      nationality: 'French'
    },
    {
      id: '2',
      name: 'Jean',
      age: 20,
      gender: 'Male',
      nationality: 'French'
    },
    {
      id: '3',
      name: 'Jean',
      age: 20,
      gender: 'Male',
      nationality: 'French'
    },
    {
      id: '3',
      name: 'Jean',
      age: 20,
      gender: 'Male',
      nationality: 'French'
    }
  ]

  const columnsExample: Column<DataExample>[] = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row }: CellProps<DataExample>) => (
        <Typography>{row.original.name}</Typography>
      )
    },
    {
      Header: 'Age',
      accessor: 'age',
      Cell: ({ row }: CellProps<DataExample>) => (
        <Typography>{row.original.age}</Typography>
      )
    },
    {
      Header: 'Gender',
      accessor: 'gender',
      Cell: ({ row }: CellProps<DataExample>) => (
        <Typography>{row.original.gender}</Typography>
      )
    },
    {
      Header: 'Nationality',
      accessor: 'nationality',
      Cell: ({ row }: CellProps<DataExample>) => (
        <Typography>{row.original.nationality}</Typography>
      )
    }
  ]
  return (
    <Stack spacing={5}>
      <AruiTable<DataExample>
        data={dataExample}
        columns={columnsExample}
        variant='grounded'
        getRowId={(row) => row.id}
      />
      <AruiTable<DataExample>
        data={dataExample}
        columns={columnsExample}
        variant='elevated'
        getRowId={(row) => row.id}
      />
    </Stack>
  )
}

export const LoadingStates: Story = () => {
  return (
    <Stack spacing={5}>
      <AruiTable columns={[]} data={[]} isLoading variant='grounded' />
      <AruiTable columns={[]} data={[]} isLoading variant='elevated' />
    </Stack>
  )
}

export const NotificationList: Story = () => {
  interface Notification {
    id: string
    message: string
    date: number
  }

  const dataNotifications: Notification[] = [
    {
      id: '1',
      message: 'Jean sent you a message',
      date: Date.now()
    },
    {
      id: '2',
      message: 'Jean sent you a message',
      date: Date.now()
    },
    {
      id: '3',
      message: 'Jean sent you a message',
      date: Date.now()
    },
    {
      id: '4',
      message: 'Jean sent you a message',
      date: Date.now()
    }
  ]

  const columnsNotification: Column<Notification>[] = [
    {
      Header: 'Notification list',
      id: 'notifications',
      Cell: ({ row }: CellProps<Notification>) => (
        <Stack direction='row' alignItems='center' spacing={2}>
          <Divider
            orientation='vertical'
            flexItem
            sx={{
              background: '#3C78D8',
              width: '3px',
              borderRadius: '15px',
              border: 'none',
              marginTop: '-5px',
              marginBottom: '-5px'
            }}
          />
          <Info
            sx={{
              color: '#3C78D8',
              width: '30px',
              height: '30px'
            }}
          />
          <Typography>{row.original.message}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography sx={{ color: 'rgba(0, 0, 0, 0.57)' }} variant='caption'>
            {new Date(row.original.date).toDateString()}
          </Typography>
        </Stack>
      )
    }
  ]
  return (
    <Stack>
      <AruiTable<Notification>
        data={dataNotifications}
        columns={columnsNotification}
        variant='grounded'
        onRowClicked={() => {}}
        getRowId={(row) => row.id}
      />
    </Stack>
  )
}

export const AxessExample: Story = () => {
  interface AxessData {
    id: string
    protocol: string
    sectors: string
    vintage: string
    marketprice: string
    purchaseprice: string
    gain: string
    quantity: string
    total: string
  }

  const axessData: AxessData[] = [
    {
      id: '1',
      protocol: 'Protocol name',
      sectors: 'Category, Category, Category',
      vintage: '-',
      marketprice: '500 $',
      purchaseprice: '300 $',
      gain: '+47%',
      quantity: '1000 tCO2e',
      total: '340 000 $'
    },
    {
      id: '2',
      protocol: 'Protocol name',
      sectors: 'Category, Category, Category',
      vintage: '-',
      marketprice: '500 $',
      purchaseprice: '300 $',
      gain: '+47%',
      quantity: '1000 tCO2e',
      total: '340 000 $'
    },
    {
      id: '3',
      protocol: 'Protocol name',
      sectors: 'Category, Category, Category',
      vintage: '-',
      marketprice: '500 $',
      purchaseprice: '300 $',
      gain: '+47%',
      quantity: '1000 tCO2e',
      total: '340 000 $'
    },
    {
      id: '4',
      protocol: 'Protocol name',
      sectors: 'Category, Category, Category',
      vintage: '-',
      marketprice: '500 $',
      purchaseprice: '300 $',
      gain: '+47%',
      quantity: '1 000 tCO2e',
      total: '340 000 $'
    }
  ]

  const axessColumns: Column<AxessData>[] = [
    {
      Header: 'Protocol',
      accessor: 'protocol',
      Cell: ({ row }: CellProps<AxessData>) => (
        <Typography variant='body2'>{row.original.protocol}</Typography>
      )
    },
    {
      Header: 'Sectors',
      accessor: 'sectors',
      Cell: ({ row }: CellProps<AxessData>) => (
        <Typography variant='body2'>{row.original.sectors}</Typography>
      )
    },
    {
      Header: 'Vintage',
      accessor: 'vintage',
      Cell: ({ row }: CellProps<AxessData>) => (
        <Typography variant='body2'>{row.original.vintage}</Typography>
      ),
      className: 'vintageColumn'
    },
    {
      Header: 'Mark. price',
      accessor: 'marketprice',
      Cell: ({ row }: CellProps<AxessData>) => (
        <Typography variant='body2'>{row.original.marketprice}</Typography>
      ),
      className: 'marketColumn'
    },
    {
      Header: 'Purch. price',
      accessor: 'purchaseprice',
      Cell: ({ row }: CellProps<AxessData>) => (
        <Typography variant='body2'>{row.original.purchaseprice}</Typography>
      ),
      Footer: () => <Typography variant='body2'>290 $</Typography>,
      className: 'dataColumn'
    },
    {
      Header: 'Gain',
      accessor: 'gain',
      Cell: ({ row }: CellProps<AxessData>) => (
        <Typography variant='body2'>{row.original.gain}</Typography>
      ),
      Footer: () => <Typography variant='body2'>+47%</Typography>,
      className: 'dataColumn'
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      Cell: ({ row }: CellProps<AxessData>) => (
        <Typography variant='body2'>{row.original.quantity}</Typography>
      ),
      Footer: () => <Typography variant='body2'>5 000 tCO2E</Typography>,
      className: 'dataColumn'
    },
    {
      Header: 'Total',
      accessor: 'total',
      Cell: ({ row }: CellProps<AxessData>) => (
        <Typography variant='subtitle2'>{row.original.total}</Typography>
      ),
      Footer: () => <Typography variant='subtitle2'>1 450 000 $</Typography>,
      className: 'dataColumn'
    }
  ]
  return (
    <Stack
      sx={{
        '& .vintageColumn': {
          textAlign: 'center'
        },
        '& .dataColumn': {
          textAlign: 'right'
        },
        '& .marketColumn': {
          textAlign: 'right'
        },
        '& .AruiTable-tableCell.dataColumn': {
          background: '#F2F3F5'
        },
        '& .AruiTable-tableHeaderRow': {
          background: '#404A68',
          color: 'white'
        },
        '& .AruiTable-tableHeaderCell': {
          color: 'white'
        },
        '& .AruiTable-tableFooterCell.dataColumn': {
          background: '#404A68',
          color: 'white'
        },
        '.AruiTable-rowHoveredComponentContainer': {
          width: 'fit-content',
          paddingRight: '10px',
          paddingLeft: '50px',
          right: '0px',
          background:
            'linear-gradient(270deg, #D9DBE1 84.38%, rgba(217, 219, 225, 0) 100%)',
          '& button': {
            color: 'black',
            fontSize: '1rem',
            fontWeight: 600
          }
        }
      }}
    >
      <AruiTable<AxessData>
        data={axessData}
        columns={axessColumns}
        getRowId={(row) => row.id}
        variant='grounded'
        setSelectedRowIds={(rows) => console.log(rows)}
        noToggleAllPageRowsSelected
        withFooter
        renderRowHoveredComponent={() => (
          <Stack direction='row' spacing={2} alignItems='center' height='100%'>
            <Button>Buy</Button>
            <Button>Sell</Button>
            <Button>Burn</Button>
          </Stack>
        )}
      />
    </Stack>
  )
}
