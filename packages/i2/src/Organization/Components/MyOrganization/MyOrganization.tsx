import React, { useCallback, useMemo, useState } from 'react'
import { useAuth } from '@smartb/g2-providers'
import { Box } from '@mui/system'
import { Button, Stack, Typography } from '@mui/material'
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
  const { updateAllowedRoles, ...other } = props
  const [readonly, setReadonly] = useState(true)

  const { service } = useAuth()

  const user = useMemo(() => {
    return service.getUser()
  }, [service.getUser])

  const isAllowedToEdit = useMemo(() => {
    if (!updateAllowedRoles) return false
    return service.isAuthorized(updateAllowedRoles)
  }, [updateAllowedRoles])

  const onEdit = useCallback(() => {
    setReadonly(false)
  }, [])

  if (!user) return <></>
  return (
    <Box>
      <Stack
        direction='row'
        sx={{
          gap: '20px'
        }}
      >
        <Typography variant='h6'>Mon organisation</Typography>
        {isAllowedToEdit && !readonly && (
          <Button onClick={onEdit}>Editer les données</Button>
        )}
      </Stack>
      <AutomatedOrganizationFactory
        {...other}
        organizationId={user.organizationId}
        update={!readonly}
        readonly={readonly}
        updateOrganizationOptions={{
          ...props.updateOrganizationOptions,
          onSuccess: () => {
            setReadonly(true)
          }
        }}
      />
    </Box>
  )
}
