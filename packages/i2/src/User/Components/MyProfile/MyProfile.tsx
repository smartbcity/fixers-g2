import React, { useCallback, useMemo, useState } from 'react'
import { useAuth } from '@smartb/g2-providers'
import { Box } from '@mui/system'
import { Stack, Typography } from '@mui/material'
import { Button } from '@smartb/g2-components'
import { AutomatedUserFactory, AutomatedUserFactoryProps } from '../UserFactory'

export const MyProfile = (props: AutomatedUserFactoryProps) => {
  const [readonly, setReadonly] = useState(true)

  const { service } = useAuth()

  const user = useMemo(() => {
    return service.getUser()
  }, [service.getUser])

  const onEdit = useCallback(() => {
    setReadonly(false)
  }, [])

  if (!user) return <></>
  return (
    <Box>
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          gap: '20px'
        }}
      >
        <Typography variant='h6'>My profile</Typography>
        <Button onClick={onEdit}>Editer les données</Button>
      </Stack>
      <AutomatedUserFactory
        {...props}
        userId={user.id}
        organizationId={user.organizationId}
        update={!readonly}
        readonly={readonly}
        updateUserOptions={{
          ...props.updateUserOptions,
          onSuccess: () => {
            setReadonly(true)
          }
        }}
      />
    </Box>
  )
}
