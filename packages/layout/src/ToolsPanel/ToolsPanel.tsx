import React from 'react'
import { MenuItems } from '@smartb/g2-components'
import { ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionSummary,
  ListItemIcon,
  ListItemText,
  AccordionDetails,
  ListItem,
  List
} from '@mui/material'
import { BasicProps, makeG2STyles } from '@smartb/g2-themes'
import clsx from 'clsx'

const useStyles = makeG2STyles()({
  profile: {
    boxShadow: 'none !important',
    background: 'transparent',
    '&:before': {
      height: '0px'
    }
  },
  summary: {
    minHeight: '0px',
    padding: '0 10px'
  },
  content: {
    margin: '10px 0px !important'
  },
  expanded: {
    margin: '0 !important'
  },
  expandedSummary: {
    minHeight: '0px !important'
  },
  list: {
    width: '100%',
    padding: '0'
  },
  details: {
    padding: '0',
    background: '#f5f5f5'
  },
  icon: {
    alignItems: 'center'
  }
})

export interface ToolsPanelProps extends BasicProps {
  /**
   * The menu that contains all the items that will be displayed in the panel
   */
  menu: MenuItems
}

export const ToolsPanel = (props: ToolsPanelProps) => {
  const { menu, style, className, id } = props
  const { classes } = useStyles()

  return (
    <Accordion
      className={clsx(classes.profile, 'AruiToolsPanel-root', className)}
      style={style}
      id={id}
      classes={{ expanded: classes.expanded }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        className={classes.summary}
        classes={{
          expanded: classes.expandedSummary,
          content: classes.content
        }}
      >
        <ListItemIcon>{menu.icon}</ListItemIcon>
        <ListItemText primary={menu.label} />
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <List className={classes.list}>
          {menu.items && menu.items.length <= 1
            ? menu.items[0].items &&
              menu.items[0].items.map((item) => (
                <ListItem
                  button
                  key={item.key}
                  onClick={() => item.goto && item.goto()}
                >
                  {item.icon && (
                    <ListItemIcon classes={{ root: classes.icon }}>
                      {item.icon}
                    </ListItemIcon>
                  )}
                  <ListItemText primary={item.label} />
                </ListItem>
              ))
            : menu.items &&
              menu.items.map((item) => {
                return item.items ? (
                  <ToolsPanel key={item.key} menu={item} />
                ) : (
                  <ListItem
                    button
                    key={item.key}
                    onClick={() => item.goto && item.goto()}
                  >
                    {item.icon && (
                      <ListItemIcon classes={{ root: classes.icon }}>
                        {item.icon}
                      </ListItemIcon>
                    )}
                    <ListItemText primary={item.label} />
                  </ListItem>
                )
              })}
        </List>
      </AccordionDetails>
    </Accordion>
  )
}
