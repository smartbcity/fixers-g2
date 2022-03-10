import React, { useMemo } from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { Menu, MenuProps, MenuItem } from '@smartb/g2-components'
import clsx from 'clsx'

export interface AppLogoProps {
  /**
   * The logo in the navBar
   */
  src: string
  /**
   * The props of the image
   */
  imgProps?: React.ComponentPropsWithRef<'img'>
  /**
   * The item props. Use it to logo interactions behavior
   */
  item?: MenuItem
}

export interface AppMenuBasicProps extends BasicProps {
  logo: AppLogoProps
}

export type AppMenuProps = MergeMuiElementProps<MenuProps, AppMenuBasicProps>

export const AppMenu = (props: AppMenuProps) => {
  const { logo, menu, ...other } = props

  const extendedMenu = useMemo(
    () => [
      {
        ...logo.item,
        componentProps: {
          sx: {
            '& .MuiListItemIcon-root': {
              width: '100%'
            },
            '& img': {
              width: '100%'
            }
          },
          ...logo.item?.componentProps
        },
        icon: (
          <img
            src={logo.src}
            alt={'The application logo'}
            {...logo.imgProps}
            className={clsx(logo.imgProps?.className, 'AruiAppMenu-logo')}
          />
        )
      } as MenuItem,
      ...menu
    ],
    [logo, menu]
  )

  return <Menu menu={extendedMenu} {...other} />
}
