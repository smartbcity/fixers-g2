import { cx } from '@emotion/css'
import { Box, Typography } from '@mui/material'
import { BasicProps } from '@smartb/g2-themes'
import React, { useMemo } from 'react'
import SyntaxHighlighter, {
  SyntaxHighlighterProps
} from 'react-syntax-highlighter'
import {
  atomOneDark,
  atomOneLight
} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import a11yDark from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark'
import a11yLight from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-light'
import { HttpDefinitionHighlighter } from '../HttpDefinitionHighlighter'

export type Sytles =
  | 'a11y-dark'
  | 'a11y-light'
  | 'atome-one-light'
  | 'atome-one-dark'
  | 'gruvbox-dark'
  | 'gruvbox-light'

const highlightStyleMap = new Map<Sytles, any>([
  ['atome-one-dark', atomOneDark],
  ['atome-one-light', atomOneLight],
  ['a11y-dark', a11yDark],
  ['a11y-light', a11yLight]
])

export interface CodeHighlighterProps
  extends Omit<SyntaxHighlighterProps, 'style'>,
    BasicProps {
  /**
   * The code to highlight
   */
  code?: string
  /**
   * The javascript object to highlight. The prop `code` has the display priority. The object is automaticaly stringified and formated properly
   */
  object?: Object
  /**
   * the language of the code
   * @default "typescript"
   */
  language?: string
  /**
   * the stye of the highlight
   * @default "a11y-dark"
   */
  highlightStyle?: Sytles
  /**
   * the title displayed in an header above the component
   */
  title?: string
}

export const CodeHighlighter = (props: CodeHighlighterProps) => {
  const {
    code,
    children,
    object,
    highlightStyle = 'atome-one-dark',
    title,
    style,
    className,
    id,
    language = 'typescript',
    ...other
  } = props
  const formatedObject = useMemo(() => {
    if (!object) return
    return JSON.stringify(object, undefined, 2)
  }, [object])

  const selectedStyle = useMemo(
    () => highlightStyleMap.get(highlightStyle),
    [highlightStyle]
  )

  const body = useMemo(() => {
    switch (language) {
      case 'http-definition':
        return (
          <HttpDefinitionHighlighter
            {...other}
            language={language}
            style={selectedStyle}
            httpDefinitions={object as any}
          />
        )
      default:
        return (
          <SyntaxHighlighter
            {...other}
            language={language}
            style={selectedStyle}
          >
            {code ?? formatedObject ?? children}
          </SyntaxHighlighter>
        )
    }
  }, [language, code, formatedObject, children, selectedStyle])

  return (
    <Box
      style={style}
      className={cx('AruiCodeHighlighter-root', className)}
      sx={{
        '& pre': {
          borderRadius: '8px',
          border: '1px solid #EEEEEE',
          margin: 0,
          padding: '16px !important',
          ...(title
            ? {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderTop: '0px solid #EEEEEE'
              }
            : {})
        }
      }}
      id={id}
    >
      {title && (
        <Box
          className='AruiCodeHighlighter-titleContainer'
          sx={{
            width: '100%',
            padding: '8px 16px',
            boxSizing: 'border-box',
            background: '#FEF9EE',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            border: '1px solid #EEEEEE'
          }}
        >
          <Typography className='AruiCodeHighlighter-title' variant='subtitle1'>
            {title}
          </Typography>
        </Box>
      )}
      {body}
    </Box>
  )
}
