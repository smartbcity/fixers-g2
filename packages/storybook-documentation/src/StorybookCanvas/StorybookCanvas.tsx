import React from 'react'
import { makeG2STyles } from '@smartb/g2-themes'
import { DocsContainer } from '@storybook/addon-docs'

const useStyles = makeG2STyles()({
  markdownBody: {
    '& .sbdocs': {
      fontFamily: "'Montserrat', sans-serif",
      color: '#353945',
      fontWeight: 500
    },
    '& code': {
      fontFamily:
        'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace'
    },
    '& pre code': {
      fontFamily: 'monospace'
    },
    '& .sbdocs-p': {
      margin: '8px 0'
    },
    '& .sbdocs-h1, & .sbdocs-h2': {
      fontSize: '2.25rem',
      marginBottom: '16px',
      padding: 'unset',
      fontWeight: 700
    },
    '& .sbdocs-h2': {
      fontSize: '1.625rem'
    },
    '& .sbdocs-h3': {
      marginBottom: '10px',
      fontSize: '1.25rem',
      fontWeight: 600
    },
    '& .sbdocs-h4': {
      fontSize: '1rem',
      fontWeight: 600
    },
    '& .sbdocs-h1, & .sbdocs-h2, & .sbdocs-h3, & .sbdocs-h4, & .sbdocs-h5, & .sbdocs-h6':
      {
        borderBottom: 'unset'
      },
    '& .sbdocs-a:hover': {
      textDecoration: 'underline'
    },
    '& .sbdocs-a code': {
      color: '#4174b0'
    },
    '& .sbdocs-a': {
      color: '#4174b0'
    },
    '& .sbdocs-li::marker': {
      fontSize: '12px',
      paddingBottom: '2px'
    },
    '& .sbdocs-hr': {
      height: '0px',
      margin: '38px 0',
      borderTop: '1px solid #EEEEEE'
    },
    '& em': {
      color: 'rgba(53, 57, 69, 0.75)',
      fontWeight: 600
    },
    '& .spacer': {
      margin: '38px 0',
      height: '1px',
      width: '100%'
    },
    '& .AruiSegmentedContainer-root .sbdocs-hr': {
      margin: '24px 0'
    },
    '& .AruiSegmentedContainer-root .spacer': {
      margin: '24px 0'
    },
    '& .AruiSegmentedContainer-root': {
      margin: '20px 0px'
    },
    '& blockquote': {
      margin: '10px 0'
    },
    '& .sbdocs-wrapper': {
      padding: '2rem 15px'
    },
    '& .sbdocs-content': {
      maxWidth: '1200px'
    }
  }
})

export const StorybookCanvas = ({ children, context }: any) => {
  const { classes } = useStyles()
  return (
    <div className={classes.markdownBody}>
      {/* @ts-ignore */}
      <DocsContainer context={context}>{children}</DocsContainer>
    </div>
  )
}
