import {
  UserAvatar as AruiUserAvatar,
  UserAvatarBasicProps
} from './UserAvatar'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Components/UserAvatar',
  component: AruiUserAvatar,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1019%3A1023'
    }
  }
} as Meta

export const UserAvatar: StoryFn<UserAvatarBasicProps> = (
  args: UserAvatarBasicProps
) => {
  return <AruiUserAvatar {...args} />
}

UserAvatar.args = {
  name: 'John Doe'
}

UserAvatar.storyName = 'UserAvatar'
