import { Box, BoxProps, useTheme, useMediaQuery } from '@mui/material'
import { Actions, ActionsProps } from '@smartb/g2-components'
import React, { useContext, useMemo, useState } from 'react'
import {
  BasicProps,
  MergeMuiElementProps,
  ThemeContext
} from '@smartb/g2-themes'
import { Header, HeaderContent, HeaderProps } from '../Header'
import { cx } from '@emotion/css'
import {
  PageContext,
  PageContextProps,
  pageDefaultContext,
  usePage
} from './PageContextProvider'
import { mergeDeepWith, mergeDeepWithKey, concat } from 'ramda'

const mergeHeaderContent = (key: string, l: any, r: any) => {
  if (key === 'content') {
    if (r.lentgh > l.length) {
      return l.map((el: HeaderContent, index) => ({
        //@ts-ignore
        leftPart: concat(el.leftPart ?? [], r[index].leftPart ?? []),
        //@ts-ignore
        rightPart: concat(el.rightPart ?? [], r[index].rightPart ?? [])
      }))
    } else {
      return r.map((el: HeaderContent, index) => ({
        //@ts-ignore
        leftPart: concat(el.leftPart ?? [], l[index].leftPart ?? []),
        //@ts-ignore
        rightPart: concat(el.rightPart ?? [], l[index].rightPart ?? [])
      }))
    }
  }
  return r
}

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

  const [pageDescendantContext, setPageDescendantContext] =
    useState<PageContextProps>(pageDefaultContext)
  const pageAscendantContext = usePage()

  const theme = useTheme()
  const { theme: g2Theme, openDrawer } = useContext(ThemeContext)
  const isMobile =
    g2Theme.drawerAbsolutePositionBreakpoint === 'always'
      ? true
      : useMediaQuery(
          theme.breakpoints.down(g2Theme.drawerAbsolutePositionBreakpoint!)
        )

  const actionsDisplay = useMemo(() => {
    if (!bottomActionsProps) return undefined
    return (
      <Actions
        {...mergeDeepWith(
          concat,
          pageAscendantContext.bottomActionsProps,
          mergeDeepWith(
            concat,
            pageDescendantContext.bottomActionsProps,
            bottomActionsProps
          )
        )}
        sx={{
          marginTop: !flexContent ? (theme) => theme.spacing(4) : ''
        }}
      />
    )
  }, [
    bottomActionsProps,
    flexContent,
    pageDescendantContext,
    pageAscendantContext
  ])

  const headerDisplay = useMemo(() => {
    if (!headerProps) return undefined
    return (
      <Header
        strongPadding
        {...mergeDeepWithKey(
          mergeHeaderContent,
          pageAscendantContext.headerProps,
          mergeDeepWithKey(
            mergeHeaderContent,
            pageDescendantContext.headerProps,
            headerProps
          )
        )}
        sx={{
          paddingLeft:
            g2Theme.permanentHeader && (!openDrawer || isMobile)
              ? `${g2Theme.drawerWidth + (isMobile ? 5 : 40)}px`
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
  }, [
    headerProps,
    pageDescendantContext,
    pageAscendantContext,
    g2Theme,
    openDrawer,
    isMobile
  ])

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
          <PageContext.Provider
            value={{
              ...pageDescendantContext,
              setPageContext: setPageDescendantContext
            }}
          >
            {children}
            {actionsDisplay}
          </PageContext.Provider>
        </Box>
      </Box>
    </>
  )
}
