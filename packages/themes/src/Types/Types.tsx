import { createMakeStyles } from 'tss-react'
import { useTheme } from '../ThemeContextProvider'
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

const { makeStyles } = createMakeStyles({ useTheme })

export const makeG2STyles = makeStyles

export type MergeReactElementProps<
  T extends React.ElementType,
  P extends object = {}
> = Omit<React.ComponentPropsWithRef<T>, keyof P> & P

export type MergeMuiElementProps<MuiElement, P extends object = {}> = Omit<
  MuiElement,
  keyof P
> &
  P
