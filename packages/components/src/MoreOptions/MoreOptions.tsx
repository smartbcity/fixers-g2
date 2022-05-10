import React, { forwardRef, useCallback, useState } from 'react'
import { Menu as MuiMenu, IconButton, IconButtonProps } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import { MenuItem, Menu, MenuProps } from '../Menu'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'

const useStyles = makeG2STyles()({
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
  const {
    options,
    menuContainerProps,
    className,
    classes,
    styles,
    onClick,
    ...other
  } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const defaultStyles = useStyles()

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setAnchorEl(event.currentTarget)
      onClick && onClick(event)
    },
    []
  )

  const close = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const stopPropagation = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) =>
      event.stopPropagation(),
    []
  )

  return (
    <>
      <IconButton
        ref={ref}
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}
        className={defaultStyles.cx('AruiMoreOptions-root', className)}
        {...other}
        size='large'
      >
        <MoreHoriz
          className={defaultStyles.cx(
            'AruiMoreOptions-moreOptionsIcon',
            classes?.moreOptionsIcon
          )}
          style={styles?.moreOptionsIcon}
        />
      </IconButton>
      <MuiMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClick={stopPropagation}
        BackdropProps={{
          onClick: stopPropagation
        }}
        MenuListProps={{
          onClick: stopPropagation
        }}
        onClose={close}
        PaperProps={{
          className: defaultStyles.classes.menu
        }}
        className={defaultStyles.cx('AruiMoreOptions-menu', classes?.menu)}
        style={styles?.menu}
      >
        <Menu
          menu={options}
          {...menuContainerProps}
          classes={{ item: { root: defaultStyles.classes.listItem } }}
        />
      </MuiMenu>
    </>
  )
}

export const MoreOptions = forwardRef(MoreOptionsBase) as typeof MoreOptionsBase
