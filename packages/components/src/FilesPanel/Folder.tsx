import React from 'react'
import { Box, Typography } from  '@mui/material'
import { makeStyles } from "@mui/styles";
import { Folder as MuiFolder } from '@mui/icons-material'
import { BasicProps } from '@smartb/g2-themes'

const useStyles = makeStyles(() => ({
  folder: {
    width: '100%',
    height: '100%',
    color: '#f9c428'
  },
  text: {
    fontSize: '13px',
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%'
  },
  container: {
    cursor: 'pointer',
    borderRadius: '5px',
    '&:hover': {
      background: '#f5f5f5'
    }
  }
}))

interface FolderProps extends BasicProps {
  title: string
  onClick?: () => void
}

export const Folder = (props: FolderProps) => {
  const { title, className, id, style, onClick } = props
  const classes = useStyles()
  return (
    <Box
      className={`${className} ${classes.container}`}
      style={style}
      id={id}
      justifyContent='center'
      onClick={onClick}
    >
      <MuiFolder className={classes.folder} />
      <Typography variant='body2' align='center' className={classes.text}>
        {title}
      </Typography>
    </Box>
  )
}
