import React, { useMemo } from 'react'
import { useAuth } from '@smartb/g2-providers'
import {
  AutomatedOrganizationFactory,
  AutomatedOrganizationFactoryProps
} from '../OrganizationFactory'
import { MergeMuiElementProps } from '@smartb/g2-themes'
import { Typography } from '@mui/material'

export interface MyOrganizationBasicProps {
  /**
   * @default "Vous n'êtes pas inclut dans une organisation"
   */
  noOrganizationMessage?: string
}

export type MyOrganizationProps = MergeMuiElementProps<
  AutomatedOrganizationFactoryProps,
  MyOrganizationBasicProps
>

export const MyOrganization = (props: MyOrganizationProps) => {
  const {
    readonly,
    noOrganizationMessage = "Vous n'êtes pas inclut dans une organisation",
    ...other
  } = props

  const { service } = useAuth()

  const user = useMemo(() => {
    return service.getUser()
  }, [service.getUser])

  if (!user) return <></>
  if (!user.memberOf)
    return <Typography align='center'>{noOrganizationMessage}</Typography>
  return (
    <AutomatedOrganizationFactory
      {...other}
      organizationId={user.memberOf}
      update={!readonly}
      readonly={readonly}
    />
  )
}
