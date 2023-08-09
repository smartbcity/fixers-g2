import React from 'react'
import {
  ContextMenu as AruiContextMenu,
  ContextMenuBasicProps
} from './ContextMenu'
import { Meta, StoryFn } from '@storybook/react'
import { styles, classes } from './docs'
import { MenuItems } from '../Menu'
import { Box, Typography } from '@mui/material'
import { VirtualElement } from '@popperjs/core'

export default {
  title: 'Components/ContextMenu',
  component: AruiContextMenu,
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'ContextMenuClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'ContextMenuStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const ContextMenu: StoryFn<ContextMenuBasicProps> = (
  args: ContextMenuBasicProps
) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <button onClick={handleClick}>click</button>
      <AruiContextMenu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        open={!!anchorEl}
        {...args}
        placement='bottom'
      />
    </Box>
  )
}

const menu: MenuItems[] = [
  {
    key: 'test1',
    label: 'test1',
    items: [
      {
        key: 'test1.1',
        label: 'test1.1'
      },
      {
        key: 'test1.2',
        label: 'test1.2'
      },
      {
        key: 'test1.3',
        label: 'test1.3'
      }
    ]
  },
  {
    key: 'test2',
    label: 'test2',
    items: [
      {
        key: 'test2.1',
        label: 'test2.1'
      },
      {
        key: 'test2.2',
        label: 'test2.2'
      },
      {
        key: 'test2.3',
        label: 'test2.3'
      }
    ]
  },
  ,
  {
    key: 'test3',
    label: 'test3',
    items: [
      {
        key: 'test3.1',
        label: 'test3.1'
      },
      {
        key: 'test3.2',
        label: 'test3.2'
      },
      {
        key: 'test3.3',
        label: 'test3.3',
        items: [
          {
            key: 'test3.3.1',
            label: 'test3.3.1'
          },
          {
            key: 'test3.3.2',
            label: 'test3.3.2'
          },
          {
            key: 'test3.3.3',
            label: 'test3.3.3'
          }
        ]
      }
    ]
  }
]

export const RightClickContextMenu: StoryFn<ContextMenuBasicProps> = (
  args: ContextMenuBasicProps
) => {
  const [anchorEl, setAnchorEl] = React.useState<VirtualElement | null>(null)

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const x = event.clientX + 5
    const y = event.clientY - 5
    setAnchorEl(
      anchorEl
        ? null
        : {
            getBoundingClientRect: () => ({
              width: 0,
              height: 0,
              top: y,
              right: x,
              bottom: y,
              left: x
            })
          }
    )
    event.preventDefault()
  }

  return (
    <div
      onContextMenu={handleContextMenu}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px'
      }}
    >
      <Typography>Right click here to open custom context menu</Typography>
      <AruiContextMenu
        menu={menu}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        open={!!anchorEl}
        placement='right-start'
      />
    </div>
  )
}

ContextMenu.args = {
  menu: menu
}

ContextMenu.storyName = 'ContextMenu'
