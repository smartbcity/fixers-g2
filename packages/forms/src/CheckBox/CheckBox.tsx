import React, { ChangeEvent, forwardRef } from 'react'

import {
  Checkbox,
  FormControlLabel,
  CheckboxProps,
  FormHelperText
} from '@mui/material'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import clsx from 'clsx'
import { CheckIcon, UnCheckIcon } from '../assets/icons'

const useStyles = makeG2STyles()((theme) => ({
  base: {
    position: 'relative',
    width: 'fit-content'
  },
  root: {
    borderRadius: 20,
    padding: '5px 10px'
  },
  container: {
    marginLeft: '0px',
    marginRight: '0px',
    '& .MuiTypography-root': {
      fontSize: '14px'
    },
    '& .MuiButtonBase-root:hover': {
      background: 'transparent'
    },
    '& .AruiCheckBox-unCheckIcon': {
      stroke: '#C5C7D0',
      fill: 'none'
    },
    '&:hover .AruiCheckBox-unCheckIcon': {
      stroke: '#323338'
    },
    '& .AruiCheckBox-checkIcon rect': {
      fill: theme.colors.primary + 'B3'
    },
    '&:hover .AruiCheckBox-checkIcon rect': {
      fill: theme.colors.primary
    },
    '& .AruiCheckBox-checkIcon path': {
      fill: 'white'
    }
  },
  containerDisabled: {
    '& .MuiFormControlLabel-label.Mui-disabled': {
      color: 'unset',
      opacity: 0.7
    },
    '& .AruiCheckBox-unCheckIcon': {
      fill: '#E6E9EF',
      stroke: '#E6E9EF'
    },
    '&:hover .AruiCheckBox-unCheckIcon': {
      fill: '#E6E9EF',
      stroke: '#E6E9EF'
    },
    '& .AruiCheckBox-checkIcon rect': {
      fill: '#E6E9EF'
    },
    '&:hover .AruiCheckBox-checkIcon rect': {
      fill: '#E6E9EF'
    },
    '& .AruiCheckBox-checkIcon path': {
      fill: '#676879'
    }
  },
  iconSize: {
    width: '20px',
    height: '20px'
  },
  helperText: {
    position: 'absolute',
    top: '100%',
    marginTop: '-2px',
    marginLeft: '14px',
    color: theme.colors.error,
    width: 'max-content'
  }
}))

export interface CheckBoxClasses {
  formControl?: string
  checkbox?: string
  checkIcon?: string
  unCheckIcon?: string
  helperText?: string
}

export interface CheckBoxStyles {
  formControl?: React.CSSProperties
  checkbox?: React.CSSProperties
  checkIcon?: React.CSSProperties
  unCheckIcon?: React.CSSProperties
  helperText?: React.CSSProperties
}

export interface CheckBoxBasicProps extends BasicProps {
  /**
   * If true, the component is checked
   *
   * @default false
   */
  checked?: boolean

  /**
   * The label displayed at the right of the checkbox
   */
  label?: string

  /**
   * If true, the checkbox will be disabled
   *
   * @default false
   */
  disabled?: boolean

  /**
   * Define if the value of the input is valid or not
   *
   * @default false
   */
  error?: boolean

  /**
   * The message displayed when the input value is wrong
   */
  errorMessage?: string

  /**
   * Callback fired when the state is changed
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void
  /**
   * The classes applied to the different part of the component
   */
  classes?: CheckBoxClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: CheckBoxStyles
}

export type CheckBoxProps = MergeMuiElementProps<
  CheckboxProps,
  CheckBoxBasicProps
>

const CheckBoxBase = (
  props: CheckBoxProps,
  ref: React.ForwardedRef<HTMLElement>
) => {
  const {
    checked = false,
    label = '',
    className,
    style,
    id,
    classes,
    styles,
    error,
    disabled,
    errorMessage,
    ...other
  } = props

  const defaultStyles = useStyles()

  return (
    <div
      className={clsx(
        className,
        defaultStyles.classes.base,
        'AruiTextfield-root'
      )}
      style={style}
    >
      <FormControlLabel
        ref={ref}
        className={clsx(
          defaultStyles.classes.container,
          classes?.formControl,
          disabled && defaultStyles.classes.containerDisabled,
          'AruiCheckBox-root'
        )}
        style={styles?.formControl}
        control={
          <Checkbox
            {...other}
            checked={checked}
            disabled={disabled}
            id={id}
            className={clsx(
              defaultStyles.classes.root,
              classes?.checkbox,
              'AruiCheckBox-checkbox'
            )}
            style={styles?.checkbox}
            disableRipple
            icon={
              <UnCheckIcon
                className={clsx(
                  classes?.checkIcon,
                  defaultStyles.classes.iconSize,
                  'AruiCheckBox-unCheckIcon'
                )}
                style={styles?.checkIcon}
              />
            }
            checkedIcon={
              <CheckIcon
                className={clsx(
                  defaultStyles.classes.iconSize,
                  classes?.unCheckIcon,
                  'AruiCheckBox-checkIcon'
                )}
                style={styles?.unCheckIcon}
              />
            }
          />
        }
        label={label}
        labelPlacement='end'
      />
      {errorMessage !== '' && error && (
        <FormHelperText
          className={clsx(
            defaultStyles.classes.helperText,
            classes?.helperText,
            'AruiCheckBox-helperText'
          )}
          style={styles?.helperText}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </div>
  )
}

export const CheckBox = forwardRef(CheckBoxBase) as typeof CheckBoxBase
