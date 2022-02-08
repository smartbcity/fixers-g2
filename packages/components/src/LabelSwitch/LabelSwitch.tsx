import { Tab, Tabs, TabsProps } from '@mui/material'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { makeG2STyles } from '@smartb/g2-themes'
import React, { forwardRef, useCallback, useMemo } from 'react'

const useStyles = makeG2STyles()((theme) => ({
  indicator: {
    height: '100%',
    borderRadius: '20px',
    opacity: '0.15'
  },
  tabs: {
    minHeight: 0
  },
  tab: {
    minHeight: 0,
    minWidth: 0,
    borderRadius: '20px',
    padding: '5px 10px',
    textTransform: 'unset',
    color: '#808A9D',
    '&:hover': {
      color: theme.colors.primary
    }
  }
}))

interface LabelSwitchClasses {
  indicator?: string
  tab?: string
}

interface LabelSwitchStyles {
  indicator?: React.CSSProperties
  tab?: React.CSSProperties
}

export interface Label {
  key: string
  name: string
  value: string
}

export interface LabelSwitchBasicProps extends BasicProps {
  /**
   * The labels switched by the component
   */
  labels: Label[]
  /**
   * The event called when the current selected label change
   */
  onLabelChange?: (value: string) => void
  /**
   * The value of the currently selected label
   */
  selectedLabelValue: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: LabelSwitchClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: LabelSwitchStyles
}

export type LabelSwitchProps = MergeMuiElementProps<
  TabsProps,
  LabelSwitchBasicProps
>

const LabelSwitchBase = (
  props: LabelSwitchProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const {
    labels,
    onLabelChange,
    selectedLabelValue,
    className,
    style,
    id,
    classes,
    styles,
    ...other
  } = props

  const defaultStyles = useStyles()

  const handleChange = useCallback(
    (_: React.ChangeEvent<{}>, newValue: string) => {
      onLabelChange && onLabelChange(newValue)
    },
    [onLabelChange]
  )

  const tabs = useMemo(
    () =>
      labels.map((label) => (
        <Tab
          key={label.key}
          className={defaultStyles.cx(
            defaultStyles.classes.tab,
            'AruiLabelSwitch-tab',
            classes?.tab
          )}
          style={styles?.tab}
          label={label.name}
          value={label.value}
        />
      )),
    [labels, defaultStyles.classes.tab, classes?.tab, styles?.tab]
  )

  return (
    <Tabs
      ref={ref}
      value={selectedLabelValue}
      classes={{
        indicator: defaultStyles.cx(
          defaultStyles.classes.indicator,
          'AruiLabelSwitch-indicator',
          classes?.indicator
        )
      }}
      TabIndicatorProps={{ style: styles?.indicator }}
      id={id}
      indicatorColor='primary'
      textColor='primary'
      className={defaultStyles.cx(
        defaultStyles.classes.tabs,
        'AruiLabelSwitch-root',
        className
      )}
      style={style}
      onChange={handleChange}
      {...other}
    >
      {tabs}
    </Tabs>
  )
}

export const LabelSwitch = forwardRef(LabelSwitchBase) as typeof LabelSwitchBase
