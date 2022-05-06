import React, { useMemo, useState } from 'react'
import { useAuth } from '@smartb/g2-providers'
import { Box } from '@mui/system'
import { Stack, Typography } from '@mui/material'
import {
  AutomatedOrganizationFactory,
  AutomatedOrganizationFactoryProps
} from '../OrganizationFactory'

export const MyOrganization = (props: AutomatedOrganizationFactoryProps) => {
  const [readonly, setReadonly] = useState(true)

  const { service } = useAuth()

  const user = useMemo(() => {
    return service.getUser()
  }, [service.getUser])

  if (!user) return <></>
  return (
    <Box>
      <Stack
        direction='row'
        sx={{
          gap: '20px'
        }}
      >
        <Typography variant='h6'>My organization</Typography>
      </Stack>
      <AutomatedOrganizationFactory
        {...props}
        organizationId={user.organizationId}
        update={!readonly}
        readonly={readonly}
      />
    </Box>
  )
}
