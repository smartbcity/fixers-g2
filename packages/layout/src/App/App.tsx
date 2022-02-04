import React, { useEffect, useMemo, useState } from 'react'
import {
  Drawer,
  DrawerProps,
  Theme as MuiTheme,
  useTheme as useMuiTheme
} from '@mui/material'
import { StyleProps } from '../StyleProps'
import { ToolsMenuProps, ToolsMenu } from '../ToolsMenu'
import { useDebouncedCallback } from 'use-debounce'
import { makeG2STyles } from '@smartb/g2-themes'
import { Menu, MenuItem } from '@smartb/g2-components'
import { ToolsPanel } from '../ToolsPanel'
import { AppBarLayout, AppBarLayoutProps } from '../AppBarLayout'
import { TitleContainer } from './TitleContainer'

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
    paddingLeft: props.styleprops.menuWidth
  },
  mainShift: {
    flexGrow: 1,
    paddingTop: props.styleprops.appBarHeight,
    transition: props.muiTheme.transitions.create('padding', {
      easing: props.muiTheme.transitions.easing.easeOut,
      duration: props.muiTheme.transitions.duration.enteringScreen
    }),
    paddingLeft: 0
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
  },
  grow: {
    flexGrow: 1
  }
}))

interface AppClasses {
  main?: string
}

interface AppStyles {
  main?: React.CSSProperties
}

export interface AppProps {
  /**
   * An array that contains every tools menu that will be displayed in the navBar
   *
   * **See the reference below** ⬇️
   */
  toolsMenuProps?: ToolsMenuProps[]
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
   * The content that will be displayed in the navBAr at the left of the profile
   */
  navBarContent?: React.ReactNode
  /**
   * The list of the actions that will be displayed in the drawer menu
   */
  menu?: MenuItem[]
  /**
   * The application that has to be surrounded by the navbar and the drawer
   */
  children?: React.ReactNode
  /**
   * The logo in the navBAr
   */
  logo: string
  /**
   * Defined if the drawer is open or not
   */
  open: boolean
  /**
   * The title that will be displayed in the navBar
   */
  title?: string
  /**
   * The style of the navBar and the drawer
   */
  styleProps: StyleProps
  /**
   * Defined if the appBar (navBar + drawer) will be displayed or not
   */
  showAppBar?: boolean
  /**
   * Defined if the drawer will be displayed or not
   */
  showDrawer?: boolean
  /**
   * The content that will be displayed in the drawer below the menu
   */
  drawerContent?: React.ReactNode
  /**
   * The function that is called when the hamburger button is clicked
   */
  onToggle: () => void
  /**
   * The classes applied to the different part of the component
   */
  classes?: AppClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: AppStyles
}

const defaultProps = {
  showAppBar: true
}

export const App = (props: AppProps) => {
  const {
    children,
    toolsMenuProps = [],
    appBarLayoutProps,
    drawerProps,
    navBarContent,
    drawerContent,
    menu,
    open,
    title,
    logo,
    styleProps,
    showAppBar = true,
    showDrawer = true,
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
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [handleResize] = useDebouncedCallback(() => {
    const min = Math.min.apply(Math, [window.innerWidth, innerWidth])
    const max = Math.max.apply(Math, [window.innerWidth, innerWidth])
    if ((min < 400 && max > 400) || (min < 600 && max > 600)) {
      setInnerWidth(window.innerWidth)
    }
  }, 500)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <AppBarLayout
        onDrawerOpen={onToggle}
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
        show={showAppBar}
        {...appBarLayoutProps}
      >
        {showAppBar ? (
          <>
            <TitleContainer title={title} logo={logo} />
            <div
              className={defaultStyles.cx(
                defaultStyles.classes.grow,
                'AruiAppBar-flexFiller'
              )}
            />
            {window.innerWidth > 600 && navBarContent}
            {window.innerWidth > 400 &&
              toolsMenuProps.map((toolsMenuProps, index) => (
                <ToolsMenu key={index} {...toolsMenuProps} />
              ))}
          </>
        ) : (
          <TitleContainer title={title} logo={logo} />
        )}
      </AppBarLayout>
      {showDrawer && (
        <Drawer
          variant='persistent'
          open={open}
          className={defaultStyles.cx(
            defaultStyles.classes.drawer,
            !open && defaultStyles.classes.drawerClosed,
            drawerProps?.className
          )}
          {...drawerProps}
        >
          {menu && <Menu menu={menu} />}
          {drawerContent}
          {(window.innerWidth <= 600 || !showAppBar) && navBarContent}
          {(window.innerWidth <= 600 || !showAppBar) &&
            toolsMenuProps &&
            toolsMenuProps.map((toolsMenuProps) => (
              <ToolsPanel
                menu={toolsMenuProps.menu}
                key={toolsMenuProps.menu.key}
              />
            ))}
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

App.defaultProps = defaultProps
