import { Box, Paper, PaperProps, Typography } from '@mui/material'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import React, { forwardRef } from 'react'

const useStyles = makeG2STyles()((theme) => ({
  root: {
    padding: `${theme.spacing * 1.5}px ${theme.spacing * 4}px`,
    display: 'inline-block',
    background: 'transparent',
    borderRadius: '0px',
    boxSizing: 'border-box',
    maxWidth: '250px'
  },
  rootLongText: {
    maxWidth: '300px',
    padding: `${theme.spacing * 1.5}px ${theme.spacing * 2}px`
  },
  composedRoot: {
    background: 'white',
    borderRadius: theme.borderRadius
  },
  content: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '25px',
    color: '#808A9D'
  },
  title: {
    color: '#808A9D',
    lineHeight: '19px'
  }
}))

interface TicketClasses {
  baseContainer?: string
  textContainer?: string
  title?: string
  content?: string
}

interface TicketStyles {
  baseContainer?: React.CSSProperties
  textContainer?: React.CSSProperties
  title?: React.CSSProperties
  content?: React.CSSProperties
}

export interface TicketBasicProps extends BasicProps {
  /**
   * The title displayed in the component
   */
  title?: React.ReactNode
  /**
   * The content displayed in the component
   */
  content?: React.ReactNode
  /**
   * The icon displayed in the component
   */
  icon?: React.ReactNode
  /**
   * The different variants of the component
   *
   * @default "normal"
   */
  variant?: 'normal' | 'composed' | 'elevated'
  /**
   * Reverse the styles between the title and the content
   *
   * @default false
   */
  reversed?: boolean
  /**
   * Define if the text in the ticket is long
   *
   * @default false
   */
  longText?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: TicketClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: TicketStyles
}

export type TicketProps = MergeMuiElementProps<PaperProps, TicketBasicProps>

const TicketBase = (
  props: TicketProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    title,
    content,
    icon,
    variant = 'normal',
    className,
    style,
    id,
    reversed = false,
    classes,
    styles,
    longText = false,
    ...other
  } = props
  const defaultStyles = useStyles()
  return (
    <Paper
      ref={ref}
      id={id}
      style={style}
      className={defaultStyles.cx(
        defaultStyles.classes.root,
        variant !== 'normal' && defaultStyles.classes.composedRoot,
        longText && defaultStyles.classes.rootLongText,
        'AruiTicket-root',
        className
      )}
      elevation={variant === 'elevated' ? 1 : 0}
      {...other}
    >
      <Box
        className={defaultStyles.cx(
          'AruiTicket-baseContainer',
          classes?.baseContainer
        )}
        style={styles?.baseContainer}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        {icon}
        <Box
          className={defaultStyles.cx(
            'AruiTicket-textContainer',
            classes?.textContainer
          )}
          style={styles?.textContainer}
          sx={{
            marginLeft: (theme) =>
              icon
                ? longText
                  ? `${theme.spacing(2)}`
                  : `${theme.spacing(2.5)}`
                : undefined
          }}
          display='flex'
          flexDirection='column'
        >
          <Typography
            className={defaultStyles.cx(
              !reversed
                ? defaultStyles.classes.title
                : defaultStyles.classes.content,
              'AruiTicket-title',
              classes?.title
            )}
            style={styles?.title}
            variant={!reversed ? 'body2' : 'subtitle1'}
          >
            {title}
          </Typography>
          <Typography
            className={defaultStyles.cx(
              !reversed
                ? defaultStyles.classes.content
                : defaultStyles.classes.title,
              'AruiTicket-content',
              classes?.content
            )}
            style={styles?.content}
            variant={!reversed ? 'subtitle1' : 'body2'}
          >
            {content}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export const Ticket = forwardRef(TicketBase) as typeof TicketBase
