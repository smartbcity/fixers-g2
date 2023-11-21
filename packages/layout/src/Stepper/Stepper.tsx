import { CheckRounded } from '@mui/icons-material'
import {
  Step,
  StepIconProps,
  StepLabel,
  Stepper as MuiStepper,
  StepperProps as MuiStepperProps,
  StepProps,
  SxProps,
  Theme,
  Typography,
  StepConnector
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { MergeMuiElementProps } from '@smartb/g2'
import React, { useMemo } from 'react'

export type StepItem = {
  key: string
  label: string
} & StepProps

export type ColorPalette =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'

export interface StepperBasicProps {
  steps: StepItem[]
  headerComponent?: React.ReactNode
  activeStep?: number
  /**
   * The component orientation (layout flow direction).
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The color of the active step
   * @default 'primary'
   */
  activeColor?: ColorPalette
}

export type StepperProps = MergeMuiElementProps<
  MuiStepperProps,
  StepperBasicProps
>

export const Stepper = (props: StepperProps) => {
  const {
    steps = [],
    headerComponent,
    sx,
    activeStep,
    orientation = 'vertical',
    activeColor = 'primary',
    ...rest
  } = props

  const isHorizontal = orientation === 'horizontal'

  const stepsDisplay = useMemo(
    () =>
      steps.map((step, index) => (
        <Step
          {...step}
          sx={{
            '& .MuiStepConnector-line': {
              borderColor: (theme) =>
                activeStep != undefined && index === activeStep + 1
                  ? theme.palette[activeColor].main
                  : ''
            },
            ...step.sx
          }}
        >
          {isHorizontal && index === steps.length - 1 && (
            <StepConnector
              style={{
                left: '40px'
              }}
              sx={{
                '& .MuiStepConnector-line': {
                  borderColor: (theme) =>
                    `${
                      activeStep != undefined && index === activeStep
                        ? theme.palette[activeColor].main
                        : activeStep != undefined && index < activeStep
                        ? theme.palette.success.main
                        : '#9E9E9E'
                    } !important`
                }
              }}
            />
          )}
          <StepLabel
            StepIconComponent={AvStepIcon}
            StepIconProps={{
              //@ts-ignore
              activeColor: activeColor
            }}
          >
            {step.label}
          </StepLabel>
        </Step>
      )),
    [steps, activeStep, isHorizontal, activeColor]
  )

  const localSx = useMemo(
    (): SxProps<Theme> =>
      orientation === 'vertical'
        ? {
            display: 'block',
            '& .MuiStepLabel-labelContainer': {
              width: 'unset'
            },
            '& .MuiStepLabel-root': {
              padding: '0'
            },
            '& .MuiStepConnector-line': {
              height: '80px',
              borderLeftWidth: '2px',
              borderColor: '#9E9E9E'
            },
            '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
              borderColor: (theme) => theme.palette[activeColor].main
            },
            '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
              borderColor: (theme) => theme.palette.success.main
            },
            '& .MuiStepConnector-root': {
              marginLeft: '16px'
            },
            '& .MuiStepLabel-label': {
              fontSize: '1rem',
              fontWeight: 600,
              color: '#9E9E9E'
            },
            '& .MuiStepLabel-label.Mui-active': {
              color: (theme) => theme.palette[activeColor].main
            },
            '& .MuiStepLabel-label.Mui-completed': {
              color: '#353945'
            },
            ...sx
          }
        : {
            '& .MuiStepLabel-root': {
              flexDirection: 'row !important',
              alignItems: 'flex-end !important'
            },
            '& .MuiStepLabel-label': {
              height: '70px',
              marginBottom: '15px',
              marginRight: '-15px',
              textAlign: 'left !important',
              marginLeft: '5px',
              marginTop: 'unset !important',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#9E9E9E',
              overflow: 'hidden',
              WebkitLineClamp: '3',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis'
            },
            '& .MuiStepConnector-root': {
              width: 'calc(100% - 32px)',
              left: 'calc(-100% + 40px)',
              height: 0,
              bottom: '16.5px',
              right: 'unset',
              top: 'unset'
            },
            '& .MuiStepConnector-line': {
              borderTopWidth: '2px',
              borderColor: '#9E9E9E'
            },
            '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
              borderColor: (theme) => theme.palette.success.main
            },
            '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
              borderColor: (theme) => theme.palette.success.main
            },
            '& .MuiStepLabel-label.Mui-active': {
              color: (theme) => theme.palette[activeColor].main
            },
            '& .MuiStepLabel-label.Mui-completed': {
              color: '#353945'
            },
            ...sx
          },
    [orientation, sx, activeColor]
  )

  return (
    <MuiStepper
      {...rest}
      sx={localSx}
      activeStep={activeStep}
      orientation={orientation}
      alternativeLabel={isHorizontal}
    >
      {stepsDisplay}
    </MuiStepper>
  )
}

const Mydiv = styled('div')({})

function AvStepIcon(props: StepIconProps & { activeColor: ColorPalette }) {
  const { active, completed, className, style, icon, activeColor } = props

  return (
    <Mydiv
      className={className}
      style={style}
      sx={{
        borderRadius: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        ...(active
          ? {
              background: (theme) => theme.palette[activeColor].main,
              border: (theme) => `2px ${theme.palette[activeColor].main} solid`,
              color: 'white'
            }
          : completed
          ? {
              background: (theme) => theme.palette.success.main,
              border: (theme) => `2px ${theme.palette.success.main} solid`,
              color: 'white'
            }
          : {
              background: 'none',
              border: `2px #9E9E9E solid`,
              color: '#9E9E9E'
            })
      }}
    >
      {completed ? (
        <CheckRounded className='QontoStepIcon-completedIcon' />
      ) : (
        <Typography variant='subtitle1'>{String(icon)}</Typography>
      )}
    </Mydiv>
  )
}
