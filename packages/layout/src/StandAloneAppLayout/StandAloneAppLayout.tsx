import { cx } from '@emotion/css'
import {
  Box,
  CssBaseline,
  Drawer,
  DrawerProps,
  styled,
  SxProps,
  Theme,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { MenuItem } from '@smartb/g2-components'
import { ThemeContext } from '@smartb/g2-themes'
import React, { useContext, useMemo } from 'react'
import { AppLogoProps, AppMenu } from '../AppMenu'
import { UserMenu, UserMenuProps } from '../UserMenu'

const Main = styled('main', {
  shouldForwardProp: (prop) =>
    prop !== 'isMobile' && prop !== 'drawerWidth' && prop !== 'openDrawer'
})<{
  isMobile?: boolean
  drawerWidth: number
  openDrawer: boolean
}>(({ isMobile, drawerWidth, openDrawer, theme }) => ({
  flexGrow: 1,
  marginLeft: isMobile || !openDrawer ? '' : `${drawerWidth}px`,
  width: isMobile || !openDrawer ? '100vw' : `calc(100vw - ${drawerWidth}px)`,
  height: '100vh',
  overflow: 'auto',
  transition: !openDrawer
    ? theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    : theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
}))

interface StandAloneAppLayoutClasses {
  drawer?: string
  scrollableContainer?: string
  burgerButtonContainer?: string
  userMenu?: string
  main?: string
}

interface StandAloneAppLayoutStyles {
  drawer?: React.CSSProperties
  scrollableContainer?: React.CSSProperties
  burgerButtonContainer?: React.CSSProperties
  userMenu?: React.CSSProperties
  main?: React.CSSProperties
}

export interface StandAloneAppLayoutProps {
  /**
   * The application that has to be surrounded by the appbar and the drawer
   */
  children?: React.ReactNode
  /**
   * The list of the actions that will be displayed in the drawer menu
   */
  menu?: MenuItem[]
  /**
   * The logo in the navBar
   */
  logo?: AppLogoProps
  /**
   * Defined if the drawer is open or not. I you don't provide it an automatic behavior will be applied.
   */
  open?: boolean
  /**
   * Use these props to add a user menu to the drawer menu
   */
  userMenuProps?: UserMenuProps
  /**
   * The drawer component props
   */
  drawerProps?: DrawerProps
  /**
   * The main component props
   */
  mainProps?: React.ComponentPropsWithRef<'main'> & { sx?: SxProps<Theme> }
  /**
   * You can add additional content to the drawer menu with this prop
   */
  drawerContent?: React.ReactNode
  /**
   * The classes applied to the different part of the component
   */
  classes?: StandAloneAppLayoutClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: StandAloneAppLayoutStyles
}

export const StandAloneAppLayout = (props: StandAloneAppLayoutProps) => {
  const {
    children,
    menu,
    logo,
    open,
    userMenuProps,
    drawerProps,
    mainProps,
    drawerContent,
    classes,
    styles
  } = props
  const theme = useTheme()

  const {
    theme: g2Theme,
    openDrawer,
    toggleOpenDrawer
  } = useContext(ThemeContext)
  const isMobile =
    g2Theme.drawerAbsolutePositionBreakpoint === 'always'
      ? true
      : useMediaQuery(
          theme.breakpoints.down(g2Theme.drawerAbsolutePositionBreakpoint!)
        )

  const currentOpen = open !== undefined ? open : openDrawer

  const PerManentHeader = useMemo(
    () => g2Theme.permanentHeader,
    [g2Theme.permanentHeader]
  )

  return (
    <>
      {PerManentHeader && (
        <Box
          sx={{
            position: 'fixed',
            zIndex: 2000,
            top: 0,
            left: 0,
            width: g2Theme.drawerWidth
          }}
        >
          <PerManentHeader
            toggleOpenDrawer={toggleOpenDrawer}
            openDrawer={currentOpen}
          />
        </Box>
      )}
      <Drawer
        {...drawerProps}
        className={cx('AruiStandAloneAppLayout-drawer', classes?.drawer)}
        style={styles?.drawer}
        sx={{
          width: g2Theme.drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: g2Theme.drawerWidth,
            boxSizing: 'border-box',
            border: 'unset',
            height: `100%`,
            overflow: 'visible',
            visibility: 'visible !important' as 'visible',
            paddingTop: g2Theme.permanentHeader ? '90px' : undefined
          },
          ...drawerProps?.sx
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        ModalProps={{
          keepMounted: true
        }}
        onClose={toggleOpenDrawer}
        anchor='left'
        open={currentOpen}
      >
        <Box
          className={cx(
            'AruiStandAloneAppLayout-scrollableContainer',
            classes?.scrollableContainer
          )}
          style={styles?.scrollableContainer}
          sx={{
            height: '100%',
            width: '100%',
            overflow: 'auto'
          }}
        >
          <AppMenu menu={menu ?? []} logo={logo} />
          {drawerContent}
        </Box>
        {userMenuProps && (
          <UserMenu
            defaultOpen={!isMobile}
            {...userMenuProps}
            className={cx(
              'AruiStandAloneAppLayout-userMenu',
              classes?.userMenu
            )}
            style={styles?.userMenu}
            sx={{
              position: 'relative',
              bottom: '0px',
              width: '100%',
              margin: '0px !important'
            }}
          />
        )}
      </Drawer>
      <CssBaseline />
      <Main
        {...mainProps}
        openDrawer={currentOpen}
        drawerWidth={g2Theme.drawerWidth}
        className={cx('AruiStandAloneAppLayout-main', classes?.main)}
        style={styles?.main}
        isMobile={isMobile}
        sx={{
          bgcolor: (theme) => theme.palette.background.default,
          ...mainProps?.sx
        }}
      >
        {children}
      </Main>
    </>
  )
}
