import React from 'react'
import {
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps
} from '@material-ui/core'
import {
  MergeMuiElementProps,
  BasicProps,
  lowLevelStyles
} from '@smartb/g2-themes'
import clsx from 'clsx'

const useStyles = lowLevelStyles()({
  title: {
    margin: '8px 16px'
  },
  formControl: {
    width: '100%',
    borderRadius: '21.6px',
    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.09)',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    color: '#535353',
    padding: '0 13px',
    marginBottom: '8px',
    minHeight: '40px',
    '&::before': {
      content: 'none'
    },
    '&::after': {
      content: 'none'
    }
  }
})

export interface SelectItem {
  value: string
  label: string
}

interface SelectClasses {
  label?: string
  select?: string
}

interface SelectStyles {
  label?: React.CSSProperties
  select?: React.CSSProperties
}

export interface SelectBasicProps extends BasicProps {
  /**
   * The label of the select
   */
  label: string
  /**
   * The current selected value also included in the items
   */
  value?: string
  /**
   * The title thart will be displayed at the top of the pop-up
   */
  items: SelectItem[]
  /**
   * Define if the component is disabled or not
   */
  disabled?: boolean
  /**
   * The event called when a different item is selected
   * @param event
   * @param child
   */
  onChange?: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode
  ) => void
  /**
   * The classes applied to the different part of the component
   */
  classes?: SelectClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: SelectStyles
}

export type SelectProps = MergeMuiElementProps<MuiSelectProps, SelectBasicProps>

export const Select = (props: SelectProps) => {
  const {
    label,
    items,
    value,
    onChange,
    disabled = false,
    className,
    style,
    id,
    classes,
    styles,
    ...other
  } = props
  const defaultClasses = useStyles()
  return (
    <div className={clsx(className, 'AruiSelect-root')} style={style}>
      <InputLabel
        htmlFor={id}
        className={clsx(
          defaultClasses.title,
          'AruiSelect-label',
          classes?.label
        )}
      >
        {label}
      </InputLabel>
      <MuiSelect
        className={clsx(
          defaultClasses.formControl,
          'AruiSelect-select',
          classes?.select
        )}
        value={value}
        onChange={onChange}
        disabled={disabled}
        inputProps={{
          id: id
        }}
        {...other}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </div>
  )
}
