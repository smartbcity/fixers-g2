// TODO This should probably merged with styles
import { PartialDeep } from '@smartb/g2-utils'

export interface AppBarProps {
  height: number
  background: string
}

export interface AppMenuProps {
  width: number
  background: string
  zIndex: number
}

export interface AppMainProps {
  background?: string
  padding: number
}

export interface AppStylePropsBase {
  // detailDrawerWidth: number
  appBar: AppBarProps
  menu: AppMenuProps
  main: AppMainProps
}

export type AppStyleProps = PartialDeep<AppStylePropsBase>

export const defaultAppStyleProps: AppStylePropsBase = {
  appBar: {
    height: 100,
    background: 'white'
  },
  menu: {
    width: 210,
    background: 'white',
    zIndex: 1200
  },
  main: {
    background: '#f4f4f4',
    padding: 24
  }
}

export const applyAppStyleProps = (
  partial?: AppStyleProps
): AppStylePropsBase => {
  if (!partial) {
    return defaultAppStyleProps
  }
  return {
    appBar: { ...defaultAppStyleProps.appBar, ...partial.appBar },
    menu: { ...defaultAppStyleProps.menu, ...partial.menu },
    main: { ...defaultAppStyleProps.main, ...partial.main }
  }
}
