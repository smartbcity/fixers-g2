import React, { forwardRef, useMemo } from 'react'
import {
  Box,
  Snackbar as MuiSnackbar,
  SnackbarProps as MuiSnackbarProps,
  Typography
} from '@mui/material'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import {
  CheckRounded,
  CloseRounded,
  InfoOutlined,
  ReportProblemOutlined
} from '@mui/icons-material'

const useStyles = makeG2STyles()((theme) => ({
  root: {
    maxWidth: '400px'
  },
  content: {
    background: '#595959',
    borderRadius: theme.borderRadius,
    position: 'relative',
    overflow: 'hidden',
    padding: '4px 32px 4px 60px',
    '& .MuiSnackbarContent-message': {
      padding: '3px 0',
      minHeight: '29px',
      display: 'flex',
      alignItems: 'center'
    }
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
    top: 'calc(50% - 9.5px)',
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
    backgroundColor: theme.colors.info,
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
    backgroundColor: theme.colors.error
  },
  severityIndicatorWarning: {
    backgroundColor: theme.colors.warning
  },
  severityIndicatorSuccess: {
    backgroundColor: theme.colors.success
  }
}))

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

export type AlertSeverity = 'info' | 'warning' | 'success' | 'error'

export interface AlertBasicProps extends BasicProps {
  /**
   * The content displayed in the alert. It overrides the prop `message` if provided
   */
  children?: React.ReactNode
  /**
   * Use this props if you only want to pass a string to the alert
   */
  message?: React.ReactNode
  /**
   * The event called when the user wants to close the alert
   */
  onClose?: () => void
  /**
   * Define wether or not the alert is visible
   *
   * @default true
   */
  open?: boolean
  /**
   * The severity of the alert
   *
   * @default 'info'
   */
  severity?: 'info' | 'warning' | 'success' | 'error'
  /**
   * The base color brightness of the alert
   *
   * @default 'dark'
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

const AlertBase = (props: AlertProps, ref: React.ForwardedRef<HTMLElement>) => {
  const {
    children,
    onClose,
    severity = 'info',
    colorBase = 'dark',
    className,
    open = true,
    message,
    classes,
    styles,
    ...other
  } = props

  const defaultStyles = useStyles()
  const severityIcon = useMemo(() => {
    if (severity === 'warning')
      return (
        <ReportProblemOutlined
          className={defaultStyles.cx(
            defaultStyles.classes.severityIcon,
            classes?.severityIcon
          )}
          style={styles?.severityIcon}
        />
      )
    if (severity === 'success')
      return (
        <CheckRounded
          className={defaultStyles.cx(
            defaultStyles.classes.severityIcon,
            classes?.severityIcon
          )}
          style={styles?.severityIcon}
        />
      )
    if (severity === 'error')
      return (
        <CloseRounded
          className={defaultStyles.cx(
            defaultStyles.classes.severityIcon,
            classes?.severityIcon
          )}
          style={styles?.severityIcon}
        />
      )
    return (
      <InfoOutlined
        className={defaultStyles.cx(
          defaultStyles.classes.severityIcon,
          classes?.severityIcon
        )}
        style={styles?.severityIcon}
      />
    )
  }, [severity, classes?.severityIcon, styles?.severityIcon])
  return (
    <MuiSnackbar
      className={defaultStyles.cx(
        defaultStyles.classes.root,
        'AruiAlert-root',
        className
      )}
      ref={ref}
      ClickAwayListenerProps={{ onClickAway: () => {} }}
      ContentProps={{
        className: defaultStyles.cx(
          defaultStyles.classes.content,
          colorBase === 'light' && defaultStyles.classes.lightRoot,
          !onClose && defaultStyles.classes.contentWithoutClose,
          'AruiAlert-contentContainer',
          classes?.contentContainer
        ),
        style: styles?.contentContainer
      }}
      message={
        <>
          <Box
            className={defaultStyles.cx(
              defaultStyles.classes.severityIndicator,
              severity === 'error' &&
                defaultStyles.classes.severityIndicatorError,
              severity === 'success' &&
                defaultStyles.classes.severityIndicatorSuccess,
              severity === 'warning' &&
                defaultStyles.classes.severityIndicatorWarning,
              classes?.severityIndicator
            )}
            style={styles?.severityIndicator}
          >
            {severityIcon}
          </Box>
          {children ? (
            children
          ) : (
            <Typography variant='body2'>{message}</Typography>
          )}
          {onClose && (
            <CloseRounded
              className={defaultStyles.cx(
                defaultStyles.classes.closeIcon,
                colorBase === 'light' && defaultStyles.classes.closeIconLight,
                'AruiAlert-closeIcon',
                classes?.closeIcon
              )}
              style={styles?.closeIcon}
              onClick={onClose}
            />
          )}
        </>
      }
      open
      onClose={onClose}
      {...other}
    />
  )
}

export const Alert = forwardRef(AlertBase) as typeof AlertBase
