import React, { forwardRef } from 'react'
import { Delete } from '../icons'
import { lowLevelStyles } from '@smartb/g2-themes'
import { Button, ButtonProps } from './Button'

const useStyles = lowLevelStyles()({
  icon: {
    width: '20px',
    height: '20px',
    marginRight: '5px'
  }
})

const DeleteButtonBase = function <T = {}>(props: ButtonProps<T>, ref: React.ForwardedRef<HTMLButtonElement>) {
  const classes = useStyles()
  return (
    <Button<T>
      variant='text'
      icon={<Delete color={'#828282'} className={classes.icon} />}
      ref={ref}
      {...props}
    />
  )
}

export const DeleteButton = forwardRef(DeleteButtonBase) as typeof DeleteButtonBase

