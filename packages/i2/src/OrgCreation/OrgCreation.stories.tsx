import { Meta } from '@storybook/react'
import React from 'react'
import { OrgCreation, OrgCreationProps } from './OrgCreation'
import { Story } from '@storybook/react/types-6-0'
import { getOrganization } from './getOrganization'

export default {
  title: 'I2/OrgCreation',
  component: OrgCreation
} as Meta

export const OrgCreationStory: Story<OrgCreationProps> = (
  args: OrgCreationProps
) => {
  return <OrgCreation {...args} />
}

OrgCreationStory.args = {
  onSubmit: (org) => console.log(org),
  getInseeOrganization: getOrganization
}

OrgCreationStory.storyName = 'OrgCreation'
