import { Box, BoxProps, useTheme } from '@mui/material'
import { Actions, ActionsProps } from '@smartb/g2-components'
import React, { useContext, useMemo } from 'react'
import {
  BasicProps,
  MergeMuiElementProps,
  ThemeContext
} from '@smartb/g2-themes'
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

  const theme = useTheme()
  const { theme: g2Theme, openDrawer } = useContext(ThemeContext)

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
    return (
      <Header
        strongPadding
        {...headerProps}
        sx={{
          left: g2Theme.permanentHeader ? 0 : undefined,
          // padding: g2Theme.permanentHeader ? (theme) => theme.spacing(2, 5) : undefined,
          paddingLeft:
            g2Theme.permanentHeader && !openDrawer
              ? `${g2Theme.drawerWidth + 40}px`
              : undefined,
          transition: g2Theme.permanentHeader
            ? !openDrawer
              ? theme.transitions.create(['padding'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen
                })
              : theme.transitions.create(['padding'], {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen
                })
            : undefined,
          ...headerProps.sx
        }}
      />
    )
  }, [headerProps, g2Theme, openDrawer])

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
            [theme.breakpoints.down('sm')]: {
              padding: (theme) => theme.spacing(1),
              paddingTop: (theme) => theme.spacing(2),
              gap: flexContent ? (theme) => theme.spacing(2) : ''
            },
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
