import React, { useCallback, useMemo, useState } from 'react'
import { Typography } from '@mui/material'
import { PopUp, PopUpProps } from './PopUp'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { TextField } from '@smartb/g2-forms'
import { Action } from '@smartb/g2-components'
import { cx } from '@emotion/css'

interface ConfirmationPopUpClasses {
  strongConfirmationText?: string
  textField?: string
}

interface ConfirmationPopUpStyles {
  strongConfirmationText?: React.CSSProperties
  textField?: React.CSSProperties
}

export type ConfirmationPopUpVariant = 'validation' | 'deletion'

export interface ConfirmationPopUpBasicProps extends BasicProps {
  /**
   * The event called when the user request to close the pop-up
   */
  onClose: (event: React.ChangeEvent<{}>) => void
  /**
   * The event called when the user request to confirm
   */
  onConfirm: (event: React.ChangeEvent<{}>) => void
  /**
   * Define if the po-up is open
   *
   * @default false
   */
  open: boolean
  /**
   * The content of the popup if `strongConfirmation` is false
   */
  children?: React.ReactNode
  /**
   * If true the user will have to copy a word in a textField in order to confirm
   *
   * @default false
   */
  strongConfirmation?: boolean
  /**
   * The text displayed if the `strongConfirmation` is true
   *
   * @default (<> Please confirm by typing the word: <strong>confirmation</strong> in the field below: </> )
   */
  strongConfirmationText?: React.ReactNode
  /**
   * The text to write in the textfield in order to confirm
   *
   * @default "confirmation"
   */
  strongConfirmationWord?: string
  /**
   * The text displayed if the textField value is wrong
   *
   * @default "The word typed is wrong"
   */
  strongConfirmationErrorText?: string
  /**
   * The text insert in the confirm button
   *
   * @default 'Confirm'
   */
  validateText?: string
  /**
   * The text insert in the cancel button
   *
   * @default 'Cancel'
   */
  cancelText?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: ConfirmationPopUpClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: ConfirmationPopUpStyles
  /**
   * The styles variations options.
   * @default 'validation'
   */
  variant?: ConfirmationPopUpVariant
}

export type ConfirmationPopUpProps = MergeMuiElementProps<
  PopUpProps,
  ConfirmationPopUpBasicProps
>

export const ConfirmationPopUp = (props: ConfirmationPopUpProps) => {
  const {
    onClose,
    onConfirm,
    open = false,
    children,
    strongConfirmation = false,
    strongConfirmationText = (
      <>
        Please confirm by typing the word: <strong>confirmation</strong> in the
        field below:
      </>
    ),
    strongConfirmationWord = 'confirmation',
    strongConfirmationErrorText = 'The word typed is wrong',
    validateText = 'Confirm',
    cancelText = 'Cancel',
    classes,
    styles,
    className,
    variant,
    ...other
  } = props
  const [value, setValue] = useState('')
  const [error, setError] = useState(strongConfirmation)

  const onValueChange = useCallback(
    (value: string) => {
      setValue(value)
      if (value === strongConfirmationWord) setError(false)
      else setError(true)
    },
    [strongConfirmationWord]
  )

  const handleClose = useCallback(
    (event: React.ChangeEvent<{}>) => {
      setValue('')
      onClose(event)
    },
    [onClose]
  )

  const actions = useMemo(
    (): Action[] => [
      {
        key: 'ConfirmationPopUp-' + cancelText,
        label: cancelText,
        variant: 'cancellation',
        onClick: handleClose
      },
      {
        key: 'ConfirmationPopUp-' + validateText,
        label: validateText,
        onClick: onConfirm,
        variant: variant === 'deletion' ? 'deletion' : 'contained',
        disabled: error
      }
    ],
    [validateText, cancelText, handleClose, onConfirm, error, variant]
  )

  return (
    <PopUp
      open={open}
      actions={actions}
      onClose={handleClose}
      className={cx('AruiConfirmationPopUp-strongConfirmationText', className)}
      {...other}
    >
      {strongConfirmation ? (
        <>
          <Typography
            className={cx(
              'AruiConfirmationPopUp-strongConfirmationText',
              classes?.strongConfirmationText
            )}
            style={styles?.strongConfirmationText}
            variant='body1'
          >
            {strongConfirmationText}
          </Typography>
          <TextField
            value={value}
            onChange={onValueChange}
            size='small'
            error={error}
            errorMessage={strongConfirmationErrorText}
            className={cx(
              'AruiConfirmationPopUp-textField',
              classes?.textField
            )}
            style={styles?.textField}
          />
        </>
      ) : (
        children
      )}
    </PopUp>
  )
}
