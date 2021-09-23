import React from 'react'
import {AppBar as MuiAppBar} from  '@mui/material'
import { AppBarProps as MuiAppBarProps, Box, Toolbar } from  '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {IconButton} from  '@mui/material'
import {
  BasicProps,
  MergeMuiElementProps,
  lowLevelStyles
} from '@smartb/g2-themes'
import clsx from 'clsx'

const useStyles = lowLevelStyles()({
  root: {
    zIndex: 1100
  },
  iconButton: {
    marginRight: '20px'
  },
  toolbar: {
    paddingRight: '24px'
  }
})

interface AppBarLayoutClasses {
  menuButton?: string
  menuIcon?: string
  toolBar?: string
}

interface AppBarLayoutStyles {
  menuIcon?: React.CSSProperties
  toolBar?: React.CSSProperties
}

export interface AppBarLayoutBasicProps extends BasicProps {
  children?: React.ReactNode
  show?: boolean
  classes?: AppBarLayoutClasses
  styles?: AppBarLayoutStyles
  onDrawerOpen?: () => void
}

export type AppBarLayoutProps = MergeMuiElementProps<
  MuiAppBarProps,
  AppBarLayoutBasicProps
>

export const AppBarLayout = (props: AppBarLayoutProps) => {
  const {
    className,
    style,
    id,
    children,
    classes,
    styles,
    onDrawerOpen,
    show = true,
    ...other
  } = props
  const defaultClasses = useStyles()
  if (!show)
    return (
      <Box className={clsx(className, 'AruiAppBar-root', defaultClasses.root)}>
        {onDrawerOpen && (
          <IconButton
            className={clsx(
              classes?.menuButton,
              'AruiAppBar-menuButton',
              defaultClasses.iconButton
            )}
            color='inherit'
            aria-label='Open drawer'
            onClick={onDrawerOpen}
            size="large">
            <MenuIcon
              className={clsx(classes?.menuIcon, 'AruiAppBar-menuIcon')}
              style={styles?.menuIcon}
            />
          </IconButton>
        )}
        <Box
          display='flex'
          className={clsx(
            classes?.toolBar,
            'AruiAppBar-toolbar',
            defaultClasses.toolbar
          )}
          style={styles?.toolBar}
        >
          {children}
        </Box>
      </Box>
    );
  return (
    <MuiAppBar
      className={clsx(className, 'AruiAppBar-root')}
      id={id}
      style={style}
      square={true}
      {...other}
    >
      <Toolbar
        className={clsx(
          classes?.toolBar,
          'AruiAppBar-toolbar',
          defaultClasses.toolbar
        )}
        style={styles?.toolBar}
      >
        {onDrawerOpen && (
          <IconButton
            className={clsx(
              classes?.menuButton,
              'AruiAppBar-menuButton',
              defaultClasses.iconButton
            )}
            color='inherit'
            aria-label='Open drawer'
            onClick={onDrawerOpen}
            size="large">
            <MenuIcon
              className={clsx(classes?.menuIcon, 'AruiAppBar-menuIcon')}
              style={styles?.menuIcon}
            />
          </IconButton>
        )}
        {children}
      </Toolbar>
    </MuiAppBar>
  );
}
