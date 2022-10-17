import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React from 'react'
import { UserFactory, UserFactoryProps } from './UserFactory'
import {
  ChoicedResetPassword,
  ChoicedResetPasswordProps
} from '../UserResetPassword'

export interface AutomatedUserFactoryBasicProps extends BasicProps {
  /**
   * Define whether the object is updated or created
   * @default false
   */
  update?: boolean
  /**
   * The user id to provide if it's an updation
   */
  userId?: string
  /**
   * The props passed to the component ChoicedResetPassword
   */
  choicedResetPasswordProps?: ChoicedResetPasswordProps
  /**
   * The type of the reset password. If not provided the component will not be rendered
   */
  resetPasswordType?: 'email' | 'forced'
}

export type AutomatedUserFactoryProps = MergeMuiElementProps<
  UserFactoryProps,
  AutomatedUserFactoryBasicProps
>

export const AutomatedUserFactory = (props: AutomatedUserFactoryProps) => {
  const {
    update = false,
    organizationId,
    userId,
    choicedResetPasswordProps,
    resetPasswordType,
    formExtension,
    ...other
  } = props

  return (
    <UserFactory
      isUpdate={update}
      organizationId={organizationId}
      formExtension={
        <>
          {formExtension}
          {userId && resetPasswordType && (
            <ChoicedResetPassword
              resetPasswordType={resetPasswordType}
              userId={userId}
              {...choicedResetPasswordProps}
            />
          )}
        </>
      }
      {...other}
    />
  )
}
