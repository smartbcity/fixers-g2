import React, { ChangeEvent, forwardRef } from 'react'

import {
  Checkbox,
  FormControlLabel,
  CheckboxProps,
  FormHelperText,
  Box,
  Skeleton,
  SxProps,
  Theme
} from '@mui/material'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import { CheckIcon, UnCheckIcon } from '../assets/icons'
import { IndeterminateIcon } from '../assets/icons/IndeterminateIcon'

const useStyles = makeG2STyles()((theme) => ({
  base: {
    position: 'relative',
    width: 'fit-content',
    '&:hover .MuiFormHelperText-root': {
      position: 'relative',
      top: '0%',
      whiteSpace: 'unset',
      overflow: 'visible',
      textOverflow: 'ellipsis',
      marginBottom: '-18px'
    }
  },
  root: {
    borderRadius: 20,
    padding: `${theme.spacing / 2}px ${theme.spacing * 1.25}px`
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
    },
    '& .AruiCheckBox-inderterminateIcon rect': {
      fill: theme.colors.primary + 'B3'
    },
    '&:hover .AruiCheckBox-inderterminateIcon rect': {
      fill: theme.colors.primary
    },
    '& .AruiCheckBox-inderterminateIcon path': {
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
    },
    '& .AruiCheckBox-inderterminateIcon rect': {
      fill: '#E6E9EF'
    },
    '&:hover .AruiCheckBox-inderterminateIcon rect': {
      fill: '#E6E9EF'
    },
    '& .AruiCheckBox-inderterminateIcon path': {
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
    marginLeft: '12px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 1.667,
    color: theme.colors.error,
    width: '100%'
  }
}))

export interface CheckBoxClasses {
  formControl?: string
  checkbox?: string
  checkIcon?: string
  unCheckIcon?: string
  inderterminateIcon?: string
  helperText?: string
}

export interface CheckBoxStyles {
  formControl?: React.CSSProperties
  checkbox?: React.CSSProperties
  checkIcon?: React.CSSProperties
  unCheckIcon?: React.CSSProperties
  inderterminateIcon?: React.CSSProperties
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
  label?: React.ReactNode

  /**
   * If true, the checkbox will be disabled
   *
   * @default false
   */
  disabled?: boolean

  /**
   * For this input readonly has the same effect than disabled
   *
   * @default false
   */
  readonly?: boolean

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
   * If you want to add additionnals element near to the input use this prop
   */
  createInputContainer?: (input: JSX.Element) => JSX.Element
  /**
   * Indicates if the data is currently loading
   *
   * @default false
   */
  isLoading?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: CheckBoxClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: CheckBoxStyles
  sx?: SxProps<Theme>
}

export type CheckBoxProps = MergeMuiElementProps<
  CheckboxProps,
  CheckBoxBasicProps
>

const CheckBoxBase = (
  props: CheckBoxProps,
  ref: React.ForwardedRef<HTMLButtonElement>
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
    disabled = false,
    errorMessage,
    isLoading = false,
    readonly = false,
    createInputContainer,
    sx,
    ...other
  } = props

  const defaultStyles = useStyles()

  const formControl = (
    <FormControlLabel
      className={defaultStyles.cx(
        defaultStyles.classes.container,
        (disabled || readonly) && defaultStyles.classes.containerDisabled,
        'AruiCheckBox-root',
        classes?.formControl
      )}
      style={styles?.formControl}
      control={
        <Checkbox
          ref={ref}
          {...other}
          checked={checked}
          disabled={disabled || readonly}
          id={id}
          className={defaultStyles.cx(
            defaultStyles.classes.root,
            'AruiCheckBox-checkbox',
            classes?.checkbox
          )}
          style={styles?.checkbox}
          disableRipple
          icon={
            <UnCheckIcon
              className={defaultStyles.cx(
                defaultStyles.classes.iconSize,
                'AruiCheckBox-unCheckIcon',
                classes?.checkIcon
              )}
              style={styles?.checkIcon}
            />
          }
          checkedIcon={
            <CheckIcon
              className={defaultStyles.cx(
                defaultStyles.classes.iconSize,
                'AruiCheckBox-checkIcon',
                classes?.unCheckIcon
              )}
              style={styles?.unCheckIcon}
            />
          }
          indeterminateIcon={
            <IndeterminateIcon
              className={defaultStyles.cx(
                defaultStyles.classes.iconSize,
                'AruiCheckBox-inderterminateIcon',
                classes?.inderterminateIcon
              )}
              style={styles?.inderterminateIcon}
            />
          }
        />
      }
      label={label}
      labelPlacement='end'
    />
  )

  return (
    <Box
      className={defaultStyles.cx(
        defaultStyles.classes.base,
        'AruiTextfield-root',
        className
      )}
      style={style}
      sx={sx}
    >
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            gap: '10px'
          }}
        >
          <Skeleton
            animation='wave'
            sx={{ width: '20px', height: '20px', transform: 'none' }}
          />
          <Skeleton
            animation='wave'
            sx={{ width: '150px', height: '20px', transform: 'none' }}
          />
        </Box>
      )}
      {!isLoading &&
        (createInputContainer
          ? createInputContainer(formControl)
          : formControl)}
      {errorMessage !== '' && error && (
        <FormHelperText
          className={defaultStyles.cx(
            defaultStyles.classes.helperText,
            'AruiCheckBox-helperText',
            classes?.helperText
          )}
          style={styles?.helperText}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  )
}

export const CheckBox = forwardRef(CheckBoxBase) as typeof CheckBoxBase
