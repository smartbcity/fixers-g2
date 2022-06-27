import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography
} from '@mui/material'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import React, { useMemo } from 'react'

const useStyles = makeG2STyles()((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  progress: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDE1E6',
    flexGrow: 1
  },
  bar: {
    borderRadius: 4
  },
  label: {
    color: theme.colors.secondary,
    marginRight: theme.spacing / 2
  }
}))

interface ProgressIndicatorClasses {
  linearProgress?: string
  label?: string
}

interface ProgressIndicatorStyles {
  linearProgress?: React.CSSProperties
  label?: React.CSSProperties
}

export interface ProgressIndicatorBasicProps extends BasicProps {
  /**
   * the value in percent (0 to 100) of the progression
   *
   * @default 0
   */
  value?: number
  /**
   * Label of the progress indicator
   *
   * @default '${roundedValue}%'
   */
  label?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: ProgressIndicatorClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: ProgressIndicatorStyles
}

export type ProgressIndicatorProps = MergeMuiElementProps<
  LinearProgressProps,
  ProgressIndicatorBasicProps
>

export const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const {
    value = 0,
    className,
    style,
    id,
    classes,
    styles,
    label,
    ...other
  } = props

  const defaultStyles = useStyles()
  const roundedValue = useMemo(() => Math.round(value), [value])
  return (
    <Box
      className={defaultStyles.cx(
        defaultStyles.classes.root,
        'AruiProgressIndicator-root',
        className
      )}
      style={style}
      id={id}
    >
      <Typography
        variant='subtitle1'
        className={defaultStyles.cx(
          defaultStyles.classes.label,
          'AruiProgressIndicator-label',
          classes?.label
        )}
        style={styles?.label}
      >
        {label ?? `${roundedValue}%`}
      </Typography>
      <LinearProgress
        variant='determinate'
        color='secondary'
        className={defaultStyles.cx(
          defaultStyles.classes.progress,
          'AruiProgressIndicator-LinearProgress',
          classes?.linearProgress
        )}
        classes={{ bar: defaultStyles.classes.bar }}
        style={styles?.linearProgress}
        value={value}
        {...other}
      />
    </Box>
  )
}
