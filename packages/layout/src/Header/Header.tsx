import { cx } from '@emotion/css'
import { Box, BoxProps, Stack, Tab, Tabs, TabsProps } from '@mui/material'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useMemo } from 'react'

export type HeaderTab = {
  key: string
  label: string
}

export type HeaderContent = {
  leftPart?: JSX.Element[]
  rightPart?: JSX.Element[]
}

interface HeaderClasses {
  contentContainer?: string
  lineContainer?: string
  leftPartContainer?: string
  rightPartContainer?: string
  tabs?: string
}

interface HeaderStyles {
  contentContainer?: React.CSSProperties
  lineContainer?: React.CSSProperties
  leftPartContainer?: React.CSSProperties
  rightPartContainer?: React.CSSProperties
  tabs?: React.CSSProperties
}

export interface HeaderBasicProps extends BasicProps {
  /**
   * The content of the header
   * @default []
   */
  content?: HeaderContent[]
  /**
   * Provide this props if you want to have tabs in the header. It will disable the bottom padding and put the tabs instead.
   * @default []
   */
  tabs?: HeaderTab[]
  /**
   * Pass to this prop the key of the current tab
   */
  currentTab?: string
  /**
   * The event called when the tab changes
   */
  onTabChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => void
  /**
   * Indicates if the header have horizontal paddinf or not.
   * @false
   */
  withHorizontalPadding?: string
  /**
   * Indicates whether or not to display the divider at the bottom of the header.
   * @true
   */
  withBottomDivider?: string
  /**
   * The tabs component props
   */
  tabsProps?: TabsProps
  /**
   * The classes applied to the different part of the component
   */
  classes?: HeaderClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: HeaderStyles
}

export type HeaderProps = MergeMuiElementProps<BoxProps, HeaderBasicProps>

export const Header = (props: HeaderProps) => {
  const {
    content = [],
    tabs,
    currentTab,
    withHorizontalPadding = false,
    withBottomDivider = true,
    sx,
    onTabChange,
    tabsProps,
    classes,
    styles,
    className,
    ...rest
  } = props

  const conentDisplay = useMemo(
    () =>
      content.map((it, index) => (
        <Stack
          className={cx('AruiHeader-lineContainer', classes?.lineContainer)}
          style={styles?.lineContainer}
          direction='row'
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: (theme) => theme.spacing(2)
          }}
          key={index}
        >
          {it.leftPart ? (
            <Stack
              direction='row'
              className={cx(
                'AruiHeader-leftPartContainer',
                classes?.leftPartContainer
              )}
              style={styles?.leftPartContainer}
              sx={{
                alignItems: 'center',
                gap: (theme) => theme.spacing(2)
              }}
              key={index}
            >
              {it.leftPart}
            </Stack>
          ) : (
            <Box />
          )}
          {it.rightPart ? (
            <Stack
              className={cx(
                'AruiHeader-rightPartContainer',
                classes?.rightPartContainer
              )}
              style={styles?.rightPartContainer}
              direction='row'
              sx={{
                alignItems: 'center',
                gap: (theme) => theme.spacing(2),
                justifyContent: 'flex-end'
              }}
              key={index}
            >
              {it.rightPart}
            </Stack>
          ) : (
            <Box />
          )}
        </Stack>
      )),
    [content, classes, styles]
  )

  const tabsDisplay = useMemo(
    () =>
      tabs &&
      tabs.map((tab) => (
        <Tab
          key={tab.key}
          value={tab.key}
          label={tab.label}
          sx={{
            color: '#000000'
          }}
        />
      )),
    [tabs]
  )

  return (
    <Box
      className={cx('AruiHeader-root', className)}
      sx={{
        padding: (theme) => {
          const p = theme.spacing(2)
          if (withHorizontalPadding && tabs) {
            return `${p}px ${p}px 0`
          }
          if (withHorizontalPadding) {
            return `${p}px`
          }
          if (tabs) {
            return `${p}px 0 0`
          }
          return `${p}px 0`
        },
        borderBottom: withBottomDivider ? '1px solid #BEC7CC' : 'none',
        width: '100%',
        ...sx
      }}
      {...rest}
    >
      <Stack
        className={cx('AruiHeader-contentContainer', classes?.contentContainer)}
        style={styles?.contentContainer}
        sx={{
          gap: (theme) => theme.spacing(2)
        }}
      >
        {conentDisplay}
        {tabsDisplay && (
          <Tabs
            {...tabsProps}
            className={cx('AruiHeader-tabs', classes?.tabs)}
            style={styles?.tabs}
            value={currentTab}
            onChange={onTabChange}
            variant='scrollable'
            scrollButtons='auto'
            sx={{
              marginTop: (theme) => theme.spacing(1),
              ...tabsProps?.sx
            }}
          >
            {tabsDisplay}
          </Tabs>
        )}
      </Stack>
    </Box>
  )
}
