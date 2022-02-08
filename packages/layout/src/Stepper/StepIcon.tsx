import { StepIconProps as MuiStepIconProps } from '@mui/material'
import { cx } from '@emotion/css'
import React from 'react'
import { makeG2STyles } from '@smartb/g2-themes'

const useStepIconStyles = makeG2STyles()((theme) => ({
  root: {
    backgroundColor: theme.colors.tertiary,
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  active: {
    backgroundColor: theme.colors.primary,
    boxShadow: theme.colors.primary
  },
  completed: {
    backgroundColor: theme.colors.primary,
    boxShadow: theme.colors.primary
  },
  activeIcon: {
    border: '2px solid ' + theme.colors.secondary,
    padding: '3px',
    borderRadius: '50%'
  }
}))

export const StepIcon = (props: MuiStepIconProps) => {
  const { classes } = useStepIconStyles()
  const { active, completed, icon } = props
  return (
    <div className={cx(active && classes.activeIcon)}>
      <div
        className={cx(
          classes.root,
          active && classes.active,
          completed && classes.completed
        )}
      >
        {icon}
      </div>
    </div>
  )
}

export const StepEmptyIcon = () => {
  return <></>
}
