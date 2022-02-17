import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback } from 'react'
import { request, useAsyncResponse } from 'utils'
import { User } from './types'
import { UserCreation, UserCreationProps } from './UserCreation'

export interface AutomatedUserCreationBasicProps extends BasicProps {
  /**
   * The api url where to make the locals api calls
   */
  apiUrl: string
  /**
   * The token to authorize the api calls
   */
  jwt?: string
  /**
   * Define whether the object is updated or created
   * @default false
   */
  update?: boolean
  /**
   * The organizationId of the user.⚠️ You have to provide it if `update` is false
   */
  organizationId?: string
  /**
   * The id of the user.⚠️ You have to provide it if `update` is true
   */
  userId?: string
  /**
   * The event called when the form is submitted. It is called regardless of it is a creation or an updation
   */
  submitted?: (user: User) => void
}

export type AutomatedUserCreationProps = MergeMuiElementProps<
  UserCreationProps,
  AutomatedUserCreationBasicProps
>

export const AutomatedUserCreation = (props: AutomatedUserCreationProps) => {
  const {
    apiUrl,
    jwt,
    update = false,
    submitted,
    userId,
    organizationId
  } = props

  const getUser = useCallback(async () => {
    const res = await request<{ user?: User }[]>({
      url: `${apiUrl}/getUser`,
      method: 'POST',
      body: JSON.stringify({
        id: userId
      }),
      jwt: jwt
    })
    if (res) {
      return res[0]
    } else {
      return undefined
    }
  }, [apiUrl, jwt, userId])

  const { result, status } = useAsyncResponse(getUser, update)

  const updateUser = useCallback(
    async (user: User) => {
      const res = await request<{ id: string }[]>({
        url: `${apiUrl}/updateUser`,
        method: 'POST',
        body: JSON.stringify(user),
        jwt: jwt
      })
      if (res) {
        submitted && submitted(user)
        return true
      } else {
        return false
      }
    },
    [apiUrl, jwt, submitted, userId]
  )

  const createUser = useCallback(
    async (user: User) => {
      const res = await request<{ id: string }[]>({
        url: `${apiUrl}/createUser`,
        method: 'POST',
        body: JSON.stringify(user),
        jwt: jwt
      })
      if (res) {
        submitted && submitted({ ...user, id: res[0].id })
        return true
      } else {
        return false
      }
    },
    [apiUrl, jwt, submitted]
  )

  if (update && status !== 'SUCCESS') return <></>
  return (
    <UserCreation
      user={result?.user}
      onSubmit={update ? updateUser : createUser}
      submitButtonLabel={update ? 'Mettre à jour' : 'Créer'}
    />
  )
}
