import React from 'react'
import { Chip as AruiChip, ChipBasicProps } from './Chip'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
export default {
  title: 'Components/Chip',
  component: AruiChip
} as Meta

export const Chip: Story<ChipBasicProps> = (args: ChipBasicProps) => {
  return <AruiChip {...args} />
}

Chip.args = {
  label: 'G2 chip',
  color: '#18159D',
  onDelete: () => {}
}

Chip.storyName = 'Chip'
