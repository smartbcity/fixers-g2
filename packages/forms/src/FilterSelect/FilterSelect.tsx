import React, { useCallback, useMemo } from 'react'
import {
  Box,
  Chip,
  FormControl,
  InputBaseComponentProps,
  InputLabel,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  SelectProps as MuiSelectProps
} from '@mui/material'
import { ClearRounded } from '@mui/icons-material'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps,
  useTheme
} from '@smartb/g2-themes'
import clsx from 'clsx'
import { CheckBox } from '../CheckBox'
import { useFilterInputStyles } from '../style'
import tinycolor from 'tinycolor2'

export type Option = {
  key: string | number
  label: string | number
}

export interface FilterSelectClasses {
  label?: string
  select?: string
  input?: string
  chip?: string
  clearIcon?: string
  option?: string
  menu?: string
}

export interface FilterSelectStyles {
  label?: React.CSSProperties
  select?: React.CSSProperties
  input?: React.CSSProperties
  chip?: React.CSSProperties
  clearIcon?: React.CSSProperties
  option?: React.CSSProperties
  menu?: React.CSSProperties
}

const useStyles = makeG2STyles()({
  root: {
    '& .MuiFilledInput-input': {
      margin: '0px 5px'
    },
    '& .MuiSelect-icon': {
      right: '4px',
      color: 'inherit'
    }
  },
  clear: {
    position: 'absolute',
    right: '22px',
    top: '50%',
    width: '21px',
    height: '21px',
    marginTop: '-10px',
    cursor: 'pointer',
    color: '#323338'
  },
  list: {
    padding: '0px',
    '& .MuiListItem-root': {
      padding: '2px',
      paddingRight: '8px'
    }
  },
  selectPaddingWithClear: {
    '& .MuiSelect-root': {
      paddingRight: '44px'
    }
  },
  selectPadding: {
    '& .MuiSelect-root': {
      paddingRight: '28px',
      margin: '0px'
    }
  },
  menu: {
    marginTop: '5px'
  },
  chip: {
    width: '17px',
    height: '17px',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    marginLeft: '7px',
    alignItems: 'center',
    background: 'white',
    border: 'none',
    '& .MuiChip-label': {
      padding: 0,
      fontSize: '12px',
      fontWeight: 600
    }
  },
  label: {
    cursor: 'pointer'
  }
})

export interface FilterSelectBasicProps extends BasicProps {
  /**
   * The label of the select
   *
   */
  label?: string

  /**
   * The value selected
   *
   * @default ''
   */
  value?: string | number

  /**
   * The values of selected. ⚠️ This prop is used only if `multiple` is true
   *
   * @default []
   */
  values?: (string | number)[]

  /**
   * If true the select will be able to handle multiple selections
   *
   *  @default false
   */
  multiple?: boolean

  /**
   * The event called when the value of the slect change
   */
  onChangeValue?: (value: string) => void

  /**
   * The event called when the values of the multiple select change
   */
  onChangeValues?: (values: string[]) => void

  /**
   * List of options available in the option
   *
   * @default []
   */
  options?: Option[]

  /**
   * The event called when the value or the values of the input are removed
   */
  onRemove?: () => void

  /**
   * If true the input will be disabled
   *
   * @default false
   */
  disabled?: boolean

  /**
   * The color of the input
   *
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'default'

  /**
   * The variant of the input
   *
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined'

  /**
   * The classes applied to the different part of the component
   */
  classes?: FilterSelectClasses

  /**
   * The styles applied to the different part of the component
   */
  styles?: FilterSelectStyles
}

export type FilterSelectProps = MergeMuiElementProps<
  Omit<MuiSelectProps, 'ref'>,
  FilterSelectBasicProps
>

