import { Box, LinearProgress, BoxProps } from  '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'

interface LoadingClasses {
  iconContainer?: string
  linearProgress?: string
}

interface LoadingStyles {
  iconContainer?: React.CSSProperties
  linearProgress?: React.CSSProperties
}

export interface LoadingBasicProps extends BasicProps {
  /**
   * If true the splash screen will take the size of the screen if not it will take the size of its parent
   */
  fullPage?: boolean
  /**
   * The icon of the application that will displayed in the middle of the splash screen
   */
  icon: React.ReactNode
  /**
   * The classes applied to the different part of the component
   */
  classes?: LoadingClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: LoadingStyles
}

export type LoadingProps = MergeMuiElementProps<BoxProps, LoadingBasicProps>

export const Loading = (props: LoadingProps) => {
  const { fullPage = true, icon, classes, styles, className, ...other } = props
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      width={fullPage ? '100vw' : '100%'}
      height={fullPage ? '100vh' : '100%'}
      className={clsx(className, 'AruiLoading-iconContainer')}
      {...other}
    >
      <Box
        display='flex'
        flexDirection='column'
        className={clsx(classes?.iconContainer, 'AruiLoading-iconContainer')}
        style={styles?.iconContainer}
      >
        {icon}
        <LinearProgress
          className={clsx(
            classes?.linearProgress,
            'AruiLoading-linearProgress'
          )}
          style={styles?.linearProgress}
        />
      </Box>
    </Box>
  )
}
