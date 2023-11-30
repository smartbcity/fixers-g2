import React from 'react'
import {
  HttpDefinitionHighlighter,
  HttpDefinitionHighlighterProps
} from './HttpDefinitionHighlighter'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Documentation/HttpDefinitionHighlighter',
  component: HttpDefinitionHighlighter
} as Meta

export const httpDefinitionHighlighter: StoryFn<
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
