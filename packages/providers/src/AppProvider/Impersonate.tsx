import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../KeycloakProvider'

export const Impersonate = () => {
  const { keycloak } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
    keycloak.login()
  }, [])

  return <></>
}
