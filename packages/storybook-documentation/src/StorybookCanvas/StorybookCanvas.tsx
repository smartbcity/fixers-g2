import React from 'react'
import { makeG2STyles } from '@smartb/g2-themes'
import { DocsContainer } from '@storybook/addon-docs'
import './font.css'

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
      margin: '0',
      marginTop: '8px'
    },
    '& .sbdocs-h1, & .sbdocs-h2': {
      fontSize: '2.25rem',
      marginBottom: '20px',
      padding: 'unset',
      fontWeight: 700
    },
    '& .sbdocs-h2': {
      fontSize: '1.625rem'
    },
    '& .sbdocs-h3': {
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
      margin: '25px 0',
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
    '& .sbdocs-wrapper': {
      padding: '2rem 15px'
    },
    '& .sbdocs-content': {
      maxWidth: '1200px'
    },
    '& .AruiDescriptedCode-root': {
      width: '100%',
      marginLeft: '-15px',
      padding: '20px 15px',
      marginBottom: '30px'
    },
    '& .sbdocs-content .AruiDescriptedCode-root:nth-of-type(odd)': {
      background: '#fafcfc'
    }
  }
})

export const StorybookCanvas = ({ children, context }: any) => {
  const { classes } = useStyles()
  return (
    <div className={classes.markdownBody}>
      <DocsContainer context={context}>{children}</DocsContainer>
    </div>
  )
}
