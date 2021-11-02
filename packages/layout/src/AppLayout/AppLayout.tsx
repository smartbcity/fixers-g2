import React, { useMemo } from 'react'
import {
  Drawer,
  Theme as MuiTheme,
  DrawerProps,
  useTheme as useMuiTheme
} from '@mui/material'
import clsx from 'clsx'
import { StyleProps } from '../StyleProps'
import { makeG2STyles } from '@smartb/g2-themes'
import { AppBarLayout, AppBarLayoutProps } from '../AppBarLayout'

const useStyles = makeG2STyles<{
  styleprops: StyleProps
  muiTheme: MuiTheme
}>()((theme, props) => ({
  appbar: {
    height: `${props.styleprops.appBarHeight}px`,
    backgroundColor: theme.colors.primary,
    boxShadow: theme.shadows[4],
    '& .MuiToolbar-root': {
      height: '100%'
    },
    transition: props.muiTheme.transitions.create(['margin', 'width'], {
      easing: props.muiTheme.transitions.easing.sharp,
      duration: props.muiTheme.transitions.duration.leavingScreen
    })
  },
  appBarOpen: {
    width: `calc(100% - ${props.styleprops.menuWidth}px)`,
    marginLeft: `${props.styleprops.menuWidth}px`,
    transition: props.muiTheme.transitions.create(['margin', 'width'], {
      easing: props.muiTheme.transitions.easing.easeOut,
      duration: props.muiTheme.transitions.duration.enteringScreen
    })
  },
  titleContainer: {
    height: `${props.styleprops.appBarHeight}px`,
    paddingLeft: '10px',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    marginLeft: `0px`,
    top: '0px',
    left: '0px',
    transition: props.muiTheme.transitions.create(['margin', 'width'], {
      easing: props.muiTheme.transitions.easing.sharp,
      duration: props.muiTheme.transitions.duration.leavingScreen
    })
  },
  titleContainerOpen: {
    marginLeft: `${props.styleprops.menuWidth}px`,
    transition: props.muiTheme.transitions.create(['margin', 'width'], {
      easing: props.muiTheme.transitions.easing.easeOut,
      duration: props.muiTheme.transitions.duration.enteringScreen
    })
  },
  drawer: {
    width: `${props.styleprops.menuWidth}px`,
    '& .MuiDrawer-paper': {
      top: `0px`,
      zIndex: 1000,
      width: `${props.styleprops.menuWidth}px`,
      background: 'white',
      height: `100vh`,
      overflowX: 'hidden',
      transition: props.muiTheme.transitions.create('transform', {
        easing: props.muiTheme.transitions.easing.sharp,
        duration: props.muiTheme.transitions.duration.enteringScreen
      })
    }
  },
  drawerClosed: {
    '& .MuiDrawer-paper': {
      transform: `translateX(-${props.styleprops.menuWidth}px)`,
      transition: props.muiTheme.transitions.create('transform', {
        easing: props.muiTheme.transitions.easing.easeOut,
        duration: props.muiTheme.transitions.duration.leavingScreen
      })
    }
  },
  main: {
    flexGrow: 1,
    transition: props.muiTheme.transitions.create('padding', {
      easing: props.muiTheme.transitions.easing.sharp,
      duration: props.muiTheme.transitions.duration.leavingScreen
    }),
    paddingTop: props.styleprops.appBarHeight,
    paddingLeft: `${props.styleprops.menuWidth + 10}px`,
    paddingRight: '10px'
  },
  mainShift: {
    flexGrow: 1,
    paddingTop: props.styleprops.appBarHeight,
    paddingLeft: '10px',
    paddingRight: '10px',
    transition: props.muiTheme.transitions.create('padding', {
      easing: props.muiTheme.transitions.easing.easeOut,
      duration: props.muiTheme.transitions.duration.enteringScreen
    })
  },
  hidder: {
    opacity: '0.5',
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'black',
    top: '0',
    left: '0',
    zIndex: 5
  }
}))

interface AppLayoutClasses {
  main?: string
}

interface AppLayoutStyles {
  main?: React.CSSProperties
}

export interface AppLayoutProps {
  /**
   * The optionnal props of the appBar
   *
   * **See the reference below** ⬇️
   */
  appBarLayoutProps?: Partial<AppBarLayoutProps>
  /**
   * The optionnal props of the drawer
   *
   * **See the reference below** ⬇️
   */
  drawerProps?: Partial<DrawerProps>
  /**
   * The content that will be displayed in the appBAr
   */
  appBarContent?: React.ReactNode
  /**
   * The application that has to be surrounded by the appbar and the drawer
   */
  children?: React.ReactNode
  /**
   * Defined if the drawer is open or not
   */
  open: boolean
  /**
   * The base dimension of the appLayout
   */
  styleProps: StyleProps
  /**
   * Defined if the appBar will be displayed or not
   */
  showAppBar?: boolean
  /**
   * Defined if the drawer will be displayed or not
   */
  showDrawer?: boolean
  /**
   * The content that will be displayed in the drawer
   */
  drawerContent?: React.ReactNode
  /**
   * The function that is called when the hamburger button is clicked
   */
  onToggle?: () => void
  /**
   * The classes applied to the different part of the component
   */
  classes?: AppLayoutClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: AppLayoutStyles
}

export const AppLayout = (props: AppLayoutProps) => {
  const {
    children,
    appBarContent,
    appBarLayoutProps,
    drawerProps,
    showDrawer = true,
    drawerContent,
    open,
    styleProps,
    showAppBar = true,
    classes,
    styles,
    onToggle
  } = props

  const muiTheme = useMuiTheme()

  const stylesDependencies = useMemo(
    (): { styleprops: StyleProps; muiTheme: MuiTheme } => ({
      styleprops: styleProps,
      muiTheme: muiTheme
    }),
    [styleProps, muiTheme]
  )
  const defaultStyles = useStyles(stylesDependencies)

  return (
    <>
      <AppBarLayout
        {...appBarLayoutProps}
        className={
          showAppBar
            ? clsx(
                defaultStyles.classes.appbar,
                open && defaultStyles.classes.appBarOpen,
                appBarLayoutProps?.className
              )
            : clsx(
                defaultStyles.classes.titleContainer,
                open && defaultStyles.classes.titleContainerOpen,
                appBarLayoutProps?.className
              )
        }
        onDrawerOpen={showDrawer ? onToggle : undefined}
        show={showAppBar}
      >
        {appBarContent}
      </AppBarLayout>
      {showDrawer && (
        <Drawer
          open={open}
          variant='persistent'
          {...drawerProps}
          className={clsx(
            defaultStyles.classes.drawer,
            !open && defaultStyles.classes.drawerClosed,
            drawerProps?.className
          )}
        >
          {drawerContent}
        </Drawer>
      )}
      <main
        className={clsx(
          open ? defaultStyles.classes.main : defaultStyles.classes.mainShift,
          'AruiApp-main',
          classes?.main
        )}
        style={styles?.main}
      >
        <div
          className={defaultStyles.classes.hidder}
          style={{
            display: window.innerWidth < 768 && open ? 'block' : 'none'
          }}
          onClick={onToggle}
        />
        {children}
      </main>
    </>
  )
}
