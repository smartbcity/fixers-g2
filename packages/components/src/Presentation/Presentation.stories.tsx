import {
  Presentation as AruiPresentation,
  PresentationBasicProps
} from './Presentation'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { withDesign } from 'storybook-addon-designs'
import { Stack } from '@mui/material'
import smartbLogo from '../assets/smartb.png'

export default {
  title: 'Components/Presentation',
  component: AruiPresentation,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1019%3A1023'
    }
  }
} as Meta

export const Presentation: Story<PresentationBasicProps> = (
  args: PresentationBasicProps
) => {
  return (
    <Stack
      sx={{
        gap: '30px'
      }}
    >
      <AruiPresentation {...args} />
      <AruiPresentation
        label='Smartb'
        imgSrc={smartbLogo}
        description='smartb logo'
      />
    </Stack>
  )
}

Presentation.args = {
  label: 'John Doe',
  subLabel: 'Administrateur'
}

Presentation.storyName = 'Presentation'
