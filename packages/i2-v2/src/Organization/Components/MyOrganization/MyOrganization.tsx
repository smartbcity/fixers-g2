import React, { useMemo } from 'react'
import { useAuth } from '@smartb/g2-providers'
import {
  AutomatedOrganizationFactory,
  OrganizationFactoryProps
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
  OrganizationFactoryProps,
  MyOrganizationBasicProps
>

export const MyOrganization = (props: MyOrganizationProps) => {
  const {
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
  return <AutomatedOrganizationFactory {...other} />
}
