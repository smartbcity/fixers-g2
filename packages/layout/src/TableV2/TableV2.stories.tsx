import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { TableV2 as AruiTableV2, TableV2BasicProps } from './TableV2'
import { G2ColumnDef, useTable } from './useTable'

import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { Info } from '@mui/icons-material'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnFactory } from '../ColumnFactory'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Layout/TableV2',
  component: AruiTableV2
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

const columns: ColumnDef<Data>[] = [
  {
    header: 'Id',
    id: 'id',
    cell: ({ row }) => <Typography>{row.original.id}</Typography>
  },
  {
    header: 'Name',
    id: 'name',
    cell: ({ row }) => <Typography>{row.original.name}</Typography>
  },
  {
    header: 'Is he relax ?',
    id: 'isRelaxed',
    cell: ({ row }) => (
      <Typography>{row.original.isRelaxed ? 'yes' : 'no'}</Typography>
    )
  }
]

export const TableV2: StoryFn<TableV2BasicProps<Data>> = (
  args: TableV2BasicProps<Data>
) => {
  const [page, setPage] = useState<number>(1)
  const tableState = useTable({
    data: page === 1 ? data1 : data2,
    columns: columns,
    enableExpanding: true,
    enableRowSelection: true,
    getRowId: (row) => row.id
  })
  return (
    <AruiTableV2
      page={page}
      totalPages={2}
      onPageChange={(newPage) => setPage(newPage)}
      tableState={tableState}
      {...args}
    />
  )
}

TableV2.args = {
  getRowId: (row) => row.id,
  renderSubComponent: (row) => (
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

export const theVariants: StoryFn = () => {
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

  const columnsExample: ColumnDef<DataExample>[] = [
    {
      header: 'Name',
      id: 'name',
      cell: ({ row }) => <Typography>{row.original.name}</Typography>
    },
    {
      header: 'Age',
      id: 'age',
      cell: ({ row }) => <Typography>{row.original.age}</Typography>
    },
    {
      header: 'Gender',
      id: 'gender',
      cell: ({ row }) => <Typography>{row.original.gender}</Typography>
    },
    {
      header: 'Nationality',
      id: 'nationality',
      cell: ({ row }) => <Typography>{row.original.nationality}</Typography>
    }
  ]
  const tableState = useTable({
    data: dataExample,
    columns: columnsExample
  })
  return (
    <Stack spacing={5}>
      <AruiTableV2<DataExample>
        tableState={tableState}
        variant='grounded'
        getRowId={(row) => row.id}
      />
      <AruiTableV2<DataExample>
        tableState={tableState}
        variant='elevated'
        getRowId={(row) => row.id}
      />
    </Stack>
  )
}

export const LoadingStates: StoryFn = () => {
  const tableState = useTable({
    data: [],
    columns: []
  })
  return (
    <Stack spacing={5}>
      <AruiTableV2 tableState={tableState} isLoading variant='grounded' />
      <AruiTableV2 tableState={tableState} isLoading variant='elevated' />
    </Stack>
  )
}

export const NotificationList: StoryFn = () => {
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

  const columnsNotification: ColumnDef<Notification>[] = [
    {
      header: 'Notification list',
      id: 'notifications',
      cell: ({ row }) => (
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
  const tableState = useTable({
    data: dataNotifications,
    columns: columnsNotification
  })
  return (
    <Stack>
      <AruiTableV2<Notification>
        tableState={tableState}
        variant='grounded'
        onRowClicked={() => {}}
        getRowId={(row) => row.id}
      />
    </Stack>
  )
}

export const AxessExample: StoryFn = () => {
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

  const axessColumns: G2ColumnDef<AxessData>[] = [
    {
      header: 'Protocol',
      id: 'protocol',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.protocol}</Typography>
      )
    },
    {
      header: 'Sectors',
      id: 'sectors',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.sectors}</Typography>
      )
    },
    {
      header: 'Vintage',
      id: 'vintage',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.vintage}</Typography>
      ),
      className: 'vintageColumn'
    },
    {
      header: 'Mark. price',
      id: 'marketprice',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.marketprice}</Typography>
      ),
      className: 'marketColumn'
    },
    {
      header: 'Purch. price',
      id: 'purchaseprice',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.purchaseprice}</Typography>
      ),
      footer: () => <Typography variant='body2'>290 $</Typography>,
      className: 'dataColumn'
    },
    {
      header: 'Gain',
      id: 'gain',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.gain}</Typography>
      ),
      footer: () => <Typography variant='body2'>+47%</Typography>,
      className: 'dataColumn'
    },
    {
      header: 'Quantity',
      id: 'quantity',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.quantity}</Typography>
      ),
      footer: () => <Typography variant='body2'>5 000 tCO2E</Typography>,
      className: 'dataColumn'
    },
    {
      header: 'Total',
      id: 'total',
      cell: ({ row }) => (
        <Typography variant='subtitle2'>{row.original.total}</Typography>
      ),
      footer: () => <Typography variant='subtitle2'>1 450 000 $</Typography>,
      className: 'dataColumn'
    }
  ]
  const tableState = useTable({
    data: axessData,
    columns: axessColumns,
    noToggleAllPageRowsSelected: true,
    enableRowSelection: true
  })
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
      <AruiTableV2<AxessData>
        tableState={tableState}
        getRowId={(row) => row.id}
        variant='grounded'
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

export const ColumnFactoryExample: StoryFn = () => {
  interface Person {
    id: string
    firstName: string
    lastName: string
    birthDate: number
    phone: string
    email: string
    city: string
  }

  const persons: Person[] = [
    {
      id: '1',
      firstName: 'Jack',
      lastName: 'Burdon',
      birthDate: Date.now(),
      email: 'jack@burdon.com',
      phone: '0610203040',
      city: 'Montpellier'
    },
    {
      id: '2',
      firstName: 'Alice',
      lastName: 'Brace',
      birthDate: Date.now(),
      email: 'alice@brace.com',
      phone: '0610203040',
      city: 'Montpellier'
    },
    {
      id: '3',
      firstName: 'Henri',
      lastName: 'Rutelle',
      birthDate: Date.now(),
      email: 'heanri@rutelle.com',
      phone: '0610203040',
      city: 'Montpellier'
    }
  ]

  const columns = ColumnFactory<Person>({
    generateColumns: (generators) => [
      generators.profile({
        id: 'profile',
        header: 'Profile',
        getCellProps: (person) => ({
          givenName: person.firstName,
          familyName: person.lastName
        })
      }),

      generators.date({
        id: 'birthDate',
        header: 'Birth date',
        getCellProps: (person) => ({
          date: person.birthDate
        })
      }),

      generators.text({
        id: 'city',
        header: 'City',
        getCellProps: (person) => ({
          value: person.city
        })
      }),

      generators.contact({
        id: 'contact',
        header: 'Contact',
        getCellProps: (person) => ({
          email: person.email,
          phone: person.phone
        })
      })
    ]
  })
  const tableState = useTable({
    data: persons,
    columns: columns,
    noToggleAllPageRowsSelected: true,
    enableRowSelection: true
  })
  return (
    <Stack>
      <BrowserRouter>
        <AruiTableV2
          getRowLink={() => ({
            to: 'https://tanstack.com/table/v8/docs/examples/react/row-dnd'
          })}
          tableState={tableState}
        />
      </BrowserRouter>
    </Stack>
  )
}
