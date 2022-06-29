import { Box, BoxProps } from '@mui/material'
import { Actions, ActionsProps } from '@smartb/g2-components'
import React, { useMemo } from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { Header, HeaderProps } from '../Header'
import { cx } from '@emotion/css'

export interface PageBasicProps extends BasicProps {
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
}

export type PageProps = MergeMuiElementProps<BoxProps, PageBasicProps>

export const Page = (props: PageProps) => {
  const { children, headerProps, bottomActionsProps, className, sx, ...other } =
    props

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
        className={cx('AruiPage-root', className)}
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
