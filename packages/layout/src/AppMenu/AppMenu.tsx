import React, { CSSProperties, useCallback, useMemo } from 'react'
import {
  ListItem,
  ListItemIcon,
  Theme as MuiTheme,
  useTheme as useMuiTheme
} from '@mui/material'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import { Menu, MenuProps } from '@smartb/g2-components'
import clsx from 'clsx'

const useStyles = makeG2STyles<{
  muiTheme: MuiTheme
}>()(() => ({
  menu: {},
  icon: {
    width: '100%'
  }
}))

export interface AppMenuLogoProps {
  /**
   * The logo in the navBar
   */
  src: string
  /**
   * The alt of the img
   */
  alt?: string
  /**
   * The action called when the logo is clicked
   */
  onClick?: () => void
  /**
   * The classes applied to the different part of the component
   */
  classes?: string
  /**
   * The styles applied to the different part of the component
   */
  styles?: CSSProperties
}

export interface AppMenuBasicProps extends BasicProps {
  logo: AppMenuLogoProps
}

export type AppMenuProps = MergeMuiElementProps<MenuProps, AppMenuBasicProps>

export const AppMenu = (props: AppMenuProps) => {
  const { logo } = props
  const onItemClick = useCallback(
    () => logo.onClick && logo.onClick(),
    [logo.onClick]
  )

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
      <ListItem button={!!logo.onClick || true}>
        <ListItemIcon
          className={clsx(
            defaultStyles.classes.icon,
            logo?.classes,
            'AruiTitleContainer-listItemIcon'
          )}
          onClick={onItemClick}
        >
          <img
            src={logo.src}
            className={clsx(
              defaultStyles.classes.icon,
              logo?.classes,
              'AruiTitleContainer-logo'
            )}
            style={logo?.styles}
            alt={logo?.alt || 'Logo'}
          />
        </ListItemIcon>
      </ListItem>
      <Menu {...props} />
    </>
  )
}
