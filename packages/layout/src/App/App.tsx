import React from 'react'
import { ToolsMenuProps, ToolsMenu } from '../ToolsMenu'
import { makeG2STyles } from '@smartb/g2-themes'
import { MenuItem } from '@smartb/g2-components'
import { ToolsPanel } from '../ToolsPanel'
import { TitleContainer } from './TitleContainer'
import { AppMenu, AppLogoProps } from '../AppMenu'
import { AppLayout, AppLayoutProps } from '..'
import { useMediaQuery } from '@mui/material'

const useStyles = makeG2STyles()({
  grow: {
    flexGrow: 1
  }
})

export interface AppProps extends AppLayoutProps {
  /**
   * An array that contains every tools menu that will be displayed in the navBar
   *
   * **See the reference below** ⬇️
   */
  toolsMenuProps?: ToolsMenuProps[]
  /**
   * The content that will be displayed in the navBAr at the left of the profile
   */
  navBarContent?: React.ReactNode
  /**
   * The list of the actions that will be displayed in the drawer menu
   */
  menu?: MenuItem[]
  /**
   * The logo in the navBar
   */
  logo: AppLogoProps
  /**
   * The title that will be displayed in the navBar
   */
  title?: string
  /**
   * The logo in the title
   */
  titleLogo?: string
}

// TODO App should use AppLayout instead of duplicate the code.
export const App = (props: AppProps) => {
  const {
    toolsMenuProps = [],
    navBarContent,
    menu,
    title,
    logo,
    titleLogo,
    showAppBar = true,
    drawerContent,
    ...other
  } = props
  const defaultStyles = useStyles()
  const below600px = useMediaQuery('(max-width:600px)')
  const over400px = useMediaQuery('(min-width:400px)')

  return (
    <AppLayout
      {...other}
      showAppBar={showAppBar}
      drawerContent={
        <>
          {menu && <AppMenu menu={menu} logo={logo} />}
          {drawerContent}
          {(below600px || !showAppBar) && navBarContent}
          {(below600px || !showAppBar) &&
            toolsMenuProps &&
            toolsMenuProps.map((toolsMenuProps) => (
              <ToolsPanel
                menu={toolsMenuProps.menu}
                key={toolsMenuProps.menu.key}
              />
            ))}
        </>
      }
      appBarContent={
        showAppBar ? (
          <>
            <TitleContainer title={title} logo={titleLogo} />
            <div
              className={defaultStyles.cx(
                defaultStyles.classes.grow,
                'AruiAppBar-flexFiller'
              )}
            />
            {!below600px && navBarContent}
            {over400px &&
              toolsMenuProps.map((toolsMenuProps, index) => (
                <ToolsMenu key={index} {...toolsMenuProps} />
              ))}
          </>
        ) : (
          <TitleContainer title={title} logo={titleLogo} />
        )
      }
    />
  )
}
