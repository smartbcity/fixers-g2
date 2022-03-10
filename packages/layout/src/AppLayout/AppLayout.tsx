import React, { useMemo } from 'react'
import {
  Drawer,
  Theme as MuiTheme,
  DrawerProps,
  useTheme as useMuiTheme
} from '@mui/material'
import { applyAppStyleProps, AppStyleProps } from '../AppStyleProps'
import { makeG2STyles } from '@smartb/g2-themes'
import { AppBarLayout, AppBarLayoutProps } from '../AppBarLayout'
import { PartialDeep } from 'utils'

const useStyles = makeG2STyles<{
  styleProps: AppStyleProps
  muiTheme: MuiTheme
}>()((theme, props) => ({
  appbar: {
    height: `${props.styleProps.appBar.height}px`,
    background: props.styleProps.appBar.background,
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
    width: `calc(100% - ${props.styleProps.menu.width}px)`,
    marginLeft: `${props.styleProps.menu.width}px`,
    transition: props.muiTheme.transitions.create(['margin', 'width'], {
      easing: props.muiTheme.transitions.easing.easeOut,
      duration: props.muiTheme.transitions.duration.enteringScreen
    })
  },
  titleContainer: {
    height: `${props.styleProps.appBar.height}px`,
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
    marginLeft: `${props.styleProps.menu.width}px`,
    transition: props.muiTheme.transitions.create(['margin', 'width'], {
      easing: props.muiTheme.transitions.easing.easeOut,
      duration: props.muiTheme.transitions.duration.enteringScreen
    })
  },
  drawer: {
    width: `${props.styleProps.menu.width}px`,
    '& .MuiDrawer-paper': {
      top: `0px`,
      zIndex: props.styleProps.menu.zIndex,
      width: `${props.styleProps.menu.width}px`,
      background: props.styleProps.menu.background,
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
      transform: `translateX(-${props.styleProps.menu.width}px)`,
      transition: props.muiTheme.transitions.create('transform', {
        easing: props.muiTheme.transitions.easing.easeOut,
        duration: props.muiTheme.transitions.duration.leavingScreen
      })
    }
  },
  main: {
    background: props.styleProps.main.background,
    flexGrow: 1,
    transition: props.muiTheme.transitions.create('padding', {
      easing: props.muiTheme.transitions.easing.sharp,
      duration: props.muiTheme.transitions.duration.leavingScreen
    }),
    paddingTop: props.styleProps.appBar.height + props.styleProps.main.padding,
    paddingLeft: props.styleProps.menu.width + props.styleProps.main.padding,
    paddingRight: props.styleProps.main.padding,
    minHeight: '100vh',
    boxSizing: 'border-box'
  },
  mainShift: {
    flexGrow: 1,
    paddingTop: props.styleProps.appBar.height + props.styleProps.main.padding,
    transition: props.muiTheme.transitions.create('padding', {
      easing: props.muiTheme.transitions.easing.easeOut,
      duration: props.muiTheme.transitions.duration.enteringScreen
    }),
    paddingLeft: props.styleProps.main.padding,
    paddingRight: props.styleProps.main.padding,
    minHeight: '100vh',
    boxSizing: 'border-box'
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
  styleProps?: PartialDeep<AppStyleProps>
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
    (): { styleProps: AppStyleProps; muiTheme: MuiTheme } => ({
      styleProps: applyAppStyleProps(styleProps),
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
            ? defaultStyles.cx(
                defaultStyles.classes.appbar,
                open && defaultStyles.classes.appBarOpen,
                appBarLayoutProps?.className
              )
            : defaultStyles.cx(
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
          className={defaultStyles.cx(
            defaultStyles.classes.drawer,
            !open && defaultStyles.classes.drawerClosed,
            drawerProps?.className
          )}
        >
          {drawerContent}
        </Drawer>
      )}
      <main
        className={defaultStyles.cx(
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
