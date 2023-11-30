import React from 'react'
import { Chip as AruiChip, ChipBasicProps } from './Chip'
import { Meta, StoryFn } from '@storybook/react'
export default {
  title: 'Components/Chip',
  component: AruiChip
} as Meta

export const Chip: StoryFn<ChipBasicProps> = (args: ChipBasicProps) => {
  return <AruiChip {...args} />
}

Chip.args = {
  label: 'G2 chip',
  color: '#18159D',
  onDelete: () => {}
}

Chip.storyName = 'Chip'
