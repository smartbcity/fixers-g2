import { Stepper as AruiStepper, StepperProps } from './Stepper'
import {
  SidePageStepper as AruiSidePageStepper,
  SidePageStepperProps
} from './SidePageStepper'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import logo from '../assets/smartb.png'

export default {
  title: 'Layout/Stepper',
  component: AruiStepper
} as Meta

export const Stepper: StoryFn<StepperProps> = (args: StepperProps) => {
  return <AruiStepper {...args} />
}

Stepper.args = {
  activeStep: 1,
  steps: [
    {
      key: 'step1',
      label: 'Step 1'
    },
    {
      key: 'step2',
      label: 'Step 2'
    },
    {
      key: 'step 3',
      label: 'Step 3'
    }
  ]
}

Stepper.storyName = 'Stepper'

export const SidePageStepper: StoryFn<SidePageStepperProps> = (
  args: SidePageStepperProps
) => {
  return (
    <AruiSidePageStepper
      {...args}
      headerComponent={
        <img
          alt='smartb logo'
          src={logo}
          style={{
            width: '100%',
            maxWidth: '200px',
            marginTop: '50px'
          }}
        />
      }
    />
  )
}

SidePageStepper.args = {
  stepperProps: {
    steps: [
      {
        key: 'step1',
        label: 'Step 1'
      },
      {
        key: 'step2',
        label: 'Step 2'
      },
      {
        key: 'step 3',
        label: 'Step 3'
      }
    ]
  }
}

SidePageStepper.storyName = 'Side page stepper'
