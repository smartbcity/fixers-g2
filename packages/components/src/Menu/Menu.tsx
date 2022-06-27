import {
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemProps,
  ListProps
} from '@mui/material'
import { MenuItems } from './MenuItem'
import React, { useCallback, useMemo } from 'react'
import {
  BasicProps,
  MergeMuiElementProps,
  makeG2STyles
} from '@smartb/g2-themes'

const useStyles = makeG2STyles<{ paddingLeft: number }>()(
  (theme, { paddingLeft }) => ({
    item: {
      paddingLeft: `${paddingLeft}px`,
      color: 'black',
      '& .MuiListItemIcon-root': {
        color: 'black'
      }
    },
    selectedItem: {
      background: `${theme.colors.primary}33`,
      color: theme.colors.primary,
      '& .MuiListItemIcon-root': {
        color: theme.colors.primary
      }
    },
    selectedTitle: {
      '& .MuiTypography-root': {
        color: theme.colors.primary
      }
    },
    itemText: {
      '& .MuiTypography-root': {
        fontSize: `${17 - paddingLeft / 10}px`,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      }
    },
    subList: {
      padding: '0px'
    }
  })
)

interface MenuClasses {
  item?: MenuItemClasses
  icon?: string
  text?: string
}

interface MenuStyles {
  item?: MenuItemStyles
  icon?: React.CSSProperties
  text?: React.CSSProperties
}

interface MenuItemClasses {
  root?: string
  icon?: string
  text?: string
}

interface MenuItemStyles {
  root?: React.CSSProperties
  icon?: React.CSSProperties
  text?: React.CSSProperties
}

interface MenuBasicProps extends BasicProps {
  menu: MenuItems[]
  classes?: MenuClasses
  styles?: MenuStyles
  subMenuProps?: Partial<MenuProps>
  paddingLeft?: number
}

export type MenuProps = MergeMuiElementProps<ListProps, MenuBasicProps>

export const Menu = (props: MenuProps) => {
  const { menu, classes, styles, paddingLeft, subMenuProps, ...other } = props
  const uiMenu = useMemo(
    () =>
      menu.map((item) => (
        <Item
          classes={classes}
          styles={styles}
          paddingLeft={paddingLeft}
          subMenuProps={subMenuProps}
          {...item}
        />
      )),
    [classes, styles, menu, paddingLeft, subMenuProps]
  )
  return <List {...other}>{uiMenu}</List>
}

interface ItemBasicProps extends BasicProps {
  classes?: MenuClasses
  styles?: MenuStyles
  paddingLeft?: number
  subMenuProps?: Partial<MenuProps>
}

type ItemProps = MergeMuiElementProps<ListItemProps, ItemBasicProps & MenuItems>

const Item = (props: ItemProps) => {
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
    paddingLeft = 16,
    subMenuProps,
    ...other
  } = props
  const onItemClick = useCallback(() => goto && !href && goto(), [goto, href])

  const stylesObject = useMemo(
    () => ({
      paddingLeft: paddingLeft
    }),
    [paddingLeft]
  )
  const defaultStyles = useStyles(stylesObject)
  if (items !== undefined && items.length > 0)
    return (
      <>
        <ListItem
          style={styles?.item?.root}
          {...componentProps}
          {...other}
          className={defaultStyles.cx(
            defaultStyles.classes.item,
            classes?.item?.root
          )}
        >
          {!!icon && (
            <ListItemIcon
              className={classes?.item?.icon}
              style={styles?.item?.icon}
            >
              {icon}
            </ListItemIcon>
          )}
          {!!label && (
            <ListItemText
              primaryTypographyProps={{ color: 'inherit' }}
              primary={label}
              className={defaultStyles.cx(
                classes?.item?.text,
                defaultStyles.classes.itemText,
                isSelected && defaultStyles.classes.selectedTitle
              )}
              style={styles?.item?.text}
            />
          )}
        </ListItem>
        <Menu
          {...subMenuProps}
          className={defaultStyles.cx(
            defaultStyles.classes.subList,
            subMenuProps?.className
          )}
          paddingLeft={paddingLeft + 10}
          menu={items}
        />
      </>
    )
  return (
    <ListItemButton
      component={component ? component : href ? 'a' : 'div'}
      onClick={onItemClick}
      href={href}
      style={styles?.item?.root}
      {...componentProps}
      {...other}
      className={defaultStyles.cx(
        defaultStyles.classes.item,
        isSelected && defaultStyles.classes.selectedItem,
        classes?.item?.root
      )}
    >
      {!!icon && (
        <ListItemIcon
          className={classes?.item?.icon}
          style={styles?.item?.icon}
        >
          {icon}
        </ListItemIcon>
      )}
      {!!label && (
        <ListItemText
          primaryTypographyProps={{ color: 'inherit' }}
          primary={label}
          className={defaultStyles.cx(
            defaultStyles.classes.itemText,
            classes?.item?.text
          )}
          style={styles?.item?.text}
        />
      )}
    </ListItemButton>
  )
}
