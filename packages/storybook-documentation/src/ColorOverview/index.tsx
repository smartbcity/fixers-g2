import React from 'react'
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from  '@mui/material'

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: '150px',
      height: '150px',
      boxShadow: 'rgba(0, 0, 0, 0.2) -3px -5px inset',
      margin: '10px',
      borderRadius: '5px',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center'
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      width: '100%'
    },
    root: {
      width: '100%',
      border: '#dbdbdb 1px solid',
      borderRadius: '10px',
      marginBottom: '20px'
    },
    header: {
      width: '80%',
      marginLeft: '10%',
      borderBottom: '#dbdbdb 1px solid',
      display: 'flex',
      padding: '15px',
      justifyContent: 'center'
    },
    image: {
      maxWidth: '500px',
      maxHeight: '200px'
    },
    text: {
      color: 'black'
    }
  })
)

export interface ColorProps {
  colors: string[]
  image?: string
  children?: React.ReactNode
}

export const Color = (props: ColorProps) => {
  const { colors, image, children } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {!!children ||
        (!!image && (
          <div className={classes.header}>
            {children}
            {!!image && <img className={classes.image} src={image} />}
          </div>
        ))}
      <div className={classes.container}>
        {colors.map((color, index) => (
          <div
            className={classes.card}
            key={index}
            style={{ background: color }}
          >
            <Typography className={classes.text} variant='h5' gutterBottom>
              {color}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Color
