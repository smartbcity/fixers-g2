import React, { useMemo } from 'react'
import {
  Box,
  Snackbar as MuiSnackbar,
  SnackbarProps as MuiSnackbarProps
} from '@material-ui/core'
import {
  BasicProps,
  lowLevelStyles,
  MergeMuiElementProps,
  Theme,
  useTheme
} from '@smartb/archetypes-ui-themes'
import clsx from 'clsx'
import {
  Check,
  Close,
  InfoOutlined,
  ReportProblemOutlined
} from '@material-ui/icons'

const useStyles = lowLevelStyles<Theme>()({
  content: {
    background: '#595959',
    borderRadius: '5px',
    position: 'relative',
    overflow: 'hidden',
    padding: '4px 32px 4px 60px'
  },
  contentWithoutClose: {
    padding: '4px 16px 4px 60px'
  },
  lightRoot: {
    background: 'white',
    color: '#676879',
    '& .MuiSnackbarContent-message': {
      color: '#676879'
    }
  },
  closeIcon: {
    position: 'absolute',
    top: 'calc(50% - 10px)',
    right: 10,
    cursor: 'pointer',
    width: 20,
    height: 20
  },
  closeIconLight: {
    color: '#676879'
  },
  severityIcon: {
    width: 30,
    height: 30,
    color: 'rgba(255, 255, 255, 0.8)'
  },
  severityIndicator: {
    backgroundColor: (theme) => theme.colors.info,
    position: 'absolute',
    height: '100%',
    width: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0
  },
  severityIndicatorError: {
    backgroundColor: (theme) => theme.colors.error
  },
  severityIndicatorWarning: {
    backgroundColor: (theme) => theme.colors.warning
  },
  severityIndicatorSuccess: {
    backgroundColor: (theme) => theme.colors.success
  }
})

interface AlertClasses {
  contentContainer?: string
  severityIndicator?: string
  severityIcon?: string
  closeIcon?: string
}

interface AlertStyles {
  contentContainer?: React.CSSProperties
  severityIndicator?: React.CSSProperties
  severityIcon?: React.CSSProperties
  closeIcon?: React.CSSProperties
}

export interface AlertBasicProps extends BasicProps {
  /**
   * The content displayed in the alert
   */
  children: React.ReactNode
  /**
   * The event called when the user wants to close the alert
   */
  onClose?: () => void
  /**
   * The severity of the alert
   */
  severity?: 'info' | 'warning' | 'success' | 'error'
  /**
   * The base color brightness of the alert
   */
  colorBase?: 'light' | 'dark'
  /**
   * The classes applied to the different part of the component
   */
  classes?: AlertClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: AlertStyles
}

export type AlertProps = MergeMuiElementProps<MuiSnackbarProps, AlertBasicProps>

export const Alert = (props: AlertProps) => {
  const {
    children,
    onClose,
    severity = 'info',
    colorBase = 'dark',
    className,
    classes,
    styles,
    ...other
  } = props
  const theme = useTheme()
  const defaultClasses = useStyles(theme)
  const severityIcon = useMemo(() => {
    if (severity === 'warning')
      return (
        <ReportProblemOutlined
          className={clsx(defaultClasses.severityIcon, classes?.severityIcon)}
          style={styles?.severityIcon}
        />
      )
    if (severity === 'success')
      return (
        <Check
          className={clsx(defaultClasses.severityIcon, classes?.severityIcon)}
          style={styles?.severityIcon}
        />
      )
    if (severity === 'error')
      return (
        <Close
          className={clsx(defaultClasses.severityIcon, classes?.severityIcon)}
          style={styles?.severityIcon}
        />
      )
    return (
      <InfoOutlined
        className={clsx(defaultClasses.severityIcon, classes?.severityIcon)}
        style={styles?.severityIcon}
      />
    )
  }, [severity, classes?.severityIcon, styles?.severityIcon])
  return (
    <MuiSnackbar
      className={clsx(className, 'AruiAlert-root')}
      ContentProps={{
        className: clsx(
          defaultClasses.content,
          colorBase === 'light' && defaultClasses.lightRoot,
          !onClose && defaultClasses.contentWithoutClose,
          classes?.contentContainer,
          'AruiAlert-contentContainer'
        ),
        style: styles?.contentContainer
      }}
      message={
        <>
          <Box
            className={clsx(
              defaultClasses.severityIndicator,
              severity === 'error' && defaultClasses.severityIndicatorError,
              severity === 'success' && defaultClasses.severityIndicatorSuccess,
              severity === 'warning' && defaultClasses.severityIndicatorWarning,
              classes?.severityIndicator
            )}
            style={styles?.severityIndicator}
          >
            {severityIcon}
          </Box>
          {children}
          {onClose && (
            <Close
              className={clsx(
                classes?.closeIcon,
                'AruiAlert-closeIcon',
                colorBase === 'light' && defaultClasses.closeIconLight,
                defaultClasses.closeIcon
              )}
              style={styles?.closeIcon}
              onClick={onClose}
            />
          )}
        </>
      }
      onClose={onClose}
      {...other}
    />
  )
}
