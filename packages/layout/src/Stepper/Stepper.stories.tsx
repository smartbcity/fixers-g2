import React, {
  RefForwardingComponent,
  useImperativeHandle,
  useState
} from 'react'
import { Stepper as AruiStepper, StepperProps } from './Stepper'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs'
import { OnNextHandles, StepDetails } from './MuiStepperWrapper'
import { MuiStepperWrapper } from './MuiStepperWrapper'
import { MuiStepperWrapperLabel } from './types'

export default {
  title: 'Layout/Stepper',
  component: AruiStepper,
  subcomponents: { MuiStepperWrapper },
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgsTable story={PRIMARY_STORY} />
        </>
      )
    }
  },
  argTypes: {
    muiStepperWrapperProps: {
      table: {
        type: {
          summary: 'MuiStepperWrapperProps'
        }
      },
      control: null
    },
    muiStepperWrapperLabel: {
      table: {
        type: {
          summary: 'MuiStepperWrapperLabel',
          detail: MuiStepperWrapperLabel
        }
      },
      control: null
    }
  }
} as Meta

const getSteps = (stepRef: React.RefObject<OnNextHandles>): StepDetails[] => {
  return [
    {
      id: 0,
      label: `Step 0`,
      component: <BasicStepForward ref={stepRef} id={0} />
    },
    {
      id: 1,
      label: `Step 1`,
      component: <BasicStepForward ref={stepRef} id={1} />
    },
    {
      id: 2,
      label: `Step 2`,
      component: <BasicStepForward ref={stepRef} id={2} />
    }
  ]
}

const Template: Story<StepperProps> = (args: StepperProps) => {
  const [activeStep, setActiveStep] = useState(0)
  const muiStepperWrapperProps = {
    getSteps: getSteps,
    onFinish: () => {},
    activeStep: activeStep,
    gotoStep: (newStep: number) => setActiveStep(newStep)
  }

  return (
    <AruiStepper {...args} muiStepperWrapperProps={muiStepperWrapperProps} />
  )
}

export const Stepper = Template.bind({})
Stepper.args = {
  muiStepperWrapperLabel: {
    next: 'Suivant',
    back: 'Précédent',
    finish: 'Terminer'
  }
}

interface Props {
  id: number
}

const BasicStep: RefForwardingComponent<OnNextHandles, Props> = (
  props: Props,
  ref
) => {
  const { id } = props
  useImperativeHandle(ref, () => ({
    onNext(): boolean {
      return true
    }
  }))
  return <p>Step {id}</p>
}

const BasicStepForward = React.forwardRef(BasicStep)
