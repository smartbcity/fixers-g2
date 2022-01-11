import React, { useState } from 'react'
import { Button as AruiButton, ButtonBasicProps } from './Button'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { Box } from '@mui/material'
import { SwapHoriz } from '@mui/icons-material'
import { EditButton } from './EditButton'
import { DeleteButton } from './DeleteButton'
import { BackButton } from './BackButton'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Components/Button',
  component: AruiButton,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A871'
    }
  }
} as Meta

const Template: Story<ButtonBasicProps> = (args: ButtonBasicProps) => (
  <AruiButton {...args}>{args.children}</AruiButton>
)

export const Button = Template.bind({})
Button.args = {
  children: 'Mon Bouton'
}

const Template2: Story = () => (
  <Box display='flex' justifyContent='space-around'>
    <AruiButton variant='contained'>contained</AruiButton>
    <AruiButton variant='outlined'>outlined</AruiButton>
    <AruiButton variant='text'>text</AruiButton>
  </Box>
)

const Template3: Story = () => (
  <Box display='flex' justifyContent='space-around'>
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='space-around'
      height='200px'
      alignItems='center'
    >
      <AruiButton variant='contained' success>
        contained succes
      </AruiButton>
      <AruiButton variant='contained' fail>
        contained fail
      </AruiButton>
      <AruiButton variant='contained' warning>
        contained warning
      </AruiButton>
      <AruiButton variant='contained' isLoading>
        contained loading
      </AruiButton>
    </Box>
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='space-around'
      alignItems='center'
    >
      <AruiButton variant='outlined' success>
        outlined succes
      </AruiButton>
      <AruiButton variant='outlined' fail>
        outlined fail
      </AruiButton>
      <AruiButton variant='outlined' warning>
        outlined warning
      </AruiButton>
      <AruiButton variant='outlined' isLoading>
        outlined loading
      </AruiButton>
    </Box>
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='space-around'
      alignItems='center'
    >
      <AruiButton variant='text' success>
        text succes
      </AruiButton>
      <AruiButton variant='text' fail>
        text fail
      </AruiButton>
      <AruiButton variant='text' warning>
        text warning
      </AruiButton>
      <AruiButton variant='text' isLoading>
        text loading
      </AruiButton>
    </Box>
  </Box>
)

const Template4: Story = () => (
  <Box display='flex' justifyContent='space-around'>
    <AruiButton variant='contained' disabled>
      contained disabled
    </AruiButton>
    <AruiButton variant='outlined' disabled>
      outlined disabled
    </AruiButton>
    <AruiButton variant='text' disabled>
      text disabled
    </AruiButton>
  </Box>
)

const Template5: Story = () => (
  <AruiButton icon={<SwapHoriz style={{ marginRight: '5px' }} />}>
    custom icon
  </AruiButton>
)

const Template6: Story = () => (
  <AruiButton success noIcon>
    no icon
  </AruiButton>
)

const Template7: Story = () => (
  <Box display='flex' justifyContent='space-around'>
    <BackButton>BackButton</BackButton>
    <EditButton>EditButton</EditButton>
    <DeleteButton>DeleteButton</DeleteButton>
  </Box>
)

const Template8: Story = () => {
  type ComponentPropsType = React.ComponentPropsWithRef<'a'>
  const componentProps: ComponentPropsType = {
    href: '/?path=/docs/components-button--button-extend'
  }
  return (
    <AruiButton<ComponentPropsType>
      component={'a'}
      componentProps={componentProps}
    >
      Link Button
    </AruiButton>
  )
}

const Template9: Story = () => {
  const [success, setSuccess] = useState(false)
  const asyncFucntion = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved')
        setSuccess(true)
      }, 2000)
    })
  }
  return (
    <AruiButton onClick={asyncFucntion} success={success}>
      Asynchronous action
    </AruiButton>
  )
}

export const ButtonVariant = Template2.bind({})

export const ButtonVariantSeverity = Template3.bind({})

export const ButtonVariantDisabled = Template4.bind({})

export const CustomIcon = Template5.bind({})

export const NoIcon = Template6.bind({})

export const preConfigured = Template7.bind({})

export const buttonExtend = Template8.bind({})

export const asynchronousButton = Template9.bind({})

ButtonVariant.storyName = 'button variants'
ButtonVariantSeverity.storyName = 'button variants severity'
ButtonVariantDisabled.storyName = 'button variants disabled'
CustomIcon.storyName = 'custom icon'
NoIcon.storyName = 'no icon'
preConfigured.storyName = 'pre-configured buttons'
buttonExtend.storyName = 'extend a button with another component'
asynchronousButton.storyName = 'call to an asynchronous action'
