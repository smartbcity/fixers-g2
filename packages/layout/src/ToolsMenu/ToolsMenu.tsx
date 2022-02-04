import React, { useState } from 'react'
import { MenuItems } from '@smartb/g2-components'
import { IconButton, Menu as MuiMenu } from '@mui/material'
import { ItemsLayout, Display, ItemsLayoutBasicProps } from '../ItemsLayout'
import { TabsMenuProps } from '../TabsMenu'
import { TabsMenu } from '../TabsMenu'
import { BasicProps, makeG2STyles } from '@smartb/g2-themes'

const useStyles = makeG2STyles()({
  menu: {
    maxWidth: '300px',
    maxHeight: '500px'
  },
  menuGrid: {
    maxWidth: '375px'
  },
  list: {
    padding: '0 !important',
    width: '100% !important',
    '& > div': {
      outline: '0 !important'
    }
  },
  menuOpened: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)'
  },
  gridItemsLayoutMinWidth: {
    maxWidth: '375px',
    maxHeight: '410px',
    minWidth: '358px'
  },
  gridItemsLayout: {
    maxWidth: '375px',
    maxHeight: '410px'
  },
  listItemsLayout: {
    maxHeight: '410px',
    overflow: 'auto'
  }
})

interface ToolsMenuClasses {
  iconButton?: string
  menu?: string
}

interface ToolsMenuStyles {
  iconButton?: React.CSSProperties
  menu?: React.CSSProperties
}

export interface ToolsMenuProps extends BasicProps {
  /**
   * Menu contains all the items that will be displayed in the profile
   */
  menu: MenuItems
  /**
   * The organization of the items
   */
  display?: Display
  /**
   * The classes applied to the different part of the component
   */
  classes?: ToolsMenuClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: ToolsMenuStyles
  /**
   * The optionnal props of the ItemsLayout (normaly given to override classes and styles)
   *
   * **See the reference below** ⬇️
   */
  itemsLayoutProps?: Partial<ItemsLayoutBasicProps>
  /**
   * The optionnal props of the TabsMenu (normaly given to override classes and styles)
   *
   * **See the reference below** ⬇️
   */
  tabsMenuProps?: Partial<TabsMenuProps>
}

export const ToolsMenu = (props: ToolsMenuProps) => {
  const {
    menu,
    style,
    display = 'list',
    className,
    id,
    classes,
    styles,
    itemsLayoutProps,
    tabsMenuProps
  } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const defaultStyles = useStyles()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div
      className={defaultStyles.cx('AruiToolsMenu-root', className)}
      style={style}
      id={id}
    >
      <IconButton
        className={defaultStyles.cx(
          !!open && defaultStyles.classes.menuOpened,
          'AruiToolsMenu-iconButton',
          classes?.iconButton
        )}
        style={styles?.iconButton}
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
        size='large'
      >
        {menu.icon}
      </IconButton>
      <MuiMenu
        className={defaultStyles.cx('AruiToolsMenu-menu', classes?.menu)}
        style={styles?.menu}
        classes={{
          paper: `${defaultStyles.classes.menu} ${
            display === 'grid' && defaultStyles.classes.menuGrid
          }`,
          list: defaultStyles.classes.list
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {menu.items && menu.items.length === 1 ? (
          <ItemsLayout
            menu={menu.items[0]}
            display={display}
            {...itemsLayoutProps}
          />
        ) : (
          <div>
            {menu.items && (
              <TabsMenu
                variant={display === 'list' ? 'fixedWidth' : 'fullWidth'}
                tabs={menu.items.map((it) => {
                  return { label: it.label, icon: it.icon }
                })}
                {...tabsMenuProps}
              >
                {menu.items &&
                  menu.items.map((section, index) => (
                    <div key={index}>
                      <ItemsLayout
                        menu={section}
                        display={display}
                        className={
                          display !== 'list'
                            ? section.items && section.items.length >= 3
                              ? defaultStyles.classes.gridItemsLayoutMinWidth
                              : defaultStyles.classes.gridItemsLayout
                            : defaultStyles.classes.listItemsLayout
                        }
                        {...itemsLayoutProps}
                      />
                    </div>
                  ))}
              </TabsMenu>
            )}
          </div>
        )}
      </MuiMenu>
    </div>
  )
}
