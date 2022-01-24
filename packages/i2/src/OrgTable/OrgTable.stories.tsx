import { Meta } from '@storybook/react'
import React from 'react'
import { OrgTable, OrgTableProps } from './OrgTable'
import { Story } from '@storybook/react/types-6-0'
import { Organization } from '../OrgCreation/OrgCreation'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import { Stack, Typography } from '@mui/material'

export default {
  title: 'I2/OrgTable',
  component: OrgTable,
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Stack>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Components' story='Table'>
                Table
              </LinkTo>
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Forms' story='Filters'>
                Filters
              </LinkTo>
            </Typography>
          </Stack>
        </>
      )
    }
  }
} as Meta

export const OrgTableStory: Story<OrgTableProps> = (args: OrgTableProps) => {
  return <OrgTable {...args} />
}

const organizations: Organization[] = [
  {
    name: 'Smartb',
    address: '2 Rue du Pavillon',
    postalCode: 34000,
    city: 'Montpellier',
    siret: 12345678912345,
    webSite: 'https://smartb.city'
  },
  {
    name: 'Smartb',
    address: '2 Rue du Pavillon',
    postalCode: 34000,
    city: 'Montpellier',
    siret: 12345678912345,
    webSite: 'https://smartb.city'
  }
]

OrgTableStory.args = {
  organizations: organizations,
  totalPages: 10,
  onFetchOrganizations: (page, search) => console.log(page, search)
}

OrgTableStory.storyName = 'OrgTable'
