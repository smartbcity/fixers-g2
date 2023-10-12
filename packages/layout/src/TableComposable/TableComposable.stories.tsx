import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { TableV2 as AruiTableV2, TableV2BasicProps } from '../TableV2'
import { useTableComposable } from './useTableComposable'

import { TableComposable as TableComposableType } from './composable'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Layout/TableComposable',
  component: AruiTableV2
} as Meta

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const data: any[] = [
  {
    name: 'Example 1',
    description: loremIpsum,
    contact: {
      email: 'project@project.com',
      phone: '1020304050'
    },
    homePage: {
      label: 'Home page',
      url: 'https://example.com/'
    },
    type: 'construction',
    status: 'inProgress'
  },
  {
    name: 'Example 2',
    description: loremIpsum,
    contact: {
      email: 'project@project.com',
      phone: '1020304050'
    },
    homePage: {
      label: 'Home page',
      url: 'https://example.com/'
    },
    type: 'installation',
    status: 'notStarted'
  },
  {
    name: 'Example 3',
    description: loremIpsum,
    contact: {
      email: 'project@project.com',
      phone: '1020304050'
    },
    homePage: {
      label: 'Home page',
      url: 'https://example.com/'
    },
    type: 'preparation',
    status: 'finish'
  }
]

export const TableComposable: StoryFn<TableV2BasicProps> = (
  args: TableV2BasicProps
) => {
  const table: TableComposableType = {
    id: 'projectsTable',
    name: {
      en: 'Projects table',
      fr: 'Tableau des projets'
    },
    columns: [
      {
        id: 'name',
        name: {
          en: 'Project name',
          fr: 'Nom du projet'
        },
        type: 'text',
        identifier: 'name'
      },
      {
        id: 'description',
        name: {
          en: 'Project description',
          fr: 'Description du projet'
        },
        type: 'text',
        identifier: 'description'
      },
      {
        id: 'contact',
        name: {
          en: 'Contacts',
          fr: 'Contacts'
        },
        type: 'contact',
        identifier: 'contact',
        style: {
          width: 150
        }
      },
      {
        id: 'homepage',
        name: {
          en: 'Home Page',
          fr: "Page d'acceuil"
        },
        type: 'link',
        identifier: 'homePage',
        style: {
          width: 150
        }
      },
      {
        id: 'type',
        name: {
          en: 'Type',
          fr: 'Type'
        },
        type: 'chip',
        identifier: 'type',
        properties: {
          options: [
            {
              key: 'construction',
              label: 'Construction',
              color: '#18159D'
            },
            {
              key: 'installation',
              label: 'Installation',
              color: '#18159D'
            },
            {
              key: 'preparation',
              label: 'Preparation',
              color: '#18159D'
            }
          ]
        }
      },
      {
        id: 'status',
        name: {
          en: 'Status',
          fr: 'Status'
        },
        type: 'status',
        identifier: 'status',
        properties: {
          options: [
            {
              key: 'notStarted',
              label: 'Not started',
              color: '#3C78D8'
            },
            {
              key: 'inProgress',
              label: 'in progress',
              color: '#FF9900'
            },
            {
              key: 'finish',
              label: 'Done',
              color: '#159D50'
            }
          ]
        }
      }
    ]
  }

  const tableState = useTableComposable({
    data: data,
    tableComposable: table
  })
  return (
    <BrowserRouter>
      <AruiTableV2 tableState={tableState} {...args} />
    </BrowserRouter>
  )
}
