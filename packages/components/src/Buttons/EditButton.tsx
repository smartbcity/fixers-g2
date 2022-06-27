import React, { forwardRef } from 'react'
import { Edit } from '../icons'
import { makeG2STyles } from '@smartb/g2-themes'
import { Button, ButtonProps } from './Button'

const useStyles = makeG2STyles()({
  icon: {
    width: '19px',
    height: '19px'
  }
})

const EditButtonBase = function <T = {}>(
  props: ButtonProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { classes } = useStyles()
  return (
    <Button
      variant='text'
      startIcon={<Edit color={'#828282'} className={classes.icon} />}
      ref={ref}
      {...props}
    />
  )
}

export const EditButton = forwardRef(EditButtonBase) as typeof EditButtonBase
