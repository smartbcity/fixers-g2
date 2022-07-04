import React, { useMemo } from 'react'
import { useAuth } from '@smartb/g2-providers'
import {
  AutomatedOrganizationFactory,
  AutomatedOrganizationFactoryProps
} from '../OrganizationFactory'
import { MergeMuiElementProps } from '@smartb/g2-themes'

export interface MyOrganizationBasicProps {
  updateAllowedRoles?: string[]
}

export type MyOrganizationProps = MergeMuiElementProps<
  AutomatedOrganizationFactoryProps,
  MyOrganizationBasicProps
>

export const MyOrganization = (props: MyOrganizationProps) => {
  const { updateAllowedRoles, readonly, ...other } = props

  const { service } = useAuth()

  const user = useMemo(() => {
    return service.getUser()
  }, [service.getUser])

  if (!user) return <></>
  return (
    <AutomatedOrganizationFactory
      {...other}
      organizationId={user.organizationId}
      update={!readonly}
      readonly={readonly}
    />
  )
}
