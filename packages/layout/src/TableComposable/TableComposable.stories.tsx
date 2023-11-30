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
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim identifier est laborum.'

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
    type: ['construction'],
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
    type: ['installation'],
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
    type: ['installation', 'preparation'],
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
        identifier: 'name',
        name: {
          en: 'Project name',
          fr: 'Nom du projet'
        },
        type: 'text'
      },
      {
        identifier: 'description',
        name: {
          en: 'Project description',
          fr: 'Description du projet'
        },
        type: 'text'
      },
      {
        identifier: 'contact',
        name: {
          en: 'Contacts',
          fr: 'Contacts'
        },
        type: 'contact',
        style: {
          width: 150
        }
      },
      {
        identifier: 'homepage',
        name: {
          en: 'Home Page',
          fr: "Page d'acceuil"
        },
        type: 'link',
        style: {
          width: 150
        }
      },
      {
        identifier: 'type',
        name: {
          en: 'Type',
          fr: 'Type'
        },
        type: 'chip',
        properties: {
          multiple: true,
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
        identifier: 'status',
        name: {
          en: 'Status',
          fr: 'Status'
        },
        type: 'status',
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

// const table: TableComposableType = {
//   id: 'projectsTable',
//   columns: [
//     {
//       identifier: 'identifier',
//       name: {
//         en: 'ID',
//         fr: 'ID'
//       },
//       type: 'text',
//       style: {
//        width: 100
//       }
//     },
//     {
//       identifier: 'name',
//       name: {
//         en: 'Name',
//         fr: 'Nom'
//       },
//       type: 'text',
//     },
//     {
//       identifier: 'registry',
//       name: {
//         en: 'Registry',
//         fr: 'Registry'
//       },
//       type: 'text',
//     },
//     {
//       identifier: 'proponent',
//       name: {
//         en: 'Proponent',
//         fr: "Proponent"
//       },
//       type: 'text',
//     },
//     {
//       identifier: 'scope',
//       name: {
//         en: 'Sectoral scope',
//         fr: "Secteur d'impact"
//       },
//       type: 'iconTag',
//       properties: {
//         options: [
//           {
//             key: 'transport',
//             locale: {
//               en: 'Transport',
//               fr: 'Transport',
//             },
//             icon: "https://example.com/",
//             color: '#18159D'
//           },
//           {
//             key: 'transport',
//             locale: {
//               en: 'Transport',
//               fr: 'Transport',
//             },
//             icon: "https://example.com/",
//             color: '#18159D'
//           },
//         ]
//       }
//     },
//     {
//       identifier: 'area',
//       name: {
//         en: 'Area',
//         fr: "Zone"
//       },
//       type: 'location',
//     },
//     {
//       identifier: 'refYear',
//       name: {
//         en: 'Ref.Year',
//         fr: "Année de référence"
//       },
//       type: 'text',
//     },
//     {
//       identifier: 'endDate',
//       name: {
//         en: 'End date',
//         fr: "Date de fin"
//       },
//       type: 'date',
//     },
//     {
//       identifier: 'status',
//       name: {
//         en: 'Status',
//         fr: 'Status'
//       },
//       type: 'status',
//       properties: {
//         options: [
//           {
//             key: 'notStarted',
//             locale: {
//               en: 'Registration and Verification Approval Requested',
//               fr: 'Approbation d’enregistrement et de vérification demandée',
//             },
//             color: '#3C78D8'
//           },
//           {
//             key: 'inProgress',
//             locale: {
//               en: 'Crediting Period Renewal and Verification Approval Requested',
//               fr: 'Renouvellement de la période de crédit et approbation de la vérification demandée',
//             },
//             color: '#FF9900'
//           },
//         ]
//       }
//     }
//   ]
// }
