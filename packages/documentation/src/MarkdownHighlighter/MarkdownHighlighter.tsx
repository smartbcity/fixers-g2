import React from 'react'
import ReactMarkdown from 'react-markdown'
import { CodeHighlighter } from '../CodeHighlighter'
import 'github-markdown-css'
import { makeG2STyles } from '@smartb/g2-themes'
import clsx from 'clsx'
import gfm from 'remark-gfm'
import raw from 'rehype-raw'

const useStyles = makeG2STyles()({
  markdown: {
    fontSize: '14px',
    lineHeight: '22px',
    fontFamily:
      '"Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif',
    '& pre': {
      backgroundColor: 'unset',
      padding: '0',
      marginBottom: '8px'
    },
    '& img': {
      width: '100%',
      maxWidth: '300px'
    },
    '& p': {
      marginBottom: '10px'
    },
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      marginTop: '20px',
      marginBottom: '13px',
      fontWeight: 700
    },
    '& h1': {
      fontWeight: 800
    },
    '& hr': {
      height: '.15em',
      margin: '15px 0',
      background: '#b7c0c9',
      borderRadius: '20px'
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
    '& code': {
      margin: '0 2px',
      padding: '3px 5px',
      borderRadius: '3px',
      border: '1px solid #EEEEEE',
      backgroundColor: '#F8F8F8'
    }
  }
})

export interface MarkdownHighlighterProps {
  /**
   * The markdown string to render
   */
  markdown: string
  /**
   * The className applied to the root element
   */
  className?: string
}

const components = {
  //@ts-ignore
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <CodeHighlighter
        language={match[1]}
        code={String(children).replace(/\n$/, '')}
        {...props}
      />
    ) : (
      <code className={className} {...props} children={children} />
    )
  },
  mark: (object: any) => {
    return (
      <mark style={{ backgroundColor: object.color }}>{object.children}</mark>
    )
  }
}

export const MarkdownHighlighter = (props: MarkdownHighlighterProps) => {
  const { markdown, className } = props
  const { classes } = useStyles()
  return (
    <ReactMarkdown
      className={clsx('markdown-body', classes.markdown, className)}
      remarkPlugins={[[gfm, { singleTilde: false }]]}
      rehypePlugins={[raw]}
      //@ts-ignore
      components={components}
      children={markdown}
    />
  )
}
