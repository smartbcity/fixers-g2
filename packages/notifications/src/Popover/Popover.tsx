import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import { ClickAwayListener, Popper, PopperProps } from '@mui/material'
import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import { CloseRounded } from '@mui/icons-material'

const useStyles = makeG2STyles()((theme) => ({
  popper: {
    borderRadius: theme.borderRadius,
    background: 'white',
    zIndex: 1,
    padding: theme.spacing * 3,
    boxShadow: theme.shadows[3],
    '&[data-popper-placement="bottom"]': {
      marginTop: '25px !important',
      '& .AruiPopover-arrowContainer': {
        top: 0,
        left: 0,
        marginTop: '-25px',
        marginLeft: '-20px'
      }
    },
    '&[data-popper-placement="top"]': {
      marginBottom: '25px !important',
      '& .AruiPopover-arrow': {
        transform: 'rotate(180deg)'
      },
      '& .AruiPopover-arrowContainer': {
        bottom: 0,
        left: 0,
        marginLeft: '-20px'
      }
    },
    '&[data-popper-placement="right"]': {
      marginLeft: '25px !important',
      '& .AruiPopover-arrow': {
        transform: 'rotate(270deg)'
      },
      '& .AruiPopover-arrowContainer': {
        left: 0,
        marginLeft: '-32px',
        marginTop: '-12px'
      }
    },
    '&[data-popper-placement="left"]': {
      marginRight: '25px !important',
      '& .AruiPopover-arrow': {
        transform: 'rotate(90deg)'
      },
      '& .AruiPopover-arrowContainer': {
        right: 0,
        marginRight: '8px',
        marginTop: '-12px'
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
      boxShadow: theme.shadows[1]
    }
  }
}))

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

  const defaultStyles = useStyles()
  const [arrow, setArrow] = useState<HTMLDivElement | undefined>(undefined)
  const handleClickAway = useCallback(() => {
    if (closeOnClickAway && onClose && open) {
      onClose()
    }
  }, [closeOnClickAway, onClose, open])

  const setArrowRef = useCallback((ref) => setArrow(ref), [])

  const modifiers = useMemo(
    () => [
      {
        name: 'arrow',
        enabled: true,
        options: {
          element: arrow,
          padding: 10
        }
      }
    ],
    [arrow]
  )

  const popper = (
    <Popper
      ref={ref}
      id={id}
      className={defaultStyles.cx(
        defaultStyles.classes.popper,
        'AruiPopover-root',
        className
      )}
      style={style}
      open={open}
      modifiers={modifiers}
      {...other}
    >
      <div ref={setArrowRef} className={'AruiPopover-arrowContainer'}>
        <div
          className={defaultStyles.cx(
            defaultStyles.classes.arrow,
            'AruiPopover-arrow',
            classes?.arrow
          )}
          style={styles?.arrow}
        />
      </div>
      {onClose && (
        <CloseRounded
          className={defaultStyles.cx(
            defaultStyles.classes.closeIcon,
            'AruiPopover-closeIcon',
            classes?.closeIcon
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
