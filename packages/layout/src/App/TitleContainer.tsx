import { Box, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { BasicProps, makeG2STyles } from '@smartb/g2-themes'

const useStyles = makeG2STyles()({
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
  const defaultStyles = useStyles()
  return (
    <Box
      display='flex'
      justifyContent='center'
      className={defaultStyles.cx(
        defaultStyles.classes.drawerSpacer,
        'AruiTitleContainer-root',
        className
      )}
      {...other}
    >
      <List>
        <ListItem key='application' alignItems='center' component='div'>
          <ListItemText>
            {logo && (
              <img
                src={logo}
                className={defaultStyles.cx(
                  'AruiTitleContainer-logo',
                  classes?.logo
                )}
                style={styles?.logo}
                alt='Logo'
              />
            )}
          </ListItemText>
          {title && (
            <ListItemText
              primary={title}
              className={defaultStyles.cx(
                'AruiTitleContainer-title',
                classes?.title
              )}
              style={styles?.title}
            />
          )}
        </ListItem>
      </List>
    </Box>
  )
}
