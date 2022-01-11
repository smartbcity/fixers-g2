import { StepConnector as MuiStepConnector } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Theme } from '@smartb/g2-themes'

export const StepConnector = (theme: Theme) =>
  styled(MuiStepConnector)({
    '& .MuiStepConnector-alternativeLabel': {
      top: 20,
      left: 'calc(-50% + 30px)',
      right: 'calc(50% + 30px)'
    },
    '& .MuiStepConnector-active': {
      color: theme.colors.primary,
      '& $line': {
        backgroundColor: theme.colors.primary
      }
    },
    '& .MuiStepConnector-completed': {
      '& $line': {
        backgroundColor: theme.colors.primary
      }
    },
    '& .MuiStepConnector-line': {
      height: 3,
      border: 0,
      backgroundColor: theme.colors.tertiary,
      borderRadius: 1
    }
  })
