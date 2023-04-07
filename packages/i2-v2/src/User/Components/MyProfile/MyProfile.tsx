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
      organizationId={user.memberOf}
      fieldsOverride={
        props.update
          ? {
              ...props.fieldsOverride,
              memberOf: {
                readOnly: true,
                ...props.fieldsOverride?.memberOf
              },
              roles: {
                readOnly: true,
                ...props.fieldsOverride?.roles
              }
            }
          : props.fieldsOverride
      }
      update={!props.readOnly}
      readOnly={props.readOnly}
    />
  )
}
