import React, { useState } from 'react'
import { Button as AruiButton, ButtonBasicProps } from './Button'
import { Meta, StoryFn } from '@storybook/react'
import { Box } from '@mui/material'
import { SwapHoriz } from '@mui/icons-material'
import { EditButton } from './EditButton'
import { DeleteButton } from './DeleteButton'
import { BackButton } from './BackButton'
import { LinkButton } from './LinkButton'
import { withDesign } from 'storybook-addon-designs'
import { BrowserRouter } from 'react-router-dom'

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

export const Button: StoryFn<ButtonBasicProps> = (args: ButtonBasicProps) => (
  <AruiButton {...args}>{args.children}</AruiButton>
)

Button.args = {
  children: 'Mon Bouton'
}

export const ButtonVariant: StoryFn = () => (
  <Box display='flex' justifyContent='space-around'>
    <AruiButton variant='contained'>contained</AruiButton>
    <AruiButton variant='outlined'>outlined</AruiButton>
    <AruiButton variant='text'>text</AruiButton>
  </Box>
)

export const ButtonVariantSeverity: StoryFn = () => (
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

export const ButtonVariantDisabled: StoryFn = () => (
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

export const ButtonSizes: StoryFn = () => (
  <Box display='flex' justifyContent='space-around' alignItems='center'>
    <AruiButton variant='contained' size='large'>
      large
    </AruiButton>
    <AruiButton variant='contained' size='medium'>
      medium
    </AruiButton>
    <AruiButton variant='contained' size='small'>
      small
    </AruiButton>
  </Box>
)

export const CustomIcon: StoryFn = () => (
  <AruiButton startIcon={<SwapHoriz />}>custom icon</AruiButton>
)

export const NoDefaultIcon: StoryFn = () => (
  <AruiButton success noDefaultIcon>
    no icon
  </AruiButton>
)

export const preConfigured: StoryFn = () => (
  <Box display='flex' justifyContent='space-around'>
    <BackButton>BackButton</BackButton>
    <EditButton>EditButton</EditButton>
    <DeleteButton>DeleteButton</DeleteButton>
  </Box>
)

export const buttonExtend: StoryFn = () => {
  type ComponentPropsType = React.ComponentPropsWithRef<'a'>
  const componentProps: ComponentPropsType = {
    href: '/?path=/docs/components-button--button-extend'
  }
  return (
    <Box display='flex' justifyContent='space-around'>
      <AruiButton<ComponentPropsType>
        component={'a'}
        componentProps={componentProps}
      >
        Standard Link Button
      </AruiButton>
      <BrowserRouter>
        <LinkButton to='/'>react router Link Button</LinkButton>
      </BrowserRouter>
    </Box>
  )
}

export const asynchronousButton: StoryFn = () => {
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

ButtonVariant.storyName = 'button variants'
ButtonVariantSeverity.storyName = 'button variants severity'
ButtonVariantDisabled.storyName = 'button variants disabled'
ButtonSizes.storyName = 'button sizes'
CustomIcon.storyName = 'custom icon'
NoDefaultIcon.storyName = 'no default icon'
preConfigured.storyName = 'pre-configured buttons'
buttonExtend.storyName = 'extend a button with another component'
asynchronousButton.storyName = 'call to an asynchronous action'
