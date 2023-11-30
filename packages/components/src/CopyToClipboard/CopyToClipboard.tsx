import { IconButton, IconButtonProps } from '@mui/material'
import { CheckRounded } from '@mui/icons-material'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { makeG2STyles } from '@smartb/g2-themes'
import React, { forwardRef, useCallback, useState } from 'react'
import { Clipboard } from '../icons'
import { Tooltip } from '@smartb/g2-notifications'
import { useTranslation } from 'react-i18next'

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
  const { value, className, classes, styles, ...other } = props
  const [done, setDone] = useState(false)
  const defaultStyles = useStyles()
  const { t } = useTranslation()

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
      className={defaultStyles.cx(
        'AruiCopyToClipboard-tooltip',
        classes?.tooltip
      )}
      style={styles?.tooltip}
      helperText={done ? t('g2.copySuccess') : t('g2.copyToClipboard')}
    >
      <IconButton
        {...other}
        ref={ref}
        className={defaultStyles.cx('AruiCopyToClipboard-root', className)}
        onClick={onCopy}
        size='large'
      >
        {done ? (
          <CheckRounded
            className={defaultStyles.cx(
              defaultStyles.classes.successIcon,
              'AruiCopyToClipboard-successIcon',
              classes?.successIcon
            )}
            style={styles?.successIcon}
          />
        ) : (
          <Clipboard
            className={defaultStyles.cx(
              defaultStyles.classes.clipboardIcon,
              'AruiCopyToClipboard-clipBoardIcon',
              classes?.clipBoardIcon
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
