import { Box, Paper, PaperProps, useTheme } from '@mui/material'
import { Actions, ActionsProps } from '@smartb/g2-components'
import React, { useMemo } from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { Header, HeaderProps } from '../Header'
import { cx } from '@emotion/css'

interface SectionClasses {
  overflowWrapper?: string
  contentContainer?: string
}

interface SectionStyles {
  overflowWrapper?: React.CSSProperties
  contentContainer?: React.CSSProperties
}

export interface SectionBasicProps extends BasicProps {
  /**
   * the page content
   */
  children?: React.ReactNode
  /**
   * the props passed to the header
   */
  headerProps?: HeaderProps
  /**
   * the actions displayed at the bottom of the component.
   */
  bottomActionsProps?: ActionsProps
  /**
   * if true the content will be wrap in a flex column container with a normalized gap between the children
   * @default false
   */
  flexContent?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: SectionClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: SectionStyles
}

export type SectionProps = MergeMuiElementProps<PaperProps, SectionBasicProps>

export const Section = (props: SectionProps) => {
  const {
    children,
    headerProps,
    bottomActionsProps,
    classes,
    styles,
    className,
    sx,
    flexContent = false,
    ...other
  } = props

  const theme = useTheme()

  const actionsDisplay = useMemo(() => {
    if (!bottomActionsProps) return undefined
    return (
      <Actions
        {...bottomActionsProps}
        sx={{
          marginTop: !flexContent ? (theme) => theme.spacing(3) : ''
        }}
      />
    )
  }, [bottomActionsProps, flexContent])

  const headerDisplay = useMemo(() => {
    if (!headerProps) return undefined
    return (
      <Header
        bgcolor='#ffffff'
        sx={{
          borderRadius: (theme) =>
            `${(theme.shape.borderRadius as number) * 1.5}px ${
              (theme.shape.borderRadius as number) * 1.5
            }px 0 0`
        }}
        zIndex={200}
        {...headerProps}
      />
    )
  }, [headerProps])

  return (
    <Paper
      elevation={0}
      className={cx('AruiSection-root', className)}
      sx={{
        overflow: 'hidden',
        display: 'flex',
        borderRadius: (theme) =>
          `${(theme.shape.borderRadius as number) * 1.5}px`,
        ...sx
      }}
      {...other}
    >
      <Box
        className={cx('AruiSection-overflowWrapper', classes?.overflowWrapper)}
        style={styles?.overflowWrapper}
        sx={{
          maxHeight: '100%',
          overflow: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {headerDisplay}
        <Box
          sx={{
            [theme.breakpoints.down('sm')]: {
              padding: (theme) => theme.spacing(1),
              paddingTop: (theme) => theme.spacing(2),
              gap: flexContent ? (theme) => theme.spacing(2) : ''
            },
            padding: (theme) => theme.spacing(3),
            flexGrow: 1,
            display: flexContent ? 'flex' : '',
            flexDirection: flexContent ? 'column' : '',
            gap: flexContent ? (theme) => theme.spacing(3) : ''
          }}
          className={cx(
            'AruiSection-contentContainer',
            classes?.contentContainer
          )}
          style={styles?.contentContainer}
        >
          {children}
          {actionsDisplay}
        </Box>
      </Box>
    </Paper>
  )
}
