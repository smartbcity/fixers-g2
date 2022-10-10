import { Meta } from '@storybook/react'
import React from 'react'
import {
  UserResetPasswordForm,
  UserResetPasswordFormProps
} from './UserResetPasswordForm'
import { Story } from '@storybook/react/types-6-0'
import { styles, classes } from '../../Domain'

export default {
  title: 'I2-V2/UserResetPasswordForm',
  component: UserResetPasswordForm,
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'UserResetPasswordFormClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'UserResetPasswordFormStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const UserResetPasswordFormStory: Story<UserResetPasswordFormProps> = (
  args: UserResetPasswordFormProps
) => {
  return <UserResetPasswordForm {...args} />
}

UserResetPasswordFormStory.args = {
  onSubmit: (cmd) => {
    console.log(cmd)
    return true
  },
  userId: 'userId'
}

UserResetPasswordFormStory.storyName = 'UserResetPasswordForm'
