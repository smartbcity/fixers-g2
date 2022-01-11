import React, { forwardRef } from 'react'
import { Edit } from '../icons'
import { makeG2STyles } from '@smartb/g2-themes'
import { Button, ButtonProps } from './Button'

const useStyles = makeG2STyles()({
  icon: {
    width: '19px',
    height: '19px',
    marginRight: '5px'
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
      icon={<Edit color={'#828282'} className={classes.icon} />}
      ref={ref}
      {...props}
    />
  )
}

export const EditButton = forwardRef(EditButtonBase) as typeof EditButtonBase
