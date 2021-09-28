import React, { forwardRef } from 'react'
import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps
} from  '@mui/material'
import {
  MergeMuiElementProps,
  BasicProps,
  lowLevelStyles,
  Theme,
  useTheme
} from '@smartb/g2-themes'
import clsx from 'clsx'

const useStyles = lowLevelStyles<Theme>()({
  root: {
    background: (theme) => theme.colors.primary,
    fontSize: '13px',
    padding: '8px',
    boxShadow: (theme) => theme.shadows[1]
  },
  arrow: {
    color: (theme) => theme.colors.primary,
    width: '16px !important',
    height: '12px !important',
    marginTop: '-11px !important',
    '&::before': {
      borderRadius: '2px'
    }
  }
})

export interface TooltipBasicProps extends BasicProps {
  /**
   * The element to tooltiped
   */
  children: React.ReactElement<any, any>
  /**
   * The text that will be displayed in the tooltip
   */
  helperText: string
  /**
   * Indicates wether the tooltip is open or not. If open is undefined the openning of the tooltip
   * will be actionned by the hover on the given element.
   *
   * You can use the Material-ui `onClose` and `onOpen` props to controlthe tooltip openning manually.
   */
  open?: boolean
}

export type TooltipProps = MergeMuiElementProps<
  Omit<MuiTooltipProps, 'title'>,
  TooltipBasicProps
>

const TooltipBase = (
  props: TooltipProps,
  ref: React.ForwardedRef<HTMLElement>
) => {
  const {
    children,
    helperText,
    style,
    className,
    id,
    classes,
    open,
    ...other
  } = props
  const theme = useTheme()
  const defaultClasses = useStyles(theme)
  return (
    <MuiTooltip
      ref={ref}
      id={id}
      className={clsx(className, 'AruiTooltip-root')}
      style={style}
      arrow
      classes={{
        ...classes,
        tooltip: defaultClasses.root,
        arrow: defaultClasses.arrow
      }}
      {...other}
      open={open}
      title={helperText}
      placement='bottom'
    >
      {children}
    </MuiTooltip>
  )
}

export const Tooltip = forwardRef(TooltipBase) as typeof TooltipBase
