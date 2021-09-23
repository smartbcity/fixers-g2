import { makeStyles  } from  '@mui/material'
import { Styles } from '@mui/styles'
import { Theme as MuiTheme} from '@mui/material/styles'

export interface BasicProps {
  /**
   * The id of the root component
   */
  id?: string
  /**
   * The style of the root component
   */
  style?: React.CSSProperties
  /**
   * The className of the root component
   */
  className?: string
}

export function lowLevelStyles<
  Props extends object = {},
  Theme = MuiTheme,
>() {
  return function<ClassKey extends string = string>(styles: Styles<Theme, Props, ClassKey>) {
    return makeStyles<Theme, Props, ClassKey>(styles, { index: -10 })
  }
} 

export function midLevelStyles<
  Props extends object = {},
  Theme = MuiTheme,
>() {
  return function<ClassKey extends string = string>(styles: Styles<Theme, Props, ClassKey>) {
    return makeStyles<Theme, Props, ClassKey>(styles, { index: 1 })
  }
} 
export function highLevelStyles<
  Props extends object = {},
  Theme = MuiTheme,
>() {
  return function<ClassKey extends string = string>(styles: Styles<Theme, Props, ClassKey>) {
    return makeStyles<Theme, Props, ClassKey>(styles, { index: 2 })
  }
} 

export type MergeReactElementProps<
  T extends React.ElementType,
  P extends object = {}
> = Omit<React.ComponentPropsWithRef<T>, keyof P> & P

export type MergeMuiElementProps<MuiElement, P extends object = {}> = Omit<MuiElement, keyof P> &
  P