export const FilterSelect = React.forwardRef(
  (props: FilterSelectProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      value = '',
      values = [],
      onChangeValue,
      onChangeValues,
      name,
      options = [],
      className,
      placeholder = '',
      style,
      id,
      onRemove,
      disabled = false,
      classes,
      styles,
      label,
      multiple = false,
      color = 'primary',
      variant = 'filled',
      onClose,
      ...other
    } = props

    const theme = useTheme()
    const defaultStyles = useFilterInputStyles()
    const localStyles = useStyles()
    const colorStyle = useMemo(() => {
      if (color === 'primary') {
        const isPrimaryDark = tinycolor(theme.colors.primary).isDark()
        if (isPrimaryDark) return { color: 'white' }
      }
      if (color === 'secondary') {
        const isSecondaryDark = tinycolor(theme.colors.secondary).isDark()
        if (isSecondaryDark) return { color: 'white' }
      }
      return {}
    }, [color, theme.colors.primary, theme.colors.secondary])

    const onChangeMemoized = useCallback(
      (event: SelectChangeEvent<unknown>) => {
        const eventValue = event.target.value
        if (Array.isArray(eventValue)) {
          onChangeValues && onChangeValues(eventValue as string[])
        }
        onChangeValue && onChangeValue(eventValue as string)
      },
      [onChangeValue, onChangeValues]
    )

    const renderValue = useCallback(
      (selected: string | string[]) => {
        if (variant === 'outlined') {
          if (
            (!Array.isArray(selected) && selected === '') ||
            (Array.isArray(selected) && selected.length === 0)
          ) {
            return placeholder
          }
          if (Array.isArray(selected) && selected.length > 0) {
            return selected.join(', ')
          }
          if (!Array.isArray(selected)) {
            return selected
          }
          return ''
        }
        const count = Array.isArray(selected)
          ? selected.length
          : selected === ''
          ? 0
          : 1
        return (
          <Box display='flex' alignItems='center'>
            <InputLabel
              className={clsx(
                classes?.label,
                defaultStyles.classes.label,
                'AruiFilterSelect-label',
                localStyles.classes.label
              )}
              style={{ ...styles?.label, ...colorStyle }}
            >
              {label}
            </InputLabel>
            <Chip
              className={clsx(
                classes?.chip,
                localStyles.classes.chip,
                'AruiFilterSelect-chip'
              )}
              label={count}
              variant='outlined'
              color={color}
              style={styles?.chip}
            />
          </Box>
        )
      },
      [
        placeholder,
        variant,
        color,
        colorStyle,
        classes?.label,
        classes?.chip,
        styles?.label,
        styles?.chip
      ]
    )

    const optionsMemoized = useMemo(() => {
      return options.map((option) => (
        <MenuItem
          data-value={option.key}
          className={clsx(classes?.option, 'AruiFilterSelect-option')}
          style={styles?.option}
          key={option.key}
          value={option.key}
        >
          <CheckBox
            data-value={option.key}
            checked={values.indexOf(option.key) > -1 || value === option.key}
          />
          <ListItemText
            data-value={option.key}
            primary={option.label as string}
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      ))
    }, [options, values, value, classes?.option, styles?.option])

    const inputProp: InputBaseComponentProps = useMemo(() => {
      return {
        name: name,
        className: clsx(classes?.input, 'AruiFilterSelect-select'),
        style: styles?.input,
        id: id
      }
    }, [name, onRemove, value, classes?.input, styles?.input, id])

    const getVariantColorClass = () => {
      if (variant === 'outlined') {
        switch (color) {
          case 'primary':
            return defaultStyles.classes.inputOutlinedPrimaryColor
          case 'secondary':
            return defaultStyles.classes.inputOutlinedSecondaryColor
          case 'default':
            return defaultStyles.classes.inputOutlinedGreyColor
        }
      }
      switch (color) {
        case 'primary':
          return defaultStyles.classes.inputFilledPrimaryColor
        case 'secondary':
          return defaultStyles.classes.inputFilledSecondaryColor
        case 'default':
          return defaultStyles.classes.inputFilledGreyColor
        default:
          return defaultStyles.classes.inputFilledGreyColor
      }
    }

    const onCloseMemoized = useCallback(
      (event: React.SyntheticEvent<Element, Event>) => {
        //@ts-ignore
        const valueClicked = event.currentTarget.dataset.value
        onRemove && value === valueClicked && onRemove()
        onClose && onClose(event)
      },
      [value, onRemove, onClose]
    )

    const canRemove =
      (value !== '' || values.length > 0) &&
      onRemove &&
      !disabled &&
      variant !== 'filled'

    return (
      <FormControl
        variant='outlined'
        color={color !== 'default' ? color : undefined}
        className={clsx(
          className,
          defaultStyles.classes.input,
          getVariantColorClass(),
          'AruiFilterSelect-root'
        )}
        style={style}
      >
        {variant === 'outlined' && (
          <InputLabel
            className={clsx(
              classes?.label,
              defaultStyles.classes?.label,
              'AruiFilterSelect-label'
            )}
            style={styles?.label}
          >
            {label}
          </InputLabel>
        )}
        <MuiSelect
          {...other}
          ref={ref}
          label={variant === 'outlined' ? label : undefined}
          onClose={onCloseMemoized}
          className={clsx(
            localStyles.classes.root,
            classes?.select,
            canRemove
              ? localStyles.classes.selectPaddingWithClear
              : localStyles.classes.selectPadding,
            'AruiFilterSelect-select'
          )}
          value={multiple ? values : value}
          multiple={multiple}
          onChange={onChangeMemoized}
          inputProps={inputProp}
          renderValue={renderValue}
          displayEmpty
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center'
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'center'
            },
            classes: { list: localStyles.classes.list },
            className: clsx(
              localStyles.classes.menu,
              classes?.menu,
              'AruiFilterSelect-menu'
            ),
            style: styles?.menu
          }}
          style={
            variant === 'filled'
              ? { ...styles?.select, ...colorStyle }
              : styles?.select
          }
          disabled={disabled}
        >
          {optionsMemoized}
        </MuiSelect>
        {canRemove && (
          <ClearRounded
            onClick={onRemove}
            className={clsx(
              localStyles.classes.clear,
              classes?.clearIcon,
              'AruiFilterSelect-clearIcon'
            )}
            style={styles?.clearIcon}
          />
        )}
      </FormControl>
    )
  }
)
