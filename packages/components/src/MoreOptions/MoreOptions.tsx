import React, { forwardRef, useCallback, useState } from 'react'
import { Menu as MuiMenu, IconButton, IconButtonProps } from  '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import { MenuItem, Menu, MenuProps } from '../Menu'
import {
  BasicProps,
  lowLevelStyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import clsx from 'clsx'

const useStyles = lowLevelStyles()({
  menu: {
    maxWidth: '300px',
    maxHeight: '250px',
    '& ul': {
      padding: '0'
    }
  },
  listItem: {
    padding: '3px 16px'
  }
})

interface MoreOptionsClasses {
  moreOptionsIcon?: string
  menu?: string
}

interface MoreOptionsStyles {
  moreOptionsIcon?: React.CSSProperties
  menu?: React.CSSProperties
}

export interface MoreOptionsBasicProps<T = {}> extends BasicProps {
  /**
   * The options displayed in the menu
   */
  options: MenuItem<T>[]
  /**
   * The props of the menu container used to contain the list of options
   */
  menuContainerProps?: Omit<MenuProps, 'menu'>
  /**
   * The classes applied to the different part of the component
   */
  classes?: MoreOptionsClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: MoreOptionsStyles
}

export type MoreOptionsProps<T> = MergeMuiElementProps<
  IconButtonProps,
  MoreOptionsBasicProps<T>
>

const MoreOptionsBase = <T extends object = {}>(
  props: MoreOptionsProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const { options, menuContainerProps, className, classes, styles, ...other } =
    props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const defaultClasses = useStyles()

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const close = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      <IconButton
        ref={ref}
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}
        className={clsx(className, 'AruiMoreOptions-root')}
        {...other}
      >
        <MoreHoriz
          className={clsx(
            classes?.moreOptionsIcon,
            'AruiMoreOptions-moreOptionsIcon'
          )}
          style={styles?.moreOptionsIcon}
        />
      </IconButton>
      <MuiMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={close}
        PaperProps={{
          className: defaultClasses.menu
        }}
        className={clsx(classes?.menu, 'AruiMoreOptions-menu')}
        style={styles?.menu}
      >
        <Menu
          menu={options}
          {...menuContainerProps}
          classes={{ item: { root: defaultClasses.listItem } }}
        />
      </MuiMenu>
    </>
  )
}

export const MoreOptions = forwardRef(MoreOptionsBase) as typeof MoreOptionsBase
