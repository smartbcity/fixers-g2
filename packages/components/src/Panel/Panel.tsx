import React from 'react'
import { Card as MuiCard, CardProps } from  '@mui/material'
import {
  CardHeader,
  Typography,
  CardContent,
  CardActions
} from  '@mui/material'
import defaultLogo from '../assets/impactcity-logo-2.png'
import documentLogo from '../assets/docstampt-badge.png'
import { logoType } from '.'
import {
  BasicProps,
  MergeMuiElementProps,
  lowLevelStyles
} from '@smartb/g2-themes'
import clsx from 'clsx'
import { Theme, useTheme } from '@smartb/g2-themes'

/**
 * @deprecated
 */
const useStyles = lowLevelStyles<Theme>()({
    card: {
      borderRadius: '10px'
    },
    header: {
      minHeight: '100px'
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'center'
    },
    headerContent: {
      width: '70%',
      textAlign: 'center',
      display: 'block',
      zIndex: 1
    },
    content: {
      backgroundColor: theme => theme.colors.tertiary,
      minHeight: '100px',
      position: 'relative',
      justifyContent: 'center',
      paddingTop: '40px'
    },
    footer: {
      minHeight: '50px',
      display: 'flex',
      justifyContent: 'center'
    },
    logoContainer: {
      display: 'flex',
      justifyContent: 'center',
      width: 'calc(100% - 32px)',
      position: 'absolute',
      top: '-110px',
      zIndex: 0
    },
    logoBorder: {
      width: '136px',
      height: '136px',
      borderRadius: '50%',
      background: 'white'
    },
    logo: {
      height: '130px',
      width: '130px',
      position: 'relative',
      marginLeft: '12px',
      opacity: '50%'
    },
    documentLogo: {
      height: '115px',
      width: '115px',
      position: 'relative',
      marginLeft: '11.5px',
      marginTop: '12px',
      opacity: '50%'
    },
    logoWithHeader: {
      opacity: '15%'
    }
  })

interface PanelClasses {
  header?: string
  content?: string
  footer?: string
}

interface PanelStyles {
  header?: React.CSSProperties
  content?: React.CSSProperties
  footer?: React.CSSProperties
}

/**
 * @deprecated
 */
export interface PanelBasicProps extends BasicProps {
  /**
   * The text that will be displayed in the header of the panel
   */
  header?: string
  /**
   * The content that will be displayed in the body of the SBPanel
   */
  children?: React.ReactNode
  /**
   * Choose the logo in the background
   */
  logo?: logoType
  /**
   * The content that will be displayed in the footer
   */
  footer?: React.ReactNode
  /**
   * The logo that wil be displayed in the corner instead of the defaults logos
   */
  customLogo?: React.ReactNode
  /**
   * The classes applied to the different part of the component
   */
  classes?: PanelClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: PanelStyles
}

export type PanelProps = MergeMuiElementProps<CardProps, PanelBasicProps>

/**
 * @deprecated
 */
export const Panel = (props: PanelProps) => {
  const {
    header,
    children,
    logo = 'default',
    className,
    footer,
    style,
    customLogo,
    id,
    classes,
    styles,
    ...other
  } = props
  const theme = useTheme()
  const defaultClasses = useStyles(theme)
  return (
    <MuiCard
      className={clsx(defaultClasses.card, 'AruiPanel-root', className)}
      style={style}
      id={id}
      {...other}
    >
      <CardHeader
        className={clsx(
          defaultClasses.header,
          'AruiPanel-header',
          classes?.header
        )}
        style={styles?.header}
        classes={{ content: defaultClasses.headerContainer }}
        subheader={
          !!header && (
            <Typography
              className={defaultClasses.headerContent}
              variant='h6'
              color='textSecondary'
              component='p'
            >
              {header}
            </Typography>
          )
        }
      />
      <CardContent
        className={clsx(
          defaultClasses.content,
          'AruiPanel-content',
          classes?.content
        )}
        style={styles?.content}
      >
        <div className={defaultClasses.logoContainer}>
          <div className={defaultClasses.logoBorder}>
            {!!customLogo ? (
              customLogo
            ) : logo === 'document' ? (
              <img
                src={documentLogo}
                className={`${defaultClasses.documentLogo} ${
                  !!header && defaultClasses.logoWithHeader
                }`}
                alt='A smartb logo'
              />
            ) : (
              <img
                src={defaultLogo}
                className={`${defaultClasses.logo} ${
                  !!header && defaultClasses.logoWithHeader
                }`}
                alt='A smartb logo'
              />
            )}
          </div>
        </div>
        {children}
      </CardContent>
      <CardActions
        className={clsx(
          defaultClasses.footer,
          'AruiPanel-footer',
          classes?.footer
        )}
        style={styles?.footer}
      >
        {footer}
      </CardActions>
    </MuiCard>
  )
}
