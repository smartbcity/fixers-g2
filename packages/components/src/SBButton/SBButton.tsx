import React from 'react'
import {
  BasicProps,
  MergeReactElementProps,
  lowLevelStyles
} from '@smartb/g2-themes'
import { Theme, useTheme } from '@smartb/g2-themes'

/**
 * @deprecated
 */
const useStyles = lowLevelStyles<Theme>()({
    button: {
      backgroundColor: theme => theme.colors.secondary,
      padding: '10px 30px',
      clipPath:
        'polygon(7% 0, 100% 0, 100% 20%, 100% 80%, 93% 100%, 0 100%, 0 80%, 0 20%)',
      WebkitClipPath:
        'polygon(7% 0, 100% 0, 100% 20%, 100% 80%, 93% 100%, 0 100%, 0 80%, 0 20%)',
      border: 'none',
      cursor: 'pointer',
      transition: '0.2s',
      borderRadius: '1px',
      fontSize: '1rem',
      '&:focus': {
        outline: 'none'
      }
    },
    hover: {
      '&:hover': {
        clipPath:
          'polygon(0 0, 93% 0, 100% 20%, 100% 80%, 100% 100%, 7% 100%, 0 80%, 0 20%)',
        WebkitClipPath:
          'polygon(0 0, 93% 0, 100% 20%, 100% 80%, 100% 100%, 7% 100%, 0 80%, 0 20%)'
      }
    },
    disabled: {
      opacity: '0.8',
      cursor: 'default'
    }
  })

export interface SBButtonBasicProps extends BasicProps {
  /**
   * The react children props
   */
  children?: React.ReactNode
  /**
   * The event called when the button is clicked
   * @param event
   */
  onClick?: (event: React.ChangeEvent<{}>) => void
  /**
   * If true the button will be disabled
   */
  disabled?: boolean
  /**
   * If false the hoverEffect will be disabled
   */
  hoverEffect?: boolean
}

export type SBButtonProps = MergeReactElementProps<'button', SBButtonBasicProps>

/**
 * @deprecated
 */
export const SBButton = React.forwardRef(
  (props: SBButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    const {
      children,
      onClick,
      disabled = false,
      className,
      style,
      hoverEffect = true,
      id,
      ...other
    } = props
    const theme = useTheme()
    const classes = useStyles(theme)
    return (
      <button
        ref={ref}
        disabled={disabled}
        style={style}
        className={`${classes.button} ${!!className && className} ${
          hoverEffect && !disabled && classes.hover
        } ${disabled && classes.disabled}`}
        onClick={!disabled ? onClick : () => {}}
        id={id}
        {...other}
      >
        {children}
      </button>
    )
  }
)
