import {
  ClickAwayListener,
  ListItemButton,
  ListItemIcon,
  ListItemProps,
  ListItemText,
  MenuList,
  Paper,
  Popper,
  PopperProps,
  styled
} from '@mui/material'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { RoundedArrow } from '../icons'
import { MenuItems } from '../Menu'
import { cx } from '@emotion/css'

const StyledPaper = styled(Paper)({
  borderRadius: '2px',
  overflow: 'hidden',
  '& .AruiContextMenu-list': {
    padding: 0
  },
  '& .MuiListItemButton-root': {
    width: '150px',
    padding: '10px',
    transition: 'none',
    color: '#353945'
  },
  '& .MuiListItemText-root': {
    margin: 0
  },
  '& .MuiListItemText-root .MuiTypography-root': {
    lineHeight: 0.8
  },
  '& .MuiListItemButton-root:hover': {
    background: '#353945',
    color: 'white'
  },
  '& .AruiContextMenu-arrow': {
    width: '15px',
    height: '15px',
    fill: 'currentColor'
  }
})

interface ContextMenuClasses {
  item?: ItemClasses
  paper?: string
  list?: string
}

interface ContextMenuStyles {
  item?: ItemStyles
  paper?: React.CSSProperties
  list?: React.CSSProperties
}

export interface ContextMenuBasicProps extends BasicProps {
  menu: MenuItems[]
  /**
   * The event called when the user request to close the menu
   */
  onClose?: () => void
  /**
   * If true the callback `onClose` will be called when the user clickaway from the popper
   *
   * @default true
   */
  closeOnClickAway?: boolean
  /**
   * Define ifthe popper is open or not
   *
   * @default false
   */
  open?: boolean
  classes?: ContextMenuClasses
  styles?: ContextMenuStyles
}

export type ContextMenuProps = MergeMuiElementProps<
  PopperProps,
  ContextMenuBasicProps
>

export const ContextMenuBase = (
  props: ContextMenuProps,
  ref: React.RefObject<HTMLDivElement>
) => {
  const {
    menu,
    classes,
    styles,
    onClose,
    anchorEl,
    open = false,
    closeOnClickAway = true,
    className,
    ...other
  } = props
  const [currentItem, setCurrentItem] = useState<HTMLElement | undefined>(
    undefined
  )
  const [selectedItem, setSelectedItem] = useState<MenuItems | undefined>(
    undefined
  )

  useEffect(() => {
    setCurrentItem(undefined)
  }, [anchorEl])

  const openPopper = !!anchorEl && open

  const handleClickAway = useCallback(() => {
    if (closeOnClickAway && onClose && openPopper) {
      onClose()
    }
  }, [onClose, openPopper, closeOnClickAway])

  const uiMenu = useMemo(
    () =>
      menu &&
      menu.map((item) => (
        <Item
          onMouseEnter={(event) => {
            if (!!item.items) {
              setCurrentItem(event.currentTarget)
              setSelectedItem(item)
            } else {
              setCurrentItem(undefined)
            }
          }}
          isSelected={selectedItem?.key === item.key}
          classes={classes}
          styles={styles}
          {...item}
        />
      )),
    [classes, styles, menu, selectedItem]
  )

  const subMenu = useMemo(() => {
    if (!!currentItem && !!selectedItem?.items && openPopper) {
      return (
        <ContextMenu
          closeOnClickAway={false}
          anchorEl={currentItem}
          menu={selectedItem.items}
          open={!!selectedItem && openPopper}
          placement='right-start'
        />
      )
    }
    return undefined
  }, [currentItem, selectedItem, openPopper])

  const popper = (
    <Popper
      ref={ref}
      open={openPopper}
      anchorEl={anchorEl}
      className={cx('AruiContextMenu-root', className)}
      {...other}
    >
      <StyledPaper
        className={cx('AruiContextMenu-paper', classes?.paper)}
        style={styles?.paper}
      >
        <MenuList
          className={cx('AruiContextMenu-list', classes?.list)}
          style={styles?.list}
        >
          {uiMenu}
        </MenuList>
      </StyledPaper>
      {subMenu}
    </Popper>
  )

  if (!openPopper) return <> </>

  if (closeOnClickAway && openPopper)
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        {popper}
      </ClickAwayListener>
    )
  return popper
}

interface ItemClasses {
  root?: string
  icon?: string
  text?: string
  arrow?: string
}

interface ItemStyles {
  root?: React.CSSProperties
  icon?: React.CSSProperties
  text?: React.CSSProperties
  arrow?: React.CSSProperties
}

interface ItemBasicProps extends BasicProps {
  classes?: ContextMenuClasses
  styles?: ContextMenuStyles
}

type ItemProps = MergeMuiElementProps<ListItemProps, ItemBasicProps & MenuItems>

const Item = forwardRef(
  (props: ItemProps, ref: React.RefObject<HTMLElement>) => {
    const {
      goto,
      icon,
      label,
      href,
      onClick,
      componentProps,
      items,
      component,
      isSelected = false,
      classes,
      styles,
      ...other
    } = props
    const onItemClick = useCallback(() => goto && !href && goto(), [goto, href])

    return (
      <ListItemButton
        ref={ref}
        component={component ? component : href ? 'a' : 'div'}
        onClick={onItemClick}
        href={href}
        style={styles?.item?.root}
        {...componentProps}
        {...other}
        className={classes?.item?.root}
      >
        {!!icon && (
          <ListItemIcon
            className={classes?.item?.icon}
            style={styles?.item?.icon}
          >
            {icon}
          </ListItemIcon>
        )}
        <ListItemText
          primaryTypographyProps={{ color: 'inherit', variant: 'body2' }}
          primary={label}
          className={classes?.item?.text}
          style={styles?.item?.text}
        />
        {!!items && (
          <RoundedArrow
            className={cx('AruiContextMenu-arrow', classes?.item?.arrow)}
            style={styles?.item?.arrow}
          />
        )}
      </ListItemButton>
    )
  }
)

export const ContextMenu = forwardRef(ContextMenuBase) as typeof ContextMenuBase
