import { cx } from '@emotion/css'
import { ExpandMoreRounded } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box
} from '@mui/material'
import { Menu, MenuItem, Presentation } from '@smartb/g2-components'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React from 'react'

interface UserMenuClasses {
  summary?: string
  details?: string
  presentation?: string
  menu?: string
}

interface UserMenuStyles {
  summary?: React.CSSProperties
  details?: React.CSSProperties
  presentation?: React.CSSProperties
  menu?: React.CSSProperties
}

export interface UserMenuBasicProps extends BasicProps {
  /**
   * The current user to provide if logged
   */
  currentUser?: {
    givenName: string
    familyName: string
    role: string
  }
  /**
   * The menu to display if logged
   */
  loggedMenu?: MenuItem[]
  /**
   * The menu to display if not logged
   */
  notLoggedMenu?: MenuItem[]
  /**
   * The default accordion expanded state
   *
   * @default true
   */
  defaultOpen?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: UserMenuClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: UserMenuStyles
}

export type UserMenuProps = MergeMuiElementProps<
  Omit<AccordionProps, 'children'>,
  UserMenuBasicProps
>

export const UserMenu = (props: UserMenuProps) => {
  const {
    currentUser,
    loggedMenu = [],
    notLoggedMenu = [],
    defaultOpen,
    classes,
    styles,
    className,
    sx,
    ...other
  } = props
  if (!currentUser) {
    return (
      <Box
        className={cx('AruiUserMenu-root', className)}
        id={other.id}
        style={other.style}
        sx={{
          borderTop: '1px solid #BEC7CC',
          backgroundColor: 'white',
          ...sx
        }}
      >
        <Menu
          menu={notLoggedMenu}
          className={cx('AruiUserMenu-menu', classes?.menu)}
          style={styles?.menu}
        />
      </Box>
    )
  }
  return (
    <Accordion
      defaultExpanded={defaultOpen}
      className={cx('AruiUserMenu-root', className)}
      sx={{
        boxShadow: 'none',
        ...sx
      }}
      {...other}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreRounded />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        sx={{
          borderTop: '1px solid #BEC7CC'
        }}
        className={cx('AruiUserMenu-summary', classes?.summary)}
        style={styles?.summary}
      >
        <Presentation
          label={`${currentUser.givenName} ${currentUser.familyName}`}
          subLabel={currentUser.role}
          className={cx('AruiUserMenu-presentation', classes?.presentation)}
          style={styles?.presentation}
        />
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: '0px'
        }}
        className={cx('AruiUserMenu-details', classes?.details)}
        style={styles?.details}
      >
        <Menu
          menu={loggedMenu}
          className={cx('AruiUserMenu-menu', classes?.menu)}
          style={styles?.menu}
          sx={{
            paddingTop: '0px'
          }}
        />
      </AccordionDetails>
    </Accordion>
  )
}
