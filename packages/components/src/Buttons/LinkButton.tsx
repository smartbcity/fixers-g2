import { Link, LinkProps } from 'react-router-dom'
import { Button, ButtonProps } from './Button'
import React from 'react'

export interface LinkButtonProps
  extends Omit<ButtonProps, 'component, componentProps'> {
  to: string
}

export const LinkButton = (props: LinkButtonProps) => {
  const { to, ...other } = props
  return (
    <Button<LinkProps>
      component={Link}
      {...other}
      componentProps={{ to: to }}
    />
  )
}
