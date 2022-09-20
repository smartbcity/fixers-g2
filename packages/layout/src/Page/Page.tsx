import { Box, BoxProps } from '@mui/material'
import { Actions, ActionsProps } from '@smartb/g2-components'
import React, { useMemo } from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { Header, HeaderProps } from '../Header'
import { cx } from '@emotion/css'

export interface PageBasicProps extends BasicProps {
  /**
   * the page content
   */
  children?: React.ReactNode
  /**
   * the props passed to the header
   */
  headerProps?: HeaderProps
  /**
   * if true the content will be wrap in a flex column container with a normalized gap between the children
   * @default false
   */
  flexContent?: boolean
  /**
   * the actions displayed at the bottom of the component.
   */
  bottomActionsProps?: ActionsProps
}

export type PageProps = MergeMuiElementProps<BoxProps, PageBasicProps>

export const Page = (props: PageProps) => {
  const {
    children,
    headerProps,
    bottomActionsProps,
    className,
    flexContent = false,
    sx,
    ...other
  } = props

  const actionsDisplay = useMemo(() => {
    if (!bottomActionsProps) return undefined
    return (
      <Actions
        {...bottomActionsProps}
        sx={{
          marginTop: !flexContent ? (theme) => theme.spacing(4) : ''
        }}
      />
    )
  }, [bottomActionsProps, flexContent])

  const headerDisplay = useMemo(() => {
    if (!headerProps) return undefined
    return <Header strongPadding {...headerProps} />
  }, [headerProps])

  return (
    <>
      {headerDisplay}
      <Box
        className='AruiPage-pageCenterer'
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          className={cx('AruiPage-root', className)}
          sx={{
            padding: (theme) => theme.spacing(5),
            maxWidth: '1700px',
            width: '100%',
            flexGrow: 1,
            display: flexContent ? 'flex' : '',
            flexDirection: flexContent ? 'column' : undefined,
            gap: flexContent ? (theme) => theme.spacing(4) : '',
            ...sx
          }}
          {...other}
        >
          {children}
          {actionsDisplay}
        </Box>
      </Box>
    </>
  )
}
