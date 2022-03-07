import React, { useMemo } from 'react'
import {
  ListItem,
  ListItemIcon,
  Theme as MuiTheme,
  useTheme as useMuiTheme
} from '@mui/material'
import { makeG2STyles } from '@smartb/g2-themes'
import { Menu, MenuItems } from '@smartb/g2-components'
import clsx from 'clsx'
import { MenuStyles } from '@smartb/g2-components'

const useStyles = makeG2STyles<{
  muiTheme: MuiTheme
}>()(() => ({
  menu: {},
  icon: {
    width: '100%'
  }
}))

interface AppMenuClasses {
  menu?: string
  logo?: string
}

interface AppMenuStyles {
  menu?: MenuStyles
  logo?: React.CSSProperties
}

export interface AppMenuProps {
  /**
   * The list of the actions that will be displayed in the drawer menu
   */
  menu: MenuItems[]
  /**
   * The logo in the navBar
   */
  logo: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: AppMenuClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: AppMenuStyles
}

export const AppMenu = (props: AppMenuProps) => {
  const { menu, logo, classes, styles } = props

  const muiTheme = useMuiTheme()

  const stylesDependencies = useMemo(
    (): { muiTheme: MuiTheme } => ({
      muiTheme: muiTheme
    }),
    [muiTheme]
  )
  const defaultStyles = useStyles(stylesDependencies)

  return (
    <>
      <ListItem
        alignItems='center'
        // button
        // component={Link}
        // to='/'
      >
        <ListItemIcon
          className={clsx(defaultStyles.classes.icon, classes?.logo)}
        >
          <img
            src={logo}
            className={clsx(
              defaultStyles.classes.icon,
              classes?.logo,
              'AruiTitleContainer-logo'
            )}
            style={styles?.logo}
            alt='Logo'
          />
        </ListItemIcon>
      </ListItem>
      <Menu
        menu={menu}
        className={clsx(defaultStyles.classes.menu, classes?.menu)}
        styles={styles?.menu}
      />
    </>
  )
}
