import React, { useCallback, useRef } from 'react'
import { Theme } from '@material-ui/core/styles'
import MuiStepper, {
  StepperProps as MuiStepperProps
} from '@material-ui/core/Stepper'
import MuiStep, { StepProps as MuiStepProps } from '@material-ui/core/Step'
import MuiStepLabel, {
  StepLabelProps as MuiStepLabelProps
} from '@material-ui/core/StepLabel'
import Button, { ButtonProps } from '@material-ui/core/Button'
import { Paper, PaperProps } from '@material-ui/core'
import clsx from 'clsx'
import { BasicProps, lowLevelStyles } from '@smartb/g2-themes'

const useStyles = lowLevelStyles()((theme: Theme) => ({
  root: {
    width: '90%',
    height: '90%',
    maxWidth: '90%'
  },
  stepper: {
    margin: theme.spacing(5)
  },
  actions: {
    marginTop: theme.spacing(5)
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

export interface OnNextHandles {
  onNext(): boolean
}

export interface StepDetails {
  id: number
  label: string
  component: React.ReactNode
}

export interface MuiStepperWrapperLabel {
  next: string
  back: string
  finish: string
}

const englishLabel = {
  next: 'Next',
  back: 'Back',
  finish: 'Finish'
} as MuiStepperWrapperLabel

interface MuiStepperWrapperClasses {
  content?: string
  actions?: string
  backButton?: string
  nextButton?: string
  finishButton?: string
}

interface MuiStepperWrapperStyles {
  content?: React.CSSProperties
  actions?: React.CSSProperties
  backButton?: React.CSSProperties
  nextButton?: React.CSSProperties
  finishButton?: React.CSSProperties
}

export interface MuiStepperWrapperProps extends BasicProps {
  /**
   * Define the current active step
   */
  activeStep: number
  /**
   * Get the steps details
   * @param stepRef
   */
  getSteps: (stepRef: React.RefObject<OnNextHandles>) => StepDetails[]
  /**
   * Move to the given step
   * @param stepNumber
   */
  gotoStep: (stepNumber: number) => void
  /**
   * The event called when all steps are finished
   */
  onFinish: () => void
  /**
   * The optionnal props of the Paper (normaly given to override classes and styles)
   */
  PaperProps?: Partial<PaperProps>
  /**
   * The optionnal props of the Stepper (normaly given to override classes and styles)
   */
  StepperProps?: Partial<MuiStepperProps>
  /**
   * The optionnal props of the StepperButton (normaly given to override classes and styles)
   */
  StepperButtonProps?: Partial<ButtonProps>
  /**
   * The optionnal props of the Step (normaly given to override classes and styles)
   */
  StepProps?: Partial<MuiStepProps>
  /**
   * The optionnal props of the StepLabel (normaly given to override classes and styles)
   */
  StepLabelProps?: Partial<MuiStepLabelProps>
  /**
   * Labels for stepper buttons
   */
  label?: MuiStepperWrapperLabel
  /**
   * The classes applied to the different part of the component
   */
  classes?: MuiStepperWrapperClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: MuiStepperWrapperStyles
}

export const MuiStepperWrapper = (props: MuiStepperWrapperProps) => {
  const {
    activeStep,
    gotoStep,
    onFinish,
    getSteps,
    className,
    style,
    id,
    PaperProps,
    StepperProps,
    StepProps,
    StepLabelProps,
    StepperButtonProps,
    label = englishLabel,
    classes,
    styles
  } = props
  const defaultClasses = useStyles()
  const stepRef = useRef<OnNextHandles>(null)
  const steps = getSteps(stepRef)

  const handleNext = useCallback(() => {
    const isOk = stepRef.current && stepRef.current.onNext()
    isOk && gotoStep(activeStep + 1)
  }, [gotoStep, activeStep])

  const handleTerminate = useCallback(() => {
    const isOk = stepRef.current && stepRef.current.onNext()
    isOk && onFinish()
  }, [onFinish])

  const getStepContent = (stepIndex: number, steps: StepDetails[]) => {
    return stepIndex >= steps.length
      ? steps[0].component
      : steps[stepIndex].component
  }

  const handleBack = useCallback(() => {
    gotoStep(activeStep - 1)
  }, [activeStep, gotoStep])

  const activeButtonProps: Partial<ButtonProps> = {
    ...StepperButtonProps,
    variant: 'contained'
  }
  return (
    <Paper
      className={clsx('AruiStepperBase-root', className)}
      style={style}
      id={id}
      {...PaperProps}
    >
      {' '}
      {/* old className "sb-stepper" */}
      <MuiStepper activeStep={activeStep} alternativeLabel {...StepperProps}>
        {steps.map((step) => (
          <MuiStep key={step.id} {...StepProps}>
            <MuiStepLabel {...StepLabelProps}>{step.label}</MuiStepLabel>
          </MuiStep>
        ))}
      </MuiStepper>
      <Paper
        elevation={0}
        className={clsx(
          defaultClasses.stepper,
          'AruiStepperBase-content',
          classes?.content
        )}
        style={styles?.content}
      >
        {/* old className "sb-stepper-content" */}
        {getStepContent(activeStep, steps)}
        <div
          className={clsx(
            defaultClasses.actions,
            'AruiStepperBase-actions',
            classes?.actions
          )}
          style={styles?.actions}
        >
          {/* old className "sb-stepper-action" */}
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={clsx(
              defaultClasses.backButton,
              'AruiStepperBase-backButton',
              classes?.backButton
            )}
            style={styles?.backButton}
          >
            {label.back}
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              {...activeButtonProps}
              className={clsx(
                'AruiStepperBase-finishButton',
                classes?.finishButton
              )}
              style={styles?.finishButton}
              onClick={handleTerminate}
            >
              {label.finish}
            </Button>
          ) : (
            <Button
              className={clsx(
                'AruiStepperBase-nextButton',
                classes?.nextButton
              )}
              style={styles?.nextButton}
              {...activeButtonProps}
              onClick={handleNext}
            >
              {label.next}
            </Button>
          )}
        </div>
      </Paper>
    </Paper>
  )
}
