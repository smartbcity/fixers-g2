import React, { useMemo } from 'react'
import { useAuth } from '@smartb/g2-providers'
import { AutomatedUserFactory, AutomatedUserFactoryProps } from '../UserFactory'

export const MyProfile = (props: AutomatedUserFactoryProps) => {
  const { service } = useAuth()

  const user = useMemo(() => {
    return service.getUser()
  }, [service.getUser])

  if (!user) return <></>
  return (
    <AutomatedUserFactory
      {...props}
      userId={user.id}
      organizationId={user.organizationId}
      readonlyFieldsPerState={{
        update: {
          memberOf: true,
          email: true,
          roles: true
        }
      }}
      update={!props.readonly}
      readonly={props.readonly}
    />
  )
}
