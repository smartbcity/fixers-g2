import React from 'react'
import { FilterButton, FilterButtonBasicProps } from './FilterButton'
import { Meta, StoryFn } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import { Box } from '@mui/material'

export default {
  title: 'Forms/FilterButton',
  component: FilterButton,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=2024%3A2001'
    }
  }
} as Meta

export const FilterButtonStory: StoryFn<FilterButtonBasicProps> = (
  args: FilterButtonBasicProps
) => {
  return <FilterButton {...args}>Filtrer</FilterButton>
}

export const FilterButtonVariants: StoryFn = () => {
  return (
    <Box display='flex' justifyContent='space-around' alignItems='center'>
      <Box display='flex' flexDirection='column' gap={5} alignItems='center'>
        <FilterButton color='primary' variant='outlined'>
          Primary outlined
        </FilterButton>
        <FilterButton color='secondary' variant='outlined'>
          Secondary outlined
        </FilterButton>
        <FilterButton color='default' variant='outlined'>
          Default outlined
        </FilterButton>
      </Box>
      <Box display='flex' flexDirection='column' gap={5} alignItems='center'>
        <FilterButton color='primary' variant='filled'>
          Primary filled
        </FilterButton>
        <FilterButton color='secondary' variant='filled'>
          Secondary filled
        </FilterButton>
        <FilterButton color='default' variant='filled'>
          Default filled
        </FilterButton>
      </Box>
    </Box>
  )
}

FilterButtonStory.args = {}

FilterButtonStory.storyName = 'FilterButton'
