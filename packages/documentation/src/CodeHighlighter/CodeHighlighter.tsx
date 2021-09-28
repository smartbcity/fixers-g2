import React from 'react'
import SyntaxHighlighter, {
  SyntaxHighlighterProps
} from 'react-syntax-highlighter'
import {
  atomOneDark,
  androidstudio,
  atomOneLight,
  darcula,
  gruvboxLight,
  hopscotch,
  tomorrowNight,
  tomorrow
} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import stringifyObject from 'stringify-object'
import { useMemo } from 'react'
import { BasicProps, lowLevelStyles } from '@smartb/g2-themes'
import { Box, Typography } from  '@mui/material'
import clsx from 'clsx'

const useStyles = lowLevelStyles()({
  root: {
    '& pre': {
      borderRadius: '4px',
      margin: 0
    }
  },
  rootWithTitle: {
    '& pre': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    }
  },
  titleContainer: {
    background: '#e9e9e9',
    color: 'rgb(40, 44, 52, 0.7)',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px'
  }
})

export type darkStyles =
  | 'atomOneDark'
  | 'androidstudio'
  | 'darcula'
  | 'hopscotch'
  | 'tomorrowNight'
export type lightStyles = 'atomOneLight' | 'gruvboxLight' | 'tomorrow'

const highlightStyleMap = new Map<darkStyles | lightStyles, any>([
  ['atomOneDark', atomOneDark],
  ['androidstudio', androidstudio],
  ['atomOneLight', atomOneLight],
  ['darcula', darcula],
  ['gruvboxLight', gruvboxLight],
  ['hopscotch', hopscotch],
  ['tomorrowNight', tomorrowNight],
  ['tomorrow', tomorrow]
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
   * @default "atomOneDark"
   */
  highlightStyle?: darkStyles | lightStyles
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
    highlightStyle = 'atomOneDark',
    title,
    style,
    className,
    id,
    ...other
  } = props
  const classes = useStyles()
  const formatedObject = useMemo(() => {
    if (!object) return
    return stringifyObject(object, {
      indent: '  ',
      singleQuotes: false
    })
  }, [object])

  const selectedStyle = useMemo(
    () => highlightStyleMap.get(highlightStyle),
    [highlightStyle]
  )

  return (
    <Box
      style={style}
      className={clsx(
        className,
        classes.root,
        title && classes.rootWithTitle,
        'AruiCodeHighlighter-root'
      )}
      id={id}
    >
      {title && (
        <Box
          className={clsx(
            classes.titleContainer,
            'AruiCodeHighlighter-titleContainer'
          )}
          width='100%'
          padding='0.4em 0.5em'
          boxSizing='border-box'
        >
          <Typography className={'AruiCodeHighlighter-title'} variant='body2'>
            {title}
          </Typography>
        </Box>
      )}
      <SyntaxHighlighter language='typescript' {...other} style={selectedStyle}>
        {code ?? formatedObject ?? children}
      </SyntaxHighlighter>
    </Box>
  )
}
