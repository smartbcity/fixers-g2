import { Box } from '@mui/material'
import { makeG2STyles } from '@smartb/g2-themes'
import React, { useCallback, useMemo } from 'react'
import SyntaxHighlighter, {
  SyntaxHighlighterProps
} from 'react-syntax-highlighter'

const useStyles = makeG2STyles()({
  root: {
    ' span:hover span': {
      filter: 'brightness(1.2)'
    }
  }
})

export interface HttpDefinition {
  method: string
  path: string
  url: string
}

export interface HttpDefinitionHighlighterProps
  extends Omit<SyntaxHighlighterProps, 'children'> {
  httpDefinitions: HttpDefinition[]
}

export const HttpDefinitionHighlighter = (
  props: HttpDefinitionHighlighterProps
) => {
  const { httpDefinitions, ...other } = props
  const { classes } = useStyles()

  const body = useMemo(() => {
    return httpDefinitions.map((def) => `${def.method} ${def.path}`).join('\n')
  }, [httpDefinitions])

  const lineProps = useCallback(
    (lineNumber: number) => ({
      style: { cursor: 'pointer', display: 'block', marginLeft: 15 },
      onClick() {
        const url = httpDefinitions[lineNumber].url
        if (url) {
          const link = document.createElement('a')
          link.href = httpDefinitions[lineNumber].url
          link.click()
        }
      }
    }),
    [httpDefinitions]
  )

  return (
    <Box className={classes.root}>
      <SyntaxHighlighter
        {...other}
        language='curl'
        wrapLines
        showLineNumbers
        startingLineNumber={0}
        lineNumberStyle={{ display: 'none' }}
        lineProps={lineProps}
      >
        {body}
      </SyntaxHighlighter>
    </Box>
  )
}
