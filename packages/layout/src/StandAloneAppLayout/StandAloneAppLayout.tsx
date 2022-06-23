import { Menu } from '@mui/icons-material'
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  styled,
  Typography,
  useMediaQuery
} from '@mui/material'
import { MenuItem } from '@smartb/g2-components'
import React, { useCallback, useEffect, useState } from 'react'
import { AppLogoProps, AppMenu } from '../AppMenu'

const drawerWidth = 236

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'isMobile'
})<{
  isMobile?: boolean
}>(({ theme, isMobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: isMobile ? '' : `${drawerWidth}px`,
  width: isMobile ? '100vw' : `calc(100vw - ${drawerWidth}px)`,
  height: '100vh',
  overflow: 'auto'
}))

export interface StandAloneAppLayoutProps {
  /**
   * The application that has to be surrounded by the appbar and the drawer
   */
  children?: React.ReactNode
  /**
   * The list of the actions that will be displayed in the drawer menu
   */
  menu?: MenuItem[]
  /**
   * The logo in the navBar
   */
  logo?: AppLogoProps
  /**
   * Defined if the drawer is open or not. I you don't provide it an automatic behavior will be applied.
   */
  open?: boolean
  /**
   * The function that is called when the hamburger button is clicked on mobile
   */
  onToggle?: () => void
}

export const StandAloneAppLayout = (props: StandAloneAppLayoutProps) => {
  const { children, menu, logo, open, onToggle } = props
  const isMobile = useMediaQuery('(max-width:800px)')
  const [openLocal, setOpen] = useState(!isMobile)

  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isMobile])

  const currentOpen = open !== undefined ? open : openLocal

  const onToggleLocal = useCallback(() => {
    setOpen((prevOpen) => !prevOpen)
    onToggle && onToggle()
  }, [onToggle])

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            height: `100vh`,
            borderRight: '1px solid #BEC7CC',
            overflow: 'visible',

            visibility: 'visible !important' as 'visible'
          }
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        ModalProps={{
          keepMounted: true
        }}
        onClose={onToggleLocal}
        anchor='left'
        open={currentOpen}
      >
        <AppMenu menu={menu ?? []} logo={logo} />
        {isMobile && (
          <Box
            sx={{
              position: 'absolute',
              border: 'solid 1px #BEC7CC',
              borderRadius: '0px 5px 5px 0px',
              borderWidth: '1px 1px 1px 0px',
              backgroundColor: '#FFFFFF',
              top: '8px',
              left: drawerWidth - 1,
              display: 'flex',
              padding: '4px 8px',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <IconButton onClick={onToggleLocal}>
              <Menu
                sx={{
                  width: '30px',
                  height: '30px'
                }}
              />
            </IconButton>
          </Box>
        )}
      </Drawer>
      <CssBaseline />
      <Main
        isMobile={isMobile}
        sx={{
          bgcolor: '#EEEEEE'
        }}
      >
        {children}
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Main>
    </>
  )
}
