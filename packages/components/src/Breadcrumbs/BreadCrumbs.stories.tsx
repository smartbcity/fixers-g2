import React from 'react'
import { Breadcrumbs as AruiBreadcrumbs, BreadcrumbsProps } from './Breadcrumbs'
import { Meta, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
export default {
  title: 'Components/Breadcrumbs',
  component: AruiBreadcrumbs
} as Meta

export const Breadcrumbs: StoryFn<BreadcrumbsProps> = (
  args: BreadcrumbsProps
) => {
  return (
    <BrowserRouter>
      <AruiBreadcrumbs {...args} />
    </BrowserRouter>
  )
}

Breadcrumbs.args = {
  crumbs: [
    {
      label: 'link 1',
      url: ''
    },
    {
      label: 'link 2',
      url: ''
    },
    {
      label: 'link 3',
      url: ''
    },
    {
      label: 'currentPage',
      url: ''
    }
  ]
}

Breadcrumbs.storyName = 'Breadcrumbs'
