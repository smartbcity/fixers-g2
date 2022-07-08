import React, { forwardRef } from 'react'
import { Delete } from '../icons'
import { makeG2STyles } from '@smartb/g2-themes'
import { Button, ButtonProps } from './Button'

const useStyles = makeG2STyles()({
  icon: {
    width: '20px',
    height: '20px'
  }
})

const DeleteButtonBase = function <T = {}>(
  props: ButtonProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { classes } = useStyles()
  return (
    <Button<T>
      variant='text'
      startIcon={<Delete color={'#828282'} className={classes.icon} />}
      ref={ref}
      {...props}
    />
  )
}

export const DeleteButton = forwardRef(
  DeleteButtonBase
) as typeof DeleteButtonBase
