import { Avatar, AvatarProps, Typography } from '@mui/material'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useMemo } from 'react'
import { stringToAvatarAttributs } from '@smartb/g2-utils'

export interface UserAvatarBasicProps extends BasicProps {
  /**
   * The name of the user composed like this: `${givenName} ${familyName}`.
   */
  name: string
  /**
   * The size of the avatar.
   *  @default 'small'
   */
  size?: 'small' | 'medium' | 'large'
}

export type UserAvatarProps = MergeMuiElementProps<
  AvatarProps,
  UserAvatarBasicProps
>

export const UserAvatar = (props: UserAvatarProps) => {
  const { name, size = 'small', sx, ...other } = props

  const attr = useMemo(() => stringToAvatarAttributs(name), [name])
  const sizeNumber =
    size === 'small' ? '40px' : size === 'medium' ? '60px' : '100px'

  return (
    <Avatar
      sx={{
        bgcolor: attr.color,
        width: sizeNumber,
        height: sizeNumber,
        ...sx
      }}
      {...other}
    >
      <Typography
        variant={size === 'small' ? 'body1' : size === 'medium' ? 'h6' : 'h4'}
      >
        {attr.label}
      </Typography>
    </Avatar>
  )
}
