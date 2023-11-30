import React from 'react'
import {
  CopyToClipboard as AruiCopyToClipboard,
  CopyToClipboardBasicProps
} from './CopyToClipboard'
import { Meta, StoryFn } from '@storybook/react'
import { styles, classes } from './docs'

export default {
  title: 'Components/CopyToClipboard',
  component: AruiCopyToClipboard,
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'CopyToClipboardClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'CopyToClipboardStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const CopyToClipboard: StoryFn<CopyToClipboardBasicProps> = (
  args: CopyToClipboardBasicProps
) => {
  return <AruiCopyToClipboard {...args} />
}

CopyToClipboard.args = {
  value: 'example'
}

CopyToClipboard.storyName = 'CopyToClipboard'
