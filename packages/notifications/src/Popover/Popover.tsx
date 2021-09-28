import {
  BasicProps,
  lowLevelStyles,
  MergeMuiElementProps,
  Theme,
  useTheme
} from '@smartb/g2-themes'
import { ClickAwayListener, Popper, PopperProps } from '@mui/material'
import React, { forwardRef, useCallback } from 'react'
import { CloseRounded } from '@mui/icons-material'
import clsx from 'clsx'

const useStyles = lowLevelStyles<Theme>()({
  popper: {
    borderRadius: '8px',
    background: 'white',
    zIndex: 1,
    padding: '20px',
    boxShadow: (theme) => theme.shadows[3],
    '&[x-placement*="bottom"]': {
      marginTop: '25px',
      '& .AruiPopover-arrow': {
        top: 0,
        left: 0,
        marginTop: '-25px'
      }
    },
    '&[x-placement*="top"]': {
      marginBottom: '25px',
      '& .AruiPopover-arrow': {
        bottom: 0,
        left: 0,
        marginBottom: '-25px',
        transform: 'rotate(180deg)'
      }
    },
    '&[x-placement*="right"]': {
      marginLeft: '25px',
      '& .AruiPopover-arrow': {
        left: 0,
        marginLeft: '-32px',
        transform: 'rotate(270deg)'
      }
    },
    '&[x-placement*="left"]': {
      marginRight: '25px',
      '& .AruiPopover-arrow': {
        right: 0,
        marginRight: '-32px',
        transform: 'rotate(90deg)'
      }
    }
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    cursor: 'pointer',
    width: 20,
    height: 20,
    color: '#676879'
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '40px',
    height: '25px',
    color: 'white',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      background: 'white',
      width: '100%',
      height: '100%',
      borderStyle: 'solid',
      transformOrigin: '0 100%',
      borderRadius: '3px',
      transform: 'rotate(45deg)',
      boxShadow: (theme) => theme.shadows[1]
    }
  }
})

interface PopoverClasses {
  closeIcon?: string
  arrow?: string
}

interface PopoverStyles {
  closeIcon?: React.CSSProperties
  arrow?: React.CSSProperties
}

export interface PopoverBasicProps extends BasicProps {
  /**
   * The children to be displayed in the popper
   */
  children: React.ReactNode
  /**
   * Define ifthe popper is open or not
   *
   * @default false
   */
  open?: boolean
  /**
   * If true the callback `onClose` will be called when the user clickaway from the popper
   *
   * @default false
   */
  closeOnClickAway?: boolean
  /**
   * The event called when the user request to close the popper
   */
  onClose?: () => void
  /**
   * The classes applied to the different part of the component
   */
  classes?: PopoverClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: PopoverStyles
}

export type PopoverProps = MergeMuiElementProps<PopperProps, PopoverBasicProps>

const PopoverBase = (
  props: PopoverProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    children,
    open = false,
    closeOnClickAway = false,
    onClose,
    className,
    style,
    id,
    classes,
    styles,
    ...other
  } = props
  const theme = useTheme()
  const defaultClasses = useStyles(theme)
  const handleClickAway = useCallback(() => {
    if (closeOnClickAway && onClose && open) {
      onClose()
    }
  }, [closeOnClickAway, onClose, open])
  const popper = (
    <Popper
      ref={ref}
      id={id}
      className={clsx(className, defaultClasses.popper, 'AruiPopover-root')}
      style={style}
      open={open}
      modifiers={[
        {
          name: 'arrow',
          enabled: true,
          options: {
            element: '.AruiPopover-arrow'
          }
        }
      ]}
      transition
      {...other}
      anchorEl={other.anchorEl}
    >
      <div
        className={clsx(
          defaultClasses.arrow,
          classes?.arrow,
          'AruiPopover-arrow'
        )}
        style={styles?.arrow}
      />
      {onClose && (
        <CloseRounded
          className={clsx(
            classes?.closeIcon,
            'AruiPopover-closeIcon',
            defaultClasses.closeIcon
          )}
          style={styles?.closeIcon}
          onClick={onClose}
        />
      )}
      {children}
    </Popper>
  )
  if (closeOnClickAway && open)
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        {popper}
      </ClickAwayListener>
    )
  return popper
}

export const Popover = forwardRef(PopoverBase) as typeof PopoverBase
