import { cx } from '@emotion/css'
import { Menu } from '@mui/icons-material'
import {
  Box,
  CssBaseline,
  Drawer,
  DrawerProps,
  IconButton,
  styled,
  SxProps,
  Theme,
  useMediaQuery
} from '@mui/material'
import { MenuItem } from '@smartb/g2-components'
import React, { useCallback, useEffect, useState } from 'react'
import { AppLogoProps, AppMenu } from '../AppMenu'
import { UserMenu, UserMenuProps } from '../UserMenu'

const drawerWidth = 234

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'isMobile'
})<{
  isMobile?: boolean
}>(({ isMobile }) => ({
  flexGrow: 1,
  marginLeft: isMobile ? '' : `${drawerWidth}px`,
  width: isMobile ? '100vw' : `calc(100vw - ${drawerWidth}px)`,
  height: '100vh',
  overflow: 'auto'
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
   * The function that is called when the hamburger button is clicked on mobile
   */
  onToggle?: () => void
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
    onToggle,
    userMenuProps,
    drawerProps,
    mainProps,
    drawerContent,
    classes,
    styles
  } = props
  const isMobile = useMediaQuery('(max-width:800px)')
  const [openLocal, setOpen] = useState(!isMobile)

  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isMobile])

  const currentOpen = open !== undefined ? open : openLocal

  const onToggleLocal = useCallback(() => {
    setOpen((prevOpen) => !prevOpen)
    onToggle && onToggle()
  }, [onToggle])

  return (
    <>
      <Drawer
        {...drawerProps}
        className={cx('AruiStandAloneAppLayout-drawer', classes?.drawer)}
        style={styles?.drawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'unset',
            height: `100vh`,
            overflow: 'visible',
            visibility: 'visible !important' as 'visible'
          },
          ...drawerProps?.sx
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        ModalProps={{
          keepMounted: true
        }}
        onClose={onToggleLocal}
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
            widht: '100%',
            overflow: 'auto'
          }}
        >
          <AppMenu menu={menu ?? []} logo={logo} />
          {drawerContent}
        </Box>
        {isMobile && (
          <Box
            className={cx(
              'AruiStandAloneAppLayout-burgerButtonContainer',
              classes?.burgerButtonContainer
            )}
            style={styles?.burgerButtonContainer}
            sx={{
              position: 'absolute',
              borderRadius: (theme) =>
                `0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px`,
              backgroundColor: '#FFFFFF',
              top: '8px',
              left: drawerWidth - 1,
              display: 'flex',
              padding: (theme) => `${theme.spacing(0.5)} ${theme.spacing(1)}`,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <IconButton onClick={onToggleLocal}>
              <Menu
                sx={{
                  width: '30px',
                  height: '30px'
                }}
              />
            </IconButton>
          </Box>
        )}
        {userMenuProps && (
          <UserMenu
            {...userMenuProps}
            className={cx(
              'AruiStandAloneAppLayout-userMenu',
              classes?.userMenu
            )}
            style={styles?.userMenu}
            sx={{
              position: 'absolute',
              bottom: '0px',
              width: '100%'
            }}
          />
        )}
      </Drawer>
      <CssBaseline />
      <Main
        {...mainProps}
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
