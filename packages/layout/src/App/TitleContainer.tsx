import { Box, List, ListItem, ListItemText } from  '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { BasicProps, lowLevelStyles } from '@smartb/g2-themes'

const useStyles = lowLevelStyles()({
  drawerSpacer: {
    '& img': {
      marginTop: '5px',
      marginRight: '10px',
      height: '20px'
    }
  }
})

interface TitleContainerClasses {
  logo?: string
  title?: string
}

interface TitleContainerStyles {
  logo?: React.CSSProperties
  title?: React.CSSProperties
}

export interface TitleContainerProps extends BasicProps {
  /**
   * The title thzt will be displayed at the top left of the component
   */
  title?: string
  /**
   * The path to the logo of the component
   */
  logo?: string
  classes?: TitleContainerClasses
  styles?: TitleContainerStyles
}

export const TitleContainer = (props: TitleContainerProps) => {
  const { classes, logo, className, title, styles, ...other } = props
  const defaultClasses = useStyles()
  return (
    <Box
      display='flex'
      justifyContent='center'
      className={clsx(
        className,
        'AruiTitleContainer-root',
        defaultClasses.drawerSpacer
      )}
      {...other}
    >
      <List>
        <ListItem key='application' alignItems='center' component='div'>
          <ListItemText>
            {logo && (
              <img
                src={logo}
                className={clsx(classes?.logo, 'AruiTitleContainer-logo')}
                style={styles?.logo}
                alt='Logo'
              />
            )}
          </ListItemText>
          {title && (
            <ListItemText
              primary={title}
              className={clsx(classes?.title, 'AruiTitleContainer-title')}
              style={styles?.title}
            />
          )}
        </ListItem>
      </List>
    </Box>
  )
}
