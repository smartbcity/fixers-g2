import { useAuth } from '@smartb/g2'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Impersonate = () => {
  const { keycloak } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
    keycloak.login()
  }, [])

  return <></>
}
