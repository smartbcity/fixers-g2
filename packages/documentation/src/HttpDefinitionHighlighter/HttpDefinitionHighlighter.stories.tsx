import React from 'react'
import {
  HttpDefinitionHighlighter,
  HttpDefinitionHighlighterProps
} from './HttpDefinitionHighlighter'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'

export default {
  title: 'Documentation/HttpDefinitionHighlighter',
  component: HttpDefinitionHighlighter
} as Meta

export const httpDefinitionHighlighter: Story<
  HttpDefinitionHighlighterProps
> = (args: HttpDefinitionHighlighterProps) => (
  <HttpDefinitionHighlighter {...args} />
)

httpDefinitionHighlighter.args = {
  httpDefinitions: [
    {
      method: 'POST',
      path: '/fileUpload',
      url: '#fileUpload'
    },
    {
      method: 'DELETE',
      path: '/fileDelete',
      url: 'https://docs.smartb.city/g2'
    }
  ],
  language: 'http-definition',
  title: 'Example'
}
httpDefinitionHighlighter.storyName = 'HttpDefinitionHighlighter'
