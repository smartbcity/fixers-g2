import React from 'react'
import { highLevelStyles } from '@smartb/archetypes-ui-themes'
import { DocsContainer } from '@storybook/addon-docs'

const useStyles = highLevelStyles()({
  markdownBody: {
    '& .sbdocs-p': {
      margin: 0,
      marginBottom: '10px',
      fontSize: '14px'
    },
    '& .sbdocs-h1, & .sbdocs-h2, & .sbdocs-h3, & .sbdocs-h4, & .sbdocs-h5, & .sbdocs-h6':
      {
        marginTop: '20px',
        marginBottom: '13px'
      },
    '& .sbdocs-hr': {
      height: '.15em',
      margin: '15px 0',
      background: '#b7c0c9',
      borderRadius: '20px',
      border: 'none'
    },
    '& article': {
      padding: '15px 0',
      borderBottom: 'solid 1px #b7c0c9'
    },
    '& article p:last-of-type': {
      margin: 0
    },
    '& article:last-of-type': {
      borderBottom: 'none'
    },
    '& blockquote': {
      margin: '10px 0'
    },
    '& .sbdocs-a:hover': {
      textDecoration: 'underline'
    },
    '& .sbdocs-a code': {
      color: '#1EA7FD'
    }
  }
})

export const StorybookCanvas = ({ children, context }: any) => {
  const classes = useStyles()
  return (
    <DocsContainer context={context}>
      <div className={classes.markdownBody}>{children}</div>
    </DocsContainer>
  )
}
