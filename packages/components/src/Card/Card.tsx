import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { logoType } from '../Panel'
import { Box as AruiBox, BoxProps } from '../Box'
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
    headerContainer: {
      width: 'calc(90% - 10px)',
      padding: '10px',
      paddingLeft: '10%',
      position: 'relative'
    },
    dividerBar: {
      background: theme => theme.colors.primary,
      height: '2px',
      width: '30%',
      position: 'absolute',
      bottom: '0px',
      left: '10%'
    },
    bodyContainer: {
      minHeight: '50px',
      width: 'calc(100% - 30px)',
      padding: '15px'
    },
    withLogo: {
      paddingBottom: '30px',
      paddingRight: '30px',
      width: 'calc(100% - 45px)'
    },
    withSmallLogo: {
      paddingBottom: '20px',
      paddingRight: '20px',
      width: 'calc(100% - 35px)'
    },
    withFooter: {
      paddingBottom: '15px',
      paddingRight: '15px',
      width: 'calc(100% - 30px)'
    },
    text: {
      paddingBottom: '10px',
      paddingLeft: '10%',
      paddingRight: '35px'
    }
  })

interface CardClasses {
  header?: string
  body?: string
  dividerBar?: string
  footer?: string
}

interface CardStyles {
  header?: React.CSSProperties
  body?: React.CSSProperties
  dividerBar?: React.CSSProperties
  footer?: React.CSSProperties
}

export type LogoSize = 'medium' | 'small'

/**
 * @deprecated
 */
export interface CardBasicProps extends BasicProps {
  /**
   * The text that will be displayed in the header of the card
   */
  header?: string
  /**
   * The content that will be displayed in the body of the card
   */
  children: React.ReactNode
  /**
   * Choose the logo in the corner
   */
  logo?: logoType | 'none'
  /**
   * Defined the elevation of the card
   */
  elevation?: number
  /**
   * The logo that wil be displayed in the corner instead of the defaults logos
   */
  customLogo?: React.ReactNode
  /**
   * Defined the size of the logo in the corner
   */
  logoSize?: LogoSize
  /**
   * If not defined the seperator will appear with default styles,
   * if it's 'none' the seperator won't be displayed,
   * if the seperator is a node it will be displayed instead of the default one
   */
  separator?: React.ReactNode | 'none'
  /**
   * The text displayed at the bottom of the card
   */
  footer?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: CardClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: CardStyles
}

export type CardProps = MergeMuiElementProps<BoxProps, CardBasicProps>

export const Card = (props: CardProps) => {
  const {
    header,
    children,
    logo = 'default',
    className,
    style,
    elevation = 1,
    customLogo,
    logoSize = 'medium',
    separator,
    footer,
    id,
    classes,
    styles,
    ...other
  } = props
  const theme = useTheme()
  const defaultClasses = useStyles(theme)
  return (
    <AruiBox
      className={clsx('AruiCard-root', className)}
      style={style}
      id={id}
      elevation={elevation}
      customLogo={customLogo}
      logoSize={logoSize}
      logo={logo}
      {...other}
    >
      {!!header && (
        <Box
          className={clsx(
            defaultClasses.headerContainer,
            'AruiCard-header',
            classes?.header
          )}
          style={styles?.header}
        >
          <Typography variant='h6' align='left'>
            {header}
          </Typography>
          {!!separator ? (
            separator !== 'none' && separator
          ) : (
            <div
              className={clsx(
                defaultClasses.dividerBar,
                'AruiCard-dividerBar',
                classes?.dividerBar
              )}
              style={styles?.dividerBar}
            ></div>
          )}
        </Box>
      )}
      <Box
        className={clsx(
          defaultClasses.bodyContainer,
          {
            [defaultClasses.withLogo]: logo !== 'none',
            [defaultClasses.withSmallLogo]:
              logoSize === 'small' && logo !== 'none',
            [defaultClasses.withFooter]: !!footer
          },
          'AruiCard-body',
          classes?.body
        )}
        style={styles?.body}
      >
        {children}
      </Box>
      {footer && (
        <Typography
          className={clsx(
            defaultClasses.text,
            'AruiCard-footer',
            classes?.footer
          )}
          style={styles?.footer}
          variant='body1'
          align='left'
        >
          {footer}
        </Typography>
      )}
    </AruiBox>
  )
}
