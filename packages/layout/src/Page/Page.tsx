import { Box, BoxProps } from '@mui/material'
import { Actions, ActionsProps } from '@smartb/g2-components'
import React, { useMemo } from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { Header, HeaderProps } from '../Header'

interface PageClasses {
  header: string
  backButton: string
}

interface PageStyles {
  header: React.CSSProperties
  backButton: React.CSSProperties
}

export interface pageBasicProps extends BasicProps {
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
   * The classes applied to the different part of the component
   */
  classes?: PageClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: PageStyles
}

export type PageProps = MergeMuiElementProps<BoxProps, pageBasicProps>

export const Page = (props: PageProps) => {
  const {
    children,
    headerProps,
    bottomActionsProps,
    classes,
    styles,
    className,
    sx,
    ...other
  } = props

  const actionsDisplay = useMemo(() => {
    if (!bottomActionsProps) return undefined
    return (
      <Actions
        {...bottomActionsProps}
        sx={{
          marginTop: (theme) => theme.spacing(2)
        }}
      />
    )
  }, [bottomActionsProps])

  const headerDisplay = useMemo(() => {
    if (!headerProps) return undefined
    return <Header {...headerProps} />
  }, [headerProps])

  return (
    <>
      {headerDisplay}
      <Box
        sx={{
          padding: (theme) => theme.spacing(3),
          ...sx
        }}
        {...other}
      >
        {children}
        {actionsDisplay}
      </Box>
    </>
  )
}
