import { IconButton, IconButtonProps } from '@mui/material'
import { CheckRounded } from '@mui/icons-material'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { makeG2STyles } from '@smartb/g2-themes'
import clsx from 'clsx'
import React, { forwardRef, useCallback, useState } from 'react'
import { Clipboard } from '../icons'
import { Tooltip } from '@smartb/g2-notifications'

const useStyles = makeG2STyles()((theme) => ({
  clipboardIcon: {
    width: '20px',
    height: '20px'
  },
  successIcon: {
    width: '20px',
    height: '20px',
    color: theme.colors.success
  }
}))

interface CopyToClipboardClasses {
  tooltip?: string
  clipBoardIcon?: string
  successIcon?: string
}

interface CopyToClipboardStyles {
  tooltip?: React.CSSProperties
  clipBoardIcon?: React.CSSProperties
  successIcon?: React.CSSProperties
}

export interface CopyToClipboardBasicProps extends BasicProps {
  /**
   * The value that will be copied to the clipboard
   */
  value: string
  /**
   * The text displayed in the tootltip
   *
   * @default "copy to clipboard"
   */
  helperText?: string
  /**
   * The text displayed in the tootltip
   *
   * @default "Already copied, click here to re-copy it"
   */
  successHelperText?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: CopyToClipboardClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: CopyToClipboardStyles
}

export type CopyToClipboardProps = MergeMuiElementProps<
  IconButtonProps,
  CopyToClipboardBasicProps
>

const CopyToClipboardBase = (
  props: CopyToClipboardProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const {
    value,
    helperText = 'copy to clipboard',
    successHelperText = 'Already copied, click here to re-copy it',
    className,
    classes,
    styles,
    ...other
  } = props
  const [done, setDone] = useState(false)
  const defaultStyles = useStyles()

  const onCopy = useCallback(() => {
    if (window.isSecureContext) {
      navigator.clipboard.writeText(value)
      setDone(true)
    } else {
      console.error('You cannot access the clipboard from a non https website')
    }
  }, [value])

  return (
    <Tooltip
      className={clsx(classes?.tooltip, 'AruiCopyToClipboard-tooltip')}
      style={styles?.tooltip}
      helperText={done ? successHelperText : helperText}
    >
      <IconButton
        {...other}
        ref={ref}
        className={clsx(className, 'AruiCopyToClipboard-root')}
        onClick={onCopy}
        size='large'
      >
        {done ? (
          <CheckRounded
            className={clsx(
              defaultStyles.classes.successIcon,
              classes?.successIcon,
              'AruiCopyToClipboard-successIcon'
            )}
            style={styles?.successIcon}
          />
        ) : (
          <Clipboard
            className={clsx(
              defaultStyles.classes.clipboardIcon,
              classes?.clipBoardIcon,
              'AruiCopyToClipboard-clipBoardIcon'
            )}
            style={styles?.clipBoardIcon}
          />
        )}
      </IconButton>
    </Tooltip>
  )
}

export const CopyToClipboard = forwardRef(
  CopyToClipboardBase
) as typeof CopyToClipboardBase
