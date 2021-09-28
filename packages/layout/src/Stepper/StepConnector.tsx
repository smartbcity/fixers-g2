import {
  StepConnector as MuiStepConnector
} from  '@mui/material'
import {withStyles} from "@mui/styles"
import { Theme } from '@smartb/g2-themes'

export const StepConnector = (theme: Theme) =>
  withStyles({
    alternativeLabel: {
      top: 20,
      left: 'calc(-50% + 30px)',
      right: 'calc(50% + 30px)'
    },
    active: {
      color: theme.colors.primary,
      '& $line': {
        backgroundColor: theme.colors.primary
      }
    },
    completed: {
      '& $line': {
        backgroundColor: theme.colors.primary
      }
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: theme.colors.tertiary,
      borderRadius: 1
    }
  })(MuiStepConnector)
