import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography
} from  '@mui/material'
import {
  BasicProps,
  lowLevelStyles,
  MergeMuiElementProps,
  Theme,
  useTheme
} from '@smartb/g2-themes'
import clsx from 'clsx'
import React, { useMemo } from 'react'

const useStyles = lowLevelStyles<Theme>()({
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
    color: (theme) => theme.colors.secondary,
    marginRight: '5px',
  }
})

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
  const { value = 0, className, style, id, classes, styles, ...other } = props
  const theme = useTheme()
  const defaultClasses = useStyles(theme)
  const roundedValue = useMemo(() => Math.round(value), [value])
  return (
    <Box
      className={clsx(
        className,
        'AruiProgressIndicator-root',
        defaultClasses.root
      )}
      style={style}
      id={id}
    >
      <Typography
        variant='subtitle1'
        className={clsx(
          defaultClasses.label,
          classes?.label,
          'AruiProgressIndicator-label'
        )}
        style={styles?.label}
      >{`${roundedValue}%`}</Typography>
      <LinearProgress
        variant='determinate'
        color='secondary'
        className={clsx(
          defaultClasses.progress,
          'AruiProgressIndicator-LinearProgress',
          classes?.linearProgress
        )}
        classes={{ bar: defaultClasses.bar }}
        style={styles?.linearProgress}
        value={value}
        {...other}
      />
    </Box>
  )
}
