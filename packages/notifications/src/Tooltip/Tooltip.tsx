import React, { forwardRef } from 'react'
import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps
} from '@mui/material'
import {
  MergeMuiElementProps,
  BasicProps,
  makeG2STyles
} from '@smartb/g2-themes'

const useStyles = makeG2STyles()((theme) => ({
  root: {
    background: theme.colors.primary,
    fontSize: '13px',
    padding: '8px',
    boxShadow: theme.shadows[1]
  },
  arrow: {
    color: theme.colors.primary,
    width: '16px !important',
    height: '12px !important',
    marginTop: '-11px !important',
    '&::before': {
      borderRadius: '2px'
    }
  }
}))

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

  const defaultStyles = useStyles()
  return (
    <MuiTooltip
      ref={ref}
      id={id}
      className={defaultStyles.cx('AruiTooltip-root', className)}
      style={style}
      arrow
      classes={{
        ...classes,
        tooltip: defaultStyles.classes.root,
        arrow: defaultStyles.classes.arrow
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
