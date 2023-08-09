import React from 'react'
import {
  CodeHighlighter as AruiCodeHighlighter,
  CodeHighlighterProps
} from './CodeHighlighter'
import { Meta, StoryFn } from '@storybook/react'

const style = `export type darkStyles =
| 'atomOneDark'
| 'androidstudio'
| 'darcula'
| 'hopscotch'
| 'tomorrowNight'
export type lightStyles =
| 'atomOneLight'
| 'gruvboxLight'
| 'tomorrow'
`

export default {
  title: 'Documentation/CodeHighlighter',
  component: AruiCodeHighlighter,
  argTypes: {
    style: {
      table: {
        type: {
          detail: style
        }
      }
    }
  }
} as Meta

export const CodeHighlighter: StoryFn<CodeHighlighterProps> = (
  args: CodeHighlighterProps
) => <AruiCodeHighlighter {...args} />

CodeHighlighter.args = {
  code: `function test(arg: String) {
    console.log(arg)
  }`,
  language: 'typescript',
  title: 'Example'
}
CodeHighlighter.storyName = 'CodeHighlighter'

export const objectHiglighter: StoryFn = () => (
  <AruiCodeHighlighter
    object={{
      name: 'test',
      age: 18,
      do: (arg: String) => {
        console.log(arg)
      },
      child: {
        name: 'testChild',
        age: 5
      }
    }}
  />
)

objectHiglighter.storyName = 'object highlighter'

export const httpDefinition: StoryFn<CodeHighlighterProps> = (
  args: CodeHighlighterProps
) => <AruiCodeHighlighter {...args} />

httpDefinition.args = {
  object: [
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
httpDefinition.storyName = 'http definition'
