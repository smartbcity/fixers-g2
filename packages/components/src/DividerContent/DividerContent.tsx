import React from 'react'
import { Typography } from  '@mui/material'
import {
  BasicProps,
  MergeReactElementProps,
  lowLevelStyles
} from '@smartb/g2-themes'
import clsx from 'clsx'
import { Theme, useTheme } from '@smartb/g2-themes'

/**
 * @deprecated
 */
const useStyles = lowLevelStyles<Theme>()({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      minHeight: '100px'
    },
    containerVertical: {
      flexDirection: 'column'
    },
    contentContainer: {
      position: 'relative'
    },
    divider: {
      width: '2px',
      height: '150px',
      marginLeft: '20px',
      marginRight: '20px',
      position: 'relative'
    },
    dividerVertical: {
      width: '80%',
      height: '1px',
      marginTop: '20px',
      marginBottom: '20px'
    },
    dividerBar: {
      background: theme => theme.colors.primary,
      width: '0.5px',
      height: '80%',
      position: 'absolute',
      bottom: '0px'
    },
    dividerBarVertical: {
      width: '80%',
      height: '0.5px',
      left: '20%'
    },
    dividerBarWithoutText: {
      height: '100%'
    },
    dividerBarVerticalWithoutText: {
      width: '100%',
      left: '0%'
    },
    dividerText: {
      textAlign: 'center',
      position: 'absolute',
      top: '2%',
      transform: 'translate(-50%,-50%)',
      left: '50%',
      lineHeight: '15px'
    },
    dividerTextVertical: {
      left: '5%',
      top: '0%'
    }
  })

export type Direction = 'horizontal' | 'vertical'

interface DivderContentClasses {
  content?: string
  dividerBar?: string
  dividerText?: string
  divider?: string
}

interface DividerContentStyles {
  content?: React.CSSProperties
  divider?: React.CSSProperties
  dividerBar?: React.CSSProperties
  dividerText?: React.CSSProperties
}

export interface DividerContentBasicProps extends BasicProps {
  /**
   * An array of content that will be divided
   */
  children: React.ReactNode | React.ReactNode[]
  /**
   * The text of the divider
   */
  dividerText?: string
  /**
   * The direction of the division
   */
  dividerDirection?: Direction
  /**
   * The classes applied to the different part of the component
   */
  classes?: DivderContentClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: DividerContentStyles
}

export type DividerContentProps = MergeReactElementProps<
  'div',
  DividerContentBasicProps
>

/**
 * @deprecated
 */
export const DividerContent = React.forwardRef(
  (props: DividerContentProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      children,
      dividerText,
      dividerDirection = 'horizontal',
      className,
      style,
      id,
      classes,
      styles,
      ...other
    } = props
    const theme = useTheme()
    const defaultClasses = useStyles(theme)
    return (
      <div
        ref={ref}
        className={clsx(
          defaultClasses.container,
          {
            [defaultClasses.containerVertical]: dividerDirection === 'vertical'
          },
          'AruiDividerContent-root',
          className
        )}
        style={style}
        id={id}
        {...other}
      >
        {children instanceof Array ? (
          children.map((child, index) =>
            index !== children.length - 1 ? (
              <>
                <div
                  key={index}
                  className={clsx(
                    defaultClasses.contentContainer,
                    'AruiDividerContent-content',
                    classes?.content
                  )}
                  style={styles?.content}
                >
                  {child}
                </div>
                <div
                  key={index + children.length}
                  className={clsx(
                    defaultClasses.divider,
                    {
                      [defaultClasses.dividerVertical]:
                        dividerDirection === 'vertical'
                    },
                    'AruiDividerContent-divider',
                    classes?.divider
                  )}
                  style={styles?.divider}
                >
                  {!!dividerText && (
                    <Typography
                      className={clsx(
                        defaultClasses.dividerText,
                        {
                          [defaultClasses.dividerTextVertical]:
                            dividerDirection === 'vertical'
                        },
                        'AruiDividerContent-dividerText',
                        classes?.dividerText
                      )}
                      style={styles?.dividerText}
                      variant='body1'
                      color='textSecondary'
                      component='p'
                    >
                      {dividerText}
                    </Typography>
                  )}
                  <div
                    className={clsx(
                      defaultClasses.dividerBar,
                      {
                        [defaultClasses.dividerBarVerticalWithoutText]:
                          !dividerText && dividerDirection === 'vertical',
                        [defaultClasses.dividerBarWithoutText]:
                          !dividerText && dividerDirection !== 'vertical',
                        [defaultClasses.dividerBarVertical]:
                          dividerDirection === 'vertical'
                      },
                      'AruiDividerContent-dividerBar',
                      classes?.dividerBar
                    )}
                    style={styles?.dividerBar}
                  ></div>
                </div>
              </>
            ) : (
              <div
                key={index}
                className={clsx(
                  defaultClasses.contentContainer,
                  'AruiDividerContent-content',
                  classes?.content
                )}
                style={styles?.content}
              >
                {child}
              </div>
            )
          )
        ) : (
          <div
            className={clsx(
              defaultClasses.contentContainer,
              'AruiDividerContent-content',
              classes?.content
            )}
            style={styles?.content}
          >
            {children}
          </div>
        )}
      </div>
    )
  }
)
